/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationPanel} from "./panel.measurableLocation";
import {FormType} from "../services/service.apinatomy2";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'borderType-panel',
  inputs: ['item', 'dependencies', 'ignore', 'options'],
  template:`
    <measurableLocation-panel [item] = "item" 
      [dependencies] = "dependencies" 
      [ignore] = "ignore.add('supertypes').add('subtypes')"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
            
      <div class="input-control">
        <label for="position">Position: {{item.position}}</label>
        <input type="range" min="0" max="100" step="0.1" required [(ngModel)]="item.position">
      </div>
      
      <!--Form-->
      <div class="input-control" *ngIf="includeProperty('form')">
      <fieldset>
        <legend>Form:</legend>
         <checkbox-group [(ngModel)]="item.form" [required]="true">
           <input type="checkbox" value="open">open&nbsp;
           <input type="checkbox" value="closed">closed<br/>
         </checkbox-group>
      </fieldset>
      </div>
    </measurableLocation-panel>
  `,
  directives: [MeasurableLocationPanel, RADIO_GROUP_DIRECTIVES]
})
export class BorderTypePanel extends MeasurableLocationPanel{
  public formType = FormType;
  
  ngOnInit(){
    if (!this.item.form) this.item.form = [];
  }
}
