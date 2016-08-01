"use strict";
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {BorderTemplatePanel} from "../templates/template.borderTemplate";
import {BorderTemplate} from 'open-physiology-model';

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
  
        <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          <!--InnerBorder-->
          <div class="input-control">      
            <label for="innerBorder">Inner border: </label>
            <borderTemplate-panel [item]="item.innerBorder" 
              (added)  ="addTemplate('innerBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </borderTemplate-panel>
          </div>
        
          <!--OuterBorder-->        
          <div class="input-control">      
            <label for="outerBorder">Inner border: </label>
            <borderTemplate-panel [item]="item.outerBorder" 
              (added)  ="addTemplate('outerBorder', templateName.BorderTemplate)"
              (saved)  ="updateProperty('outerBorder', $event)"    
              (removed)="removeTemplate('outerBorder', $event)">
            </borderTemplate-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>
        
      <ng-content></ng-content>      
  
    </template-panel>
  `,
  directives: [SingleSelectInput, TemplateValue, TemplatePanel, BorderTemplatePanel]
})
export class LyphTemplatePanel extends TemplatePanel{}
