/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, Input, EventEmitter, Output} from '@angular/core';
import {FormToolbar} from "./toolbar.panelEdit";

@Component({
  "inputs": ["caption", "item", "mode"],
  "selector": "template-value",
  "template": `
      <div class="input-control">
        <label for="caption">{{caption}}:</label>
        
        <div class="btn-group" style="float: left;">
          <button type="button" class="btn btn-default" 
            [ngClass]="{'active': valueType == 'Value'}" (click)="updateType('Value')">
            <span class="glyphicon glyphicon-th"></span>
          </button>
          <button type="button" class="btn btn-default" 
            [ngClass]="{'active': valueType == 'Distribution'}" (click)="updateType('Distribution')">
            <span class="glyphicon glyphicon-transfer"></span>
          </button>
        </div>
        
        <input *ngIf="valueType == 'Value'" 
          type="number" class="form-control" min="0" max="100" 
          [(ngModel)]="value" (ngModelChange)="updated.emit(value)"/>
        
        <fieldset *ngIf="valueType == 'Distribution'">
          <div class="input-control">
            <label for="min">Min: </label>
            <input type="number" class="form-control" min="0" max="100" step="0.1" required [(ngModel)]="distribution.min">
         
            <label for="max">Max: </label>
            <input type="number" class="form-control" min="0" max="100" step="0.1" required [(ngModel)]="distribution.max">
          </div>
          <div *ngIf="mode == 'distribution'">
            <div class="input-control">
              <label for="mean">Mean: </label>
              <input type="number" class="form-control" min="0" max="100" step="0.1" required [(ngModel)]="distribution.mean">
         
              <label for="std">Std: </label>
              <input type="number" class="form-control" min="0" max="100" step="0.1" required [(ngModel)]="distribution.std">
            </div>
          </div>
        </fieldset>
        
       </div>
   `,
  "styles": [`input {width: 80px;}`],
  "directives": [FormToolbar]
})
export class TemplateValue{
  @Input() item: any;
  value: number = 0;
  distribution: any = {min: 0, max: 0, std: 0, mean: 0};
  valueType: string = "Value";
  @Output() updated = new EventEmitter();

  ngOnInit(){
    if (this.item) {
      if (this.item instanceof Object) {
        this.valueType = "Distribution";
        this.distribution = this.item;
      } else {
        this.value = this.item;
      }
    }
  }

  updateType(type: string){
    this.valueType = type;
    if (type == "Value"){
      this.item = this.value;
    } else {
      this.item = this.distribution;
    }
    this.updated.emit(this.item);
  }
}
