/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.template';
import {TemplatePanel} from "./template.type";

@Component({
  selector: 'measurableTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <template-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <ng-content></ng-content>      

    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class MeasurableTemplatePanel extends TemplatePanel{}
