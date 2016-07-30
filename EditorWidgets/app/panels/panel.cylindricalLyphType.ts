/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {LyphTypePanel} from "./panel.lyphType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {BorderTemplatePanel} from '../templates/template.borderTemplate';
import {FilterByClass, FilterBy} from "../transformations/pipe.general";

@Component({
  selector: 'cylindricalLyphType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <lyphType-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore" 
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
              
        <providerGroup>
          <!--SegmentProviders-->
          <div class="input-control" *ngIf="includeProperty('segmentProviders', 'providers')">
            <label for="segmentProviders">Inherits segments from: </label>
            <select-input [items]="item.segmentProviders" 
            (updated)="updateProperty('segmentProviders', $event)"
            [options]="dependencies.cylindricalLyphs"></select-input>
          </div>
        </providerGroup>     
        
        <relationGroup>
          <!--Segments-->
          <div class="input-control" *ngIf="includeProperty('segments', 'relations')">
            <repo-template caption="Segments" [items] = "item.segments" 
            [ignore]="ignore.add('cardinality')"
            (updated)="updateProperty('segments', $event)"
            [dependencies] = "dependencies"
              [types]="[templateName.LyphTemplate]"></repo-template>
          </div>
        </relationGroup>
        
        <borderGroup>
          <!--MinusBorder-->
          <div class="input-control">      
            <label for="minusBorder">Minus border: </label>
            <borderTemplate-panel [item]="item.minusBorder" 
              [dependencies]="dependencies" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('minusBorder', borderTemplate)"
              (saved)  ="updateProperty('minusBorder', $event)"    
              (removed)="removeTemplate('minusBorder', $event)">
            </borderTemplate-panel>
          </div>
        
          <!--PlusBorder-->        
          <div class="input-control">      
            <label for="plusBorder">Plus border: </label>
            <borderTemplate-panel [item]="item.plusBorder" 
              [dependencies]="dependencies" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('plusBorder', borderTemplate)"
              (saved)  ="updateProperty('plusBorder', $event)"    
              (removed)="removeTemplate('plusBorder', $event)">
            </borderTemplate-panel>
          </div>
          
        </borderGroup>
        
        <ng-content></ng-content>
    
    </lyphType-panel>
  `,
  directives: [LyphTypePanel, MultiSelectInput, SingleSelectInput,
    RepoTemplate, BorderTemplatePanel, BorderTemplatePanel],
  pipes: [FilterByClass, FilterBy]

})
export class CylindricalLyphTypePanel extends LyphTypePanel{
}
