/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {TemplatePanel} from "./template.type";

@Component({
  selector: 'causalityTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" [dependencies]="dependencies"  
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">

      <ng-content></ng-content>      
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class CausalityTemplatePanel extends TemplatePanel{}
