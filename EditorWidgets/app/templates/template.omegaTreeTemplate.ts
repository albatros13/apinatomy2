/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {GroupTemplatePanel} from "./template.groupTemplate";

@Component({
  selector: 'omegaTreeTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore', 'options'],
  template:`
    <groupTemplate-panel [item]="item" 
      [dependencies]="dependencies"
      [ignore]="ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
          
      <ng-content></ng-content>      
    
    </groupTemplate-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, GroupTemplatePanel]
})
export class OmegaTreeTemplatePanel extends GroupTemplatePanel{
}
