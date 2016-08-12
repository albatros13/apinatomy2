/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../components/component.select';
import {model} from "../services/utils.model";
const {MaterialType} = model;

@Component({
  selector: 'measurableType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <type-panel [item]="item" 
      [ignore]="ignore" 
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
       <!--Quality-->
      <div class="input-control" *ngIf="includeProperty('quality')">
        <label for="quality">{{getPropertyLabel('quality')}}: </label>
        <input type="text" class="form-control" required [(ngModel)]="item.quality">
      </div>
      
      <!--Materials-->
      <div class="input-control" *ngIf="includeProperty('materials')">
        <label for="materials">{{getPropertyLabel('materials')}}: </label>
        <select-input [items]="item.p('materials') | async" 
        (updated)="updateProperty('materials', $event)"     
        [options]="MaterialType.p('all') | async"></select-input>
      </div>   
       
      <ng-content></ng-content>   
         
    </type-panel>
  `,
  directives: [TypePanel,  MultiSelectInput]
})
export class MeasurableTypePanel extends TypePanel{
  MaterialType = MaterialType;
}

