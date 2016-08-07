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
      [ignore]   = "ignore"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Cause-->
      <div class="input-control" *ngIf="includeProperty('cause')">      
        <label for="cause">Cause: </label>
        <select-input-1 [item] = "item.p('cause') | async" 
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

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers')
  }
}
