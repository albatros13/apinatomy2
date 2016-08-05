/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {TemplatePanel} from "./template.template";
import {MeasurableLocationType} from "open-physiology-model";

@Component({
  selector: 'measurableTemplate-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]   = "ignore"
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
        [options]="MeasurableLocationType.p('all') | async"></select-input-1>
      </div>   
      
      <!--Causes-->
      <!--Effects-->
      
      <ng-content></ng-content>      

    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class MeasurableTemplatePanel extends TemplatePanel{
  MeasurableLocationType = MeasurableLocationType;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers')
  }
}
