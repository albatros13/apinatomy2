/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IGroupType} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'groupType-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <type-panel [item]="item" [dependency]="dependency" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput]
})
export class GroupTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<IGroupType>){
    super(restoreService);
  }
}
