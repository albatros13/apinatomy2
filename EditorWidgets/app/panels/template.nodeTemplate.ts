/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";

@Component({
  selector: 'nodeTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "myIgnore"
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
export class NodeTemplatePanel extends TemplatePanel{
  myIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.myIgnore = new Set<string>(this.ignore).add('cardinalityBase').add('cardinalityMultipliers')
  }
}
