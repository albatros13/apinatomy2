"use strict";
import {Component} from '@angular/core';
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {BorderTemplatePanel} from "./template.borderTemplate";
import {model} from "../services/utils.model";
const {BorderTemplate, Coalescence, ProcessTemplate} = model;

@Component({
  selector: 'lyphTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Thickness-->
        <template-value *ngIf = "includeProperty('thickness')" 
          [caption] = "getPropertyLabel('thickness')" 
          [item] = "item.thickness"
          (updated) = "updateProperty('thickness', $event)">
        </template-value>
        <ng-content select="dimensionGroup"></ng-content> 
              
        <!--Coalescences-->
        <div class="input-control" *ngIf="includeProperty('coalescences')">      
          <label for="coalescences">{{getPropertyLabel('coalescences')}}: </label>
          <select-input [items] = "item.coalescences" 
            (updated) = "updateProperty('coalescences', $event)"  
            [options] = "Coalescence.p('all') | async"></select-input>
        </div>  
        
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
  
  <!--      <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          &lt;!&ndash;InnerBorder&ndash;&gt;
          <div class="input-control">      
            <label for="innerBorder">{{getPropertyLabel('innerBorder')}}: </label>
            <borderTemplate-panel [item]="item.innerBorder" 
              (added)  ="addTemplate('innerBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </borderTemplate-panel>
          </div>
        
          &lt;!&ndash;OuterBorder&ndash;&gt;        
          <div class="input-control">      
            <label for="outerBorder">{{getPropertyLabel('outerBorder')}}: </label>
            <borderTemplate-panel [item]="item.outerBorder" 
              (added)  ="addTemplate('outerBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('outerBorder', $event)"    
              (removed)="removeTemplate('outerBorder', $event)">
            </borderTemplate-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>-->
        
      <ng-content></ng-content>      
  
    </template-panel>
  `,
  directives: [MultiSelectInput, SingleSelectInput, TemplateValue, TemplatePanel, BorderTemplatePanel]
})
export class LyphTemplatePanel extends TemplatePanel{
  BorderTemplate = BorderTemplate;
  Coalescence = Coalescence;
  ProcessTemplate = ProcessTemplate;
}
