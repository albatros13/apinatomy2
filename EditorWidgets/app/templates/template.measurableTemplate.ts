/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";

@Component({
  selector: 'measurableTemplate-panel',
  inputs: ['item', 'dependencies', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [types]="dependencies.measurables"
      [ignore]="ignore.add('cardinality')"
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--Location-->
      <div class="input-control" *ngIf="includeProperty('location')">
        <label for="location">Location: </label>
        <select-input-1 [items]="item.location" 
        (updated)="updateProperty('location', $event)"     
        [options]="dependencies.locations"></select-input-1>
      </div>   
      
      <ng-content></ng-content>      

    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class MeasurableTemplatePanel extends TemplatePanel{}
