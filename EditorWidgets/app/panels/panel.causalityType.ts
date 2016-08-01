/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output} from '@angular/core';
import {TypePanel} from "./panel.type";

@Component({
  selector: 'causalityType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <type-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <ng-content></ng-content>      
    
    </type-panel>
  `,
  directives: [TypePanel]
})
export class CausalityTypePanel extends TypePanel{

}
