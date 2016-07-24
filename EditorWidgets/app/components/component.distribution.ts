/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {ValueDistribution, BoundedNormalDistribution, UniformDistribution, DistributionType} from '../services/service.apinatomy2'
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'uniformDistribution-input',
  inputs: ['item'],
  template:`
    <fieldset>
      <div class="input-control">
        <label for="min">Min: </label>
        <input type="number" class="form-control" min="0" max="100" step="0.1" required [value]="item.min" (input)="updateValue('min', $event)">
      </div>
      <div class="input-control">
        <label for="max">Max: </label>
        <input type="number" class="form-control" min="0" max="100" step="0.1" required [value]="item.max" (input)="updateValue('max', $event)">
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
        <input type="number" class="form-control" min="0" max="100" step="0.1" required [value]="item.mean" (input)="updateValue('mean', $event)">
      </div>
      <div class="input-control">
        <label for="std">Std: </label>
        <input type="number" class="form-control" min="0" max="100" step="0.1" required [value]="item.std" (input)="updateValue('std', $event)">
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
        <input type="radio" [value]="distributionType.BoundedNormal" (click)="toBoundedNormal($event)">Normal<br/>
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


