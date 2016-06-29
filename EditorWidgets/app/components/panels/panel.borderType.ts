/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IBorderType} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  providers: [RestoreService],
  selector: 'borderType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
      
        <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RADIO_GROUP_DIRECTIVES]
})
export class BorderTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<IBorderType>){
    super(restoreService);
  }
}
