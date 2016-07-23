/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.template';
import {TemplatePanel} from "./template.type";
import {FormType} from "../providers/service.apinatomy2";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

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
      
      <ng-content></ng-content>   
         
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel, RADIO_GROUP_DIRECTIVES]
})
export class BorderTemplatePanel extends TemplatePanel{
  public formType = FormType;
  item: any;
}
