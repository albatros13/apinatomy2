/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {TypePanel} from "./panel.type";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'groupType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <div class="input-control" *ngIf="includeProperty('elements')">
         <repo-template caption="Elements" [items] = "item.elements" 
         [dependencies] = "dependencies" [types]="[
            templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
      </div>
      <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, RepoTemplate]
})
export class GroupTypePanel extends TypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
