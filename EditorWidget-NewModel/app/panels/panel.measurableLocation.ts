/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {TemplatePanel} from "./panel.template";
import {MultiSelectInput} from '../components/component.select';
import {RepoNested} from '../repos/repo.nested';
import {model} from "../services/utils.model";
import {SetToArray} from "../transformations/pipe.general";

@Component({
  selector: 'measurableLocation-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
        
       <relationGroup>
          <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-nested [caption]="getPropertyLabel('measurables')" 
            [items]="item.p('measurables') | async | setToArray" 
            (updated)="updateProperty('measurables', $event)" 
            [types]="[ResourceName.Measurable]"></repo-nested>
          </div>
           <ng-content select="relationGroup"></ng-content>
       </relationGroup>      
      
       <ng-content></ng-content>      

    </template-panel>
  `,
  directives: [TemplatePanel, MultiSelectInput, RepoNested],
  pipes: [SetToArray]
})
export class MeasurableLocationPanel extends TemplatePanel{}
