/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TemplatePanel} from "./panel.template";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {model} from "../services/utils.model";
const {Material, MeasurableLocation} = model;

@Component({
  selector: 'measurable-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <template-panel [item]="item" 
      [ignore]="ignore" 
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
       <!--Quality-->
      <div class="input-control" *ngIf="includeProperty('quality')">
        <label for="quality">{{getPropertyLabel('quality')}}: </label>
        <input type="text" class="form-control" required [(ngModel)]="item.quality">
      </div>
      
      <!--Materials-->
      <div class="input-control" *ngIf="includeProperty('materials')">
        <label for="materials">{{getPropertyLabel('materials')}}: </label>
        <select-input [items]="item.p('materials') | async" 
        (updated)="updateProperty('materials', $event)"     
        [options]="item.fields['materials'].p('possibleValues') | async"></select-input>
      </div> 
        
      <!--Location-->
      <div class="input-control" *ngIf="includeProperty('location')">
        <label for="location">{{getPropertyLabel('location')}}: </label>
        <select-input-1 [items]="item.p('location') | async" 
        (updated)="updateProperty('location', $event)"     
        [options]="item.fields['location'].p('possibleValues') | async"></select-input-1>
      </div>   
      
      <!--Causes-->
      <div class="input-control" *ngIf="includeProperty('causes')">
        <label for="causes">{{getPropertyLabel('causes')}}: </label>
        <select-input [items]="item.p('causes') | async" 
        (updated)="updateProperty('causes', $event)"     
        [options]="item.fields['causes'].p('possibleValues') | async"></select-input>
      </div> 
      
      <!--Effects-->
      <div class="input-control" *ngIf="includeProperty('effects')">
        <label for="effects">{{getPropertyLabel('effects')}}: </label>
        <select-input [items]="item.p('effects') | async" 
        (updated)="updateProperty('effects', $event)"     
        [options]="item.fields['effects'].p('possibleValues') | async"></select-input>
      </div> 
       
      <ng-content></ng-content>   
         
    </template-panel>
  `,
  directives: [TemplatePanel,  MultiSelectInput, SingleSelectInput]
})
export class MeasurablePanel extends TemplatePanel{
  Material = Material;
  MeasurableLocation = MeasurableLocation;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('cardinalityBase').add('cardinalityMultipliers')
  }
}

