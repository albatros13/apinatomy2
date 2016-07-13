/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";


@Component({
  selector: 'causalityType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [(dependencies)]="dependencies" [ignore]="ignore"
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
