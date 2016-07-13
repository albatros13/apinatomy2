/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {LyphTypePanel} from "./panel.lyphType";
import {MultiSelectInput, SingleSelectInput, EditToolbar} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';
import {BorderTemplatePanel} from '../templates/template.borderType';
import {FilterByClass, FilterBy} from "../../transformations/pipe.general";

@Component({
  selector: 'cylindricalLyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <lyphType-panel [item]="item" 
      [(dependencies)]="dependencies" 
      [ignore]="ignore" 
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

        <!--SegmentProviders-->
        <div class="input-control" *ngIf="includeProperty('segmentProviders')">
          <label for="segmentProviders">Inherits segments from: </label>
          <select-input [items]="item.segmentProviders" 
          (updated)="updateProperty('segmentProviders', $event)"
          [options]="dependencies.cylindricalLyphs"></select-input>
        </div>
        
        <!--Segments-->
        <div class="input-control" *ngIf="includeProperty('segments')">
          <repo-template caption="Segments" [items] = "item.segments" 
          (updated)="updateProperty('segments', $event)"
          [dependencies] = "dependencies"
            [types]="[templateName.LyphTemplate]"></repo-template>
        </div>
        
        <!--minusBorder-->
        <div class="input-control" *ngIf="includeProperty('minusBorder')">      
          <label for="item.minusBorder">Minus border: </label>
          <borderTemplate-panel [item]="item.minusBorder" 
            [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
            (saved)="updateProperty('minusBorder', $event)"    
            (removed)="updateProperty('minusBorder', null)">
          </borderTemplate-panel>
        </div>
        
        <!--plusBorder-->
        <div class="input-control" *ngIf="includeProperty('plusBorder')">   
           <label for="item.minusBorder">Plus border: </label>
          <borderTemplate-panel [item]="item.plusBorder" 
            [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
            (saved)="updateProperty('plusBorder', $event)"    
            (removed)="updateProperty('plusBorder', null)">
          </borderTemplate-panel>
        </div>
        
        <ng-content></ng-content>
    
    </lyphType-panel>
  `,
  directives: [LyphTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate, BorderTemplatePanel, EditToolbar],
  pipes: [FilterByClass, FilterBy]

})
export class CylindricalLyphTypePanel extends LyphTypePanel{
}
