/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {LyphTypePanel} from "./panel.lyphType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {BorderTemplatePanel} from './template.borderTemplate';
import {SetToArray} from "../transformations/pipe.general";
import {TemplateValue} from '../components/component.templateValue';
import {model} from "../services/utils.model";
const {CylindricalLyphType} = model;

@Component({
  selector: 'cylindricalLyphType-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <lyphType-panel [item]="item" 
      [ignore]="ignore" 
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
        <!--Length-->
        <dimensionGroup>
          <template-value *ngIf="includeProperty('length')" 
              [caption]="getPropertyLabel('length')" 
              [item]="item.length"
              (updated)="updateProperty('length', $event)">
          </template-value>
        </dimensionGroup>
        
        <ng-content></ng-content>   
              
        <providerGroup>
          <!--SegmentProviders-->
          <div class="input-control" *ngIf="includeProperty('segmentProviders', 'providers')">
            <label for="segmentProviders">{{getPropertyLabel('segmentProviders')}}: </label>
            <select-input [items]="item.p('segmentProviders') | async" 
            (updated)="updateProperty('segmentProviders', $event)"
            [options]="item.constructor.p('all') | async"></select-input>
          </div>
        </providerGroup>     
        
        <relationGroup>
          <!--Segments-->
          <div class="input-control" *ngIf="includeProperty('segments', 'relations')">
            <repo-template [caption]="getPropertyLabel('segments')" 
            [items] = "item.p('segments') | async | setToArray" 
            [ignore]="segmentsIgnore"
            (updated)="updateProperty('segments', $event)"
            [types]="[templateName.CylindricalLyphTemplate]"></repo-template>
          </div>
        </relationGroup>
        
        <borderGroup>
          <!--MinusBorder-->
          <div class="input-control">      
            <label for="minusBorder">{{getPropertyLabel('minusBorder')}}: </label>
            <borderTemplate-panel [item]="item.minusBorder" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('minusBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('minusBorder', $event)"    
              (removed)="removeTemplate('minusBorder', $event)">
            </borderTemplate-panel>
          </div>
        
          <!--PlusBorder-->        
          <div class="input-control">      
            <label for="plusBorder">{{getPropertyLabel('plusBorder')}}: </label>
            <borderTemplate-panel [item]="item.plusBorder" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('plusBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('plusBorder', $event)"    
              (removed)="removeTemplate('plusBorder', $event)">
            </borderTemplate-panel>
          </div>
          
        </borderGroup>
        
    
    </lyphType-panel>
  `,
  directives: [LyphTypePanel, MultiSelectInput, SingleSelectInput,
    RepoTemplate, BorderTemplatePanel, BorderTemplatePanel, TemplateValue],
  pipes: [SetToArray]

})
export class CylindricalLyphTypePanel extends LyphTypePanel{
  CylindricalLyphType = CylindricalLyphType;
  segmentsIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.segmentsIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
  }
}
