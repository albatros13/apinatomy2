/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationTypePanel} from "./panel.measurableLocationType";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'borderType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <measurableLocationType-panel [item] = "item" 
      [ignore] = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
            
      <!--Nature-->
      <div class="input-control" *ngIf="includeProperty('nature')">
        <fieldset>
          <legend>{{getPropertyLabel('nature')}}:</legend>
           <checkbox-group [(ngModel)]="item.nature" [required]="true">
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

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('supertypes').add('subtypes');
  }
}
