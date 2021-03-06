/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {LyphTemplatePanel} from "./template.lyphTemplate";
import {BorderTemplatePanel} from "./template.borderTemplate";
import {model} from "../services/utils.model";
const {OmegaTreePartTemplate} = model;

@Component({
  selector: 'cylindricalLyphTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <lyphTemplate-panel [item]="item" 
      [ignore]="ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Length-->
        <dimensionGroup>
          <template-value *ngIf = "includeProperty('length')" 
            [caption] = "getPropertyLabel('length')" 
            [item] = "item.length"
            (updated) = "updateProperty('length', $event)">
          </template-value>
        </dimensionGroup>
      
      <!--TreeParent-->
      <div  *ngIf="includeProperty('treeParent')" class="input-control">
        <label for="treeParent">{{getPropertyLabel('treeParent')}}: </label>
        <select-input-1 [item] = "item.p('treeParent') | async"
         (updated) = "updateProperty('treeParent', $event)"    
         [options] = "OmegaTreePartTemplate.p('all') | async"></select-input-1>
      </div>
      
      <!--TreeChildren-->
      <div class="input-control" *ngIf="includeProperty('treeChildren')">
        <label for="treeChildren">{{getPropertyLabel('treeChildren')}}: </label>
        <select-input 
          [items]="item.p('treeChildren') | async" 
          (updated)="updateProperty('treeChildren', $event)" 
          [options]="OmegaTreePartTemplate.p('all') | async"></select-input>
      </div>      
   
<!--
      <borderGroup>
        &lt;!&ndash;MinusBorder&ndash;&gt;
        <div class="input-control">      
          <label for="minusBorder">{{getPropertyLabel('minusBorder')}}: </label>
          <borderTemplate-panel [item]="item.minusBorder" 
            (added)  ="addTemplate('minusBorder', templateName.BorderTemplate)"
            (saved)  ="updateProperty('minusBorder', $event)"    
            (removed)="removeTemplate('minusBorder', $event)">
          </borderTemplate-panel>
        </div>
      
        &lt;!&ndash;PlusBorder&ndash;&gt;        
        <div class="input-control">      
          <label for="plusBorder">{{getPropertyLabel('plusBorder')}}: </label>
          <borderTemplate-panel [item]="item.plusBorder" 
            (added)  ="addTemplate('plusBorder', templateName.BorderTemplate)"
            (saved)  ="updateProperty('plusBorder', $event)"    
            (removed)="removeTemplate('plusBorder', $event)">
          </borderTemplate-panel>
        </div>
          
      </borderGroup>
-->
    <ng-content></ng-content>      
    
    </lyphTemplate-panel>
  `,
  directives: [TemplateValue, MultiSelectInput, SingleSelectInput, LyphTemplatePanel, BorderTemplatePanel]
})
export class CylindricalLyphTemplatePanel extends LyphTemplatePanel{
  OmegaTreePartTemplate = OmegaTreePartTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityMultipliers').add('treeParent').add('treeChildren');
  }
}
