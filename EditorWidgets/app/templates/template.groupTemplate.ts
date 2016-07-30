/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";

@Component({
  selector: 'groupTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [types]="dependencies.groups" 
      [templates]= "dependencies.templates" 
      [ignore]="ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <ng-content></ng-content>      

    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class GroupTemplatePanel extends TemplatePanel{}