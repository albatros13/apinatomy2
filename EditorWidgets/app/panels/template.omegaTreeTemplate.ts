/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {GroupTemplatePanel} from "./template.groupTemplate";
import {model} from "../services/utils.model";
const {OmegaTreePartTemplate} = model;

@Component({
  selector: 'omegaTreeTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <groupTemplate-panel [item]="item" 
      [ignore]="ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--TreeParent-->
      <div  *ngIf="includeProperty('type')" class="input-control">
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
      
      <ng-content></ng-content>      
    
    </groupTemplate-panel>
  `,
  directives: [TemplateValue, MultiSelectInput, SingleSelectInput, GroupTemplatePanel]
})
export class OmegaTreeTemplatePanel extends GroupTemplatePanel{
  OmegaTreePartTemplate = OmegaTreePartTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityMultipliers').add('treeParent').add('treeChildren');
  }
}
