/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput, SingleSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <groupType-panel 
      [item]="item" [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <div class="input-control" *ngIf="includeProperty('root')">      
        <label for="cause">Root: </label>
        <select-input-1 [item] = "item.root" [options] = "dependencies.nodeTemplates"></select-input-1>
      </div>
      <ng-content></ng-content>      
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput, SingleSelectInput]
})
export class OmegaTreeTypePanel extends GroupTypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
