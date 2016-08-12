/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
import {RepoTemplate} from '../repos/repo.template';
import {SetToArray} from "../transformations/pipe.general";

@Component({
  selector: 'groupType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <type-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <relationGroup>
        <!--Elements-->
        <div class="input-control" *ngIf="includeProperty('elements')">
           <repo-template [caption]="getPropertyLabel('elements')" 
           [items] = "item.p('elements') | async | setToArray" 
           (updated)="updateProperty('elements', $event)"
           [types]="[templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]"></repo-template>
        </div>
         <ng-content select="relationGroup"></ng-content> 
      </relationGroup>
      
      <ng-content></ng-content>    
    
    </type-panel>
  `,
  directives: [TypePanel, RepoTemplate],
  pipes: [SetToArray]
})
export class GroupTypePanel extends TypePanel{}
