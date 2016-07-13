/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {ValueDistribution, BoundedNormalDistribution, UniformDistribution, DistributionType} from '../providers/service.apinatomy2'
import {RestoreService} from "../providers/service.restore";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {FormToolbar} from "./component.general";

@Component({
  selector: 'uniformDistribution-input',
  inputs: ['item'],
  template:`
    <fieldset>
      <div class="input-control">
        <label for="min">Min: </label>
        <input type="number" min="0" max="100" step="0.1" required [value]="item.min" (input)="updateValue('min', $event)">
      </div>
      <div class="input-control">
        <label for="max">Max: </label>
        <input type="number" min="0" max="100" step="0.1" required [value]="item.max" (input)="updateValue('max', $event)">
      </div>
      <ng-content></ng-content>
    </fieldset>
  `,
  directives: []
})
export class UniformDistributionInput {
  item: any;
  @Output() updated = new EventEmitter();
  protected ngOnInit() {
    if (!this.item) this.item = new UniformDistribution();
  }

  updateValue(property: string, item: any){
    this.item[property] = item.target.value;
    this.updated.emit(this.item);
  }
}

@Component({
  selector: 'boundedNormalDistribution-input',
  inputs: ['item'],
  template:`
    <uniformDistribution-input [item]="item" (updated)="updated.emit($event)">
      <div class="input-control">
        <label for="mean">Mean: </label>
        <input type="number" min="0" max="100" step="0.1" required [value]="item.mean" (input)="updateValue('mean', $event)">
      </div>
      <div class="input-control">
        <label for="std">Std: </label>
        <input type="number" min="0" max="100" step="0.1" required [value]="item.std" (input)="updateValue('std', $event)">
      </div>
      <ng-content></ng-content>
    </uniformDistribution-input>
  `,
  directives: [UniformDistributionInput]
})
export class BoundedNormalDistributionInput extends UniformDistributionInput{
  protected ngOnInit() {
    if (!this.item) this.item = new BoundedNormalDistribution();
  }
}

@Component({
  selector: 'distribution-input',
  inputs: ['item'],
  template:`
    <fieldset>
      <radio-group [(ngModel)]="item.type" [required]="true">
        <input type="radio" [value]="distributionType.Uniform" (click)="toUniform($event)">Uniform&nbsp;
        <input type="radio" [value]="distributionType.BoundedNormal" (click)="toBoundedNormal($event)">Bounded normal<br/>
      </radio-group>
      <uniformDistribution-input [item]="item.distribution" (updated)="updateValue($event)"
        *ngIf="item.type == distributionType.Uniform">
        </uniformDistribution-input>
      <boundedNormalDistribution-input [item]="item.distribution" (updated)="updateValue($event)" 
        *ngIf="item.type == distributionType.BoundedNormal">
        </boundedNormalDistribution-input>
    </fieldset>
  `,
  directives: [RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
})
export class DistributionInput{
  @Output() updated = new EventEmitter();
  distributionType = DistributionType;
  item: any;
  constructor(){}

  protected ngOnInit() {
    if (!this.item || !this.item.distribution) this.item = new ValueDistribution();
  }

  toBoundedNormal(item: any){
    this.item.type = item;
    this.item.distribution = new BoundedNormalDistribution(
      {min: this.item.distribution.min, max: this.item.distribution.max, mean: 0, std: 0});
    this.updated.emit(this.item);
  }

  toUniform(item: any){
    this.item.type = item;
    this.item.distribution = new UniformDistribution(
      {min: this.item.distribution.min, max: this.item.distribution.max});
    this.updated.emit(this.item);
  }

  updateValue(item: any){
    this.item.distribution = item;
    this.updated.emit(this.item);
  }
}

@Component({
  "inputs": ["caption", "item"],
  "providers": [RestoreService],
  "selector": "template-value",
  "template": `
     <fieldset>
       <legend>{{caption}}</legend>
       <radio-group [(ngModel)]="valueType" [required]="true">
         <input type="radio" value="Value">Value&nbsp;
         <input type="radio" value="Distribution">Distribution<br/>
       </radio-group>
       <input type="number" min="0" max="100" [value]="item" (input)="updateValue($event)" *ngIf="valueType == 'Value'"/>
       <distribution-input [item]="item" (updated)="notifyParent($event)" *ngIf="valueType == 'Distribution'"></distribution-input>       
     </fieldset>
   `,
  "directives": [RADIO_GROUP_DIRECTIVES, DistributionInput, FormToolbar]
})
export class TemplateValue{
  item: any;
  valueType: string = "Value";
  @Output() updated = new EventEmitter();

  constructor(protected restoreService: RestoreService){}

  ngOnInit(){
    if (this.item && this.item['distribution']) this.valueType = "Distribution";
  }

  updateValue(item: any){
    this.item = item.target.value;
    this.updated.emit(this.item);
  }

  notifyParent(item: any){
    this.item = item;
    this.updated.emit(this.item);
  }
}
