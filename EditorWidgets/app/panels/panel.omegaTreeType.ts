/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {SetToArray} from "../transformations/pipe.general";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <groupType-panel [item]="item" 
      [ignore] = "ignore.add('elements').add('supertypes').add('subtypes')"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Root-->
      <!--<div class="input-control" *ngIf="includeProperty('root')">      
        <label for="cause">Root: </label>
        <select-input-1 [item] = "item.root" 
          (updated)="updateProperty('root', $event)"   
          [options] = "NodeTemplate.p('all') | async"></select-input-1>
      </div>-->
      
      <relationGroup>
      <!--Part = Elements which is OmegaTreeTemplate or CylindricalLyphTemplate-->
        <div class="input-control" *ngIf="includeProperty('elements')">
           <repo-template caption="elements" 
           [items]  = "item.p('elements') | async | setToArray" 
           (updated)= "updateProperty('elements', $event)"
           [types]  = "[templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]">
          </repo-template>
        </div>
        <ng-content select="relationGroup"></ng-content>      
      </relationGroup>
      
      <ng-content></ng-content> 
    
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate],
  pipes: [SetToArray]
})
export class OmegaTreeTypePanel extends GroupTypePanel{}
