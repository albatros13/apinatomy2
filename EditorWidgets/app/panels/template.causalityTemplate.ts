/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {SingleSelectInput} from '../components/component.select';
import {FilterByClass} from "../transformations/pipe.general";
import {MeasurableTemplate} from "open-physiology-model";

@Component({
  selector: 'causalityTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "myIgnore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Cause-->
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">Cause: </label>
        <select-input-1 [item] = "item.cause" 
          (updated)="updateProperty('cause', $event)"    
          [options] = "MeasurableTemplate.p('all') | async"></select-input-1>
      </div>
      
      <!--Effect-->
      <div class="input-control" *ngIf="includeProperty('effect')">      
        <label for="effect">Effect: </label>
        <select-input-1 [item] = "item.effect" 
          (updated) = "updateProperty('effect', $event)"    
          [options] = "MeasurableTemplate.p('all') | async"></select-input-1>
      </div>
    
      <ng-content></ng-content>      
    
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel],
  pipes: [FilterByClass]
})
export class CausalityTemplatePanel extends TemplatePanel{
  MeasurableTemplate = MeasurableTemplate;

  myIgnore: Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.myIgnore = new Set<string>(this.ignore).add('cardinalityBase').add('cardinalityMultipliers')
  }
}
