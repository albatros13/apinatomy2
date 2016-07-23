/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'groupType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [ignore]="ignore"
      [(dependencies)]="dependencies" 
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--Elements-->
      <div class="input-control" *ngIf="includeProperty('elements')">
         <repo-template caption="Elements" [items] = "item.elements" 
         (updated)="updateProperty('elements', $event)"
         [dependencies] = "dependencies" [types]="[
           templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]"></repo-template>
      </div>
      
      <ng-content></ng-content>      
    
    </type-panel>
  `,
  directives: [TypePanel, RepoTemplate]
})
export class GroupTypePanel extends TypePanel{}
