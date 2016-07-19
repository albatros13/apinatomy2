/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {TemplateValue} from '../component.template';
import {TemplatePanel} from "./template.type";
import {SingleSelectInput} from '../component.general';
import {FilterByClass} from "../../transformations/pipe.general";

@Component({
  selector: 'causalityTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <template-panel [item]="item" 
      [dependencies]="dependencies"  
      [ignore]="ignore"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Cause-->
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">Cause: </label>
        <select-input-1 [item] = "item.cause" 
          (updated)="updateProperty('cause', $event)"    
          [options] = "dependencies.templates | filterByClass: [templateName.MeasurableTemplate]"></select-input-1>
      </div>
      
      <!--Effect-->
      <div class="input-control" *ngIf="includeProperty('effect')">      
        <label for="effect">Effect: </label>
        <select-input-1 [item] = "item.effect" 
          (updated)="updateProperty('effect', $event)"    
          [options] = "dependencies.templates | filterByClass: [templateName.MeasurableTemplate]"></select-input-1>
      </div>
    
      <ng-content></ng-content>      
    
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel],
  pipes: [FilterByClass]
})
export class CausalityTemplatePanel extends TemplatePanel{}
