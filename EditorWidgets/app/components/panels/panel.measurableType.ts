/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IMeasurableType} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'measurableType-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <type-panel [item]="item" [dependency]="dependency" [ignore]="['equivalence', 'weakEquivalence']" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <quality-input item="item.quality"></quality-input>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput]
})
export class MeasurableTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<IMeasurableType>){
    super(restoreService);
  }
}
