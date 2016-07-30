/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {FilterByClass} from "../transformations/pipe.general";
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <groupType-panel [item]="item" 
      [dependencies] = "dependencies" 
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
          [options] = "dependencies.templates | filterByClass: [templateName.NodeTemplate]"></select-input-1>
      </div>-->
      
      <!--parts-->
      <div class="input-control" *ngIf="includeProperty('parts')">
         <repo-template caption="parts" [items] = "item.parts" 
         (updated)="updateProperty('parts', $event)"
         [dependencies] = "dependencies" 
         [types]="[templateName.CylindricalLyphTemplate, templateName.OmegaTreeTemplate]">
        </repo-template>
      </div>
      
      <ng-content></ng-content>      
    
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate],
  pipes: [FilterByClass]
})
export class OmegaTreeTypePanel extends GroupTypePanel{}
