/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IOmegaTreeType} from "../../providers/service.apinatomy2";
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <groupType-panel 
      [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <ng-content></ng-content>      
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput]
})
export class OmegaTreeTypePanel extends GroupTypePanel{
  constructor(protected restoreService: RestoreService<IOmegaTreeType>){
    super(restoreService);
  }
}
