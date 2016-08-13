/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {MeasurableLocationPanel} from "./panel.measurableLocation";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'border-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <measurableLocation-panel [item] = "item" 
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
           <checkbox-group [(ngModel)]="item.nature" (ngModelChange)="onSelectChange(item.nature)">
             <input type="checkbox" value="open">open&nbsp;
             <input type="checkbox" value="closed">closed<br/>
           </checkbox-group>
        </fieldset>
      </div>
      
     <ng-content></ng-content>  
            
    </measurableLocation-panel>
  `,
  directives: [MeasurableLocationPanel, RADIO_GROUP_DIRECTIVES]
})
export class BorderPanel extends MeasurableLocationPanel{

  onSelectChange(value){
    this.propertyUpdated.emit({property: 'nature', values: value});
  }

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore
      .add('externals').add('measurables')
      .add('name').add('cardinalityBase').add('cardinalityMultipliers').add('type');
  }
}
