/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {ValueDistribution, BoundedNormalDistribution, UniformDistribution, DistributionType} from '../providers/service.apinatomy2'
import {RestoreService} from "../providers/service.restore";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'uniformDistribution-input',
  inputs: ['item'],
  providers: [RestoreService],
  template:`
    <fieldset>
      <div class="input-control">
        <label for="min">Min: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.min">
      </div>
      <div class="input-control">
        <label for="max">Max: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.max">
      </div>
      <ng-content></ng-content>
    </fieldset>
  `,
  directives: []
})
export class UniformDistributionInput {
  @Output() saved = new EventEmitter();

  constructor(protected restoreService: RestoreService<any>){}

  protected ngOnInit() {
    if (!this.item) this.item = new UniformDistribution();
  }

  protected set item (item: any) {
    this.restoreService.setItem(item);
  }

  protected get item () {
    return this.restoreService.getItem();
  }

  protected onSaved() {
    this.item = this.restoreService.getItem();
    this.saved.emit(this.item);
  }

  protected onCanceled() {
    this.item = this.restoreService.restoreItem();
  }
}

@Component({
  selector: 'boundedNormalDistribution-input',
  inputs: ['item'],
  providers: [RestoreService],
  template:`
    <uniformDistribution-input [item]="item">
      <div class="input-control">
        <label for="mean">Mean: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.mean">
      </div>
      <div class="input-control">
        <label for="std">Std: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.std">
      </div>
      <ng-content></ng-content>
    </uniformDistribution-input>
  `,
  directives: [UniformDistributionInput]
})
export class BoundedNormalDistributionInput extends UniformDistributionInput{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }

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
        <input type="radio" [value]="distributionType.Uniform">Uniform&nbsp;
        <input type="radio" [value]="distributionType.BoundedNormal">Bounded normal<br/>
      </radio-group>
      <uniformDistribution-input [item]="item.distribution" *ngIf="item.type == distributionType.Uniform"></uniformDistribution-input>
      <boundedNormalDistribution-input [item]="item.distribution" *ngIf="item.type == distributionType.BoundedNormal"></boundedNormalDistribution-input>
    </fieldset>
  `,
  directives: [RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
})
export class DistributionInput {
  distributionType = DistributionType;
  item: any;
  constructor(){}

  protected ngOnInit() {
    if (!this.item)
      this.item = new ValueDistribution();
  }
}

@Component({
  "inputs": ["caption", "item"],
  "selector": "template-value",
  "template": `
     <fieldset>
       <legend>{{caption}}</legend>
       <radio-group [(ngModel)]="valueType" [required]="true">
         <input type="radio" value="Value">Value&nbsp;
         <input type="radio" value="Distribution">Distribution<br/>
       </radio-group>
       <input type="number" min="0" max="100" [(ngModel)]="item" *ngIf="valueType == 'Value'"/>
       <distribution-input [item]="item" *ngIf="valueType == 'Distribution'"></distribution-input>
     </fieldset>
   `,
  "directives": [RADIO_GROUP_DIRECTIVES, DistributionInput]
})
export class TemplateValue{
  valueType: string = "Value";
  item: number|ValueDistribution;

  ngOnInit(){
      if (this.item && this.item['distribution']) this.valueType = "Distribution";
  }
}
