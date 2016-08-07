/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {GroupTemplatePanel} from "./template.groupTemplate";
//import {OmegaTreePartTemplate} from "open-physiology-model";

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
      <!--<div  *ngIf="includeProperty('type')" class="input-control">
        <label for="type">Tree parent: </label>
        <select-input-1 [item] = "item.p('treeParent') | async"
         (updated)="updateProperty('treeParent', $event)"    
         [options] = "OmegaTreePartTemplate.p('all') | async"></select-input-1>
      </div>-->
          
      <ng-content></ng-content>      
    
    </groupTemplate-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, GroupTemplatePanel]
})
export class OmegaTreeTemplatePanel extends GroupTemplatePanel{
  //OmegaTreePartTemplate = OmegaTreePartTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityMultipliers');
  }
}
