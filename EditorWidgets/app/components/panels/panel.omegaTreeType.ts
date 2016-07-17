/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {GroupTypePanel} from "./panel.groupType";
import {MultiSelectInput, SingleSelectInput} from '../component.general';
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  selector: 'omegaTreeType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <groupType-panel [item]="item" 
      [(dependencies)] = "dependencies" 
      [ignore] = "ignore"
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
      
      <ng-content></ng-content>      
    
    </groupType-panel>
  `,
  directives: [GroupTypePanel, MultiSelectInput, SingleSelectInput],
  pipes: [FilterByClass]
})
export class OmegaTreeTypePanel extends GroupTypePanel{}
