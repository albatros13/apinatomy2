/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {DistributionInput} from './component.distribution'
import {FormToolbar} from "./component.toolbars";

@Component({
  "inputs": ["caption", "item"],
  "selector": "template-value",
  "template": `
      <div class="input-control">
        <label for="caption">{{caption}}: </label>
        <div class="btn-group" style="float: left;">
          <button type="button" class="btn btn-default" 
            [ngClass]="{'active': valueType == 'Value'}" (click)="valueType = 'Value'">
            <img class="icon" src="images/numbers.png"/>
          </button>
          <button type="button" class="btn btn-default" 
            [ngClass]="{'active': valueType == 'Distribution'}" (click)="valueType = 'Distribution'">
            <img class="icon" src="images/distribution.png"/>
          </button>
        </div>
        <input type="number" class="form-control"  style="width: 100px;" min="0" max="100" [value]="item" (input)="updateValue($event)" *ngIf="valueType == 'Value'"/>
        <distribution-input [item]="item" (updated)="notifyParent($event)" *ngIf="valueType == 'Distribution'"></distribution-input>       
     </div>
   `,
  "directives": [DistributionInput, FormToolbar]
})
export class TemplateValue{
  item: any;
  valueType: string = "Value";
  @Output() updated = new EventEmitter();

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
