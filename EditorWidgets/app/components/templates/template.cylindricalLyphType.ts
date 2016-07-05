/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {LyphTemplatePanel} from "./template.lyphType";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'cylindricalLyphTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <lyphTemplate-panel [item]="item" [dependencies]="dependencies" 
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
      <ng-content></ng-content>      
    </lyphTemplate-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, LyphTemplatePanel, RADIO_GROUP_DIRECTIVES]
})
export class CylindricalLyphTemplatePanel extends LyphTemplatePanel{}
