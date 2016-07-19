/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {LyphTemplatePanel} from "./template.lyphType";

@Component({
  selector: 'cylindricalLyphTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <lyphTemplate-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="ignore"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
    
      <ng-content></ng-content>      
    
    </lyphTemplate-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, LyphTemplatePanel]
})
export class CylindricalLyphTemplatePanel extends LyphTemplatePanel{}
