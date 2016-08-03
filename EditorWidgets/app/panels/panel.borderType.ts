/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {FormType} from "../services/utils.model";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'borderType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <measurableLocationType-panel [item] = "item" 
      [ignore] = "myIgnore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
            
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
      
     <ng-content></ng-content>  
            
    </measurableLocationType-panel>
  `,
  directives: [MeasurableLocationTypePanel, RADIO_GROUP_DIRECTIVES]
})
export class BorderTypePanel extends MeasurableLocationTypePanel{
  public formType = FormType;
  myIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    if (!this.item.form) this.item.form = [];
    this.myIgnore = new Set<string>(this.ignore).add('supertypes').add('subtypes');
  }
}
