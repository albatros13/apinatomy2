/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {model} from "../services/utils.model";
const {ProcessTemplate} = model;

@Component({
  selector: 'nodeTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Incoming processes-->
      <div class="input-control" *ngIf="includeProperty('incomingProcesses')">      
        <label for="incomingProcesses">{{getPropertyLabel('incomingProcesses')}}: </label>
        <select-input [items] = "item.incomingProcesses" 
          (updated) = "updateProperty('incomingProcesses', $event)"  
          [options] = "ProcessTemplate.p('all') | async"></select-input>
      </div>
      
      <!--Outgoing processes-->
      <div class="input-control" *ngIf="includeProperty('outgoingProcesses')">      
        <label for="outgoingProcesses">{{getPropertyLabel('outgoingProcesses')}}: </label>
        <select-input [items] = "item.outgoingProcesses" 
          (updated) = "updateProperty('outgoingProcesses', $event)"   
          [options] = "ProcessTemplate.p('all') | async"></select-input>
      </div>   

      <ng-content></ng-content>      

    </template-panel>
  `,
  directives: [TemplateValue, MultiSelectInput, TemplatePanel]
})
export class NodeTemplatePanel extends TemplatePanel{
  ProcessTemplate = ProcessTemplate;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers');
  }
}
