/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {FormType, TemplateName} from "../services/service.apinatomy2";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {FilterByClass} from "../transformations/pipe.general";
import {NodeTemplate} from "open-physiology-model";

@Component({
  selector: 'borderTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <button *ngIf="!item"  type="button" class="btn btn-default" aria-label="Add"
      (click)  = "added.emit($event)"><span class="glyphicon glyphicon-plus"></span>
    </button>
    
    <template-panel *ngIf="item" [item]="item" 
      [ignore]="ignore.add('name').add('cardinalityBase').add('cardinalityMultipliers').add('type')"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--Position: Template-->
      <template-value 
        *ngIf="includeProperty('position') && item.position">
        caption="Position:" [item]="item.position"
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
<!--      <div class="input-control" *ngIf="includeProperty('nodes')">
        <label for="nodes">Nodes: </label>
          <select-input [items]="item.p('nodes') | async" 
          (updated)="updateProperty('nodes', $event)"          
          [options]="NodeTemplate.p('all') | async"></select-input>  
      </div>-->
      
      <ng-content></ng-content>   
         
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, MultiSelectInput, TemplatePanel, RADIO_GROUP_DIRECTIVES],
  pipes: [FilterByClass]
})
export class BorderTemplatePanel extends TemplatePanel{
  NodeTemplate = NodeTemplate;
  public formType = FormType;
  protected templateName = TemplateName;
  @Output() added = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() propertyUpdated = new EventEmitter();
}
