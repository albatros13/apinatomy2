/**
 * Created by Natallia on 6/19/2016.
 */
import {Component, Output} from '@angular/core';
import {TemplatePanel} from "./panel.template";
import {TemplateValue} from '../components/component.templateValue';
import {SingleSelectInput} from '../components/component.select';
import {model} from "../services/utils.model";
const {Measurable} = model;

@Component({
  selector: 'causality-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
       <!--Cause-->
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">{{getPropertyLabel('cause')}}: </label>
        <select-input-1 [item] = "item.p('cause') | async" 
          (updated)="updateProperty('cause', $event)"    
          [options] = "Measurable.p('all') | async"></select-input-1>
      </div>
      
      <!--Effect-->
      <div class="input-control" *ngIf="includeProperty('effect')">      
        <label for="effect">{{getPropertyLabel('effect')}}: </label>
        <select-input-1 [item] = "item.effect" 
          (updated) = "updateProperty('effect', $event)"    
          [options] = "Measurable.p('all') | async"></select-input-1>
      </div>
      
      <ng-content></ng-content>      
    
    </template-panel>
  `,
  directives: [TemplatePanel, TemplateValue, SingleSelectInput],
})
export class CausalityPanel extends TemplatePanel{
  Measurable = Measurable;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers')
  }

}
