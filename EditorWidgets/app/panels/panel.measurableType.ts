/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Pipe, PipeTransform} from '@angular/core';
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../components/component.select';

@Component({
  selector: 'measurableType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore" 
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
       <!--Quality-->
      <div class="input-control" *ngIf="includeProperty('quality')">
        <label for="quality">Quality: </label>
        <input type="text" class="form-control" required [(ngModel)]="item.quality">
      </div>
      
      <!--Materials-->
      <div class="input-control" *ngIf="includeProperty('materials')">
        <label for="materials">Materials: </label>
        <select-input [items]="item.materials" 
        (updated)="updateProperty('materials', $event)"     
        [options]="dependencies.materials"></select-input>
      </div>   
      <ng-content></ng-content>   
         
    </type-panel>
  `,
  directives: [TypePanel,  MultiSelectInput]
})
export class MeasurableTypePanel extends TypePanel{}

