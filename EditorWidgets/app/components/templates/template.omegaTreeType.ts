/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {GroupTemplatePanel} from "./template.groupType";

@Component({
  selector: 'omegaTreeTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <template-panel [item]="item" 
      [dependencies]="dependencies" 
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
           
      <ng-content></ng-content>      
    
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, GroupTemplatePanel]
})
export class OmegaTreeTemplatePanel extends GroupTemplatePanel{
}
