/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.template';
import {TemplatePanel} from "./template.type";
import {FormType, TemplateName} from "../services/service.apinatomy2";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {FilterByClass} from "../transformations/pipe.general";

@Component({
  selector: 'borderTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <template-panel [item]="item" 
      [dependencies] = "dependencies"  
      [ignore]="ignore"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--Position: Template-->
      <template-value caption="Position:" [item]="item.position"
      (updated)="updateProperty('position', $event)"></template-value>
      
      <!--Form: {open, closed}-->
      <div class="input-control" *ngIf="includeProperty('form') && item.form">
        <fieldset>
          <legend>Form:</legend>
          <radio-group [(ngModel)]="item.form" [required]="true">
             <input type="radio" [value]="formType.open">{{formType.open}}&nbsp;
             <input type="radio" [value]="formType.closed">{{formType.closed}}<br/>
          </radio-group>
        </fieldset>
      </div>
      
      <!--Nodes-->
       <div class="input-control" *ngIf="includeProperty('nodes')">
          <label for="nodes">Nodes: </label>
            <select-input [items]="item.nodes" 
            (updated)="updateProperty('nodes', $event)"          
            [options]="dependencies.templates  | filterByClass: [templateName.NodeTemplate]"></select-input>  
        </div>
      
      <ng-content></ng-content>   
         
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, MultiSelectInput, TemplatePanel, RADIO_GROUP_DIRECTIVES],
  pipes: [FilterByClass]
})
export class BorderTemplatePanel extends TemplatePanel{
  public formType = FormType;
  protected templateName = TemplateName;
}
