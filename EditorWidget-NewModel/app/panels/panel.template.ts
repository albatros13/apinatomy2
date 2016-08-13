/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';

@Component({
  selector: 'template-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <resource-panel [item]="item" 
      [ignore]   ="ignore"
      [options]  ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Supertypes-->
<!--      <div class="input-control" *ngIf="includeProperty('supertypes')">
        <label for="supertypes">{{getPropertyLabel('supertypes')}}: </label>
        <select-input [items]="item.p('supertypes') | async" 
        (updated)="updateProperty('supertypes', $event)" 
        [options]="item.constructor.p('all') | async"></select-input>
      </div>-->
      
      <!--Subtypes-->
<!--      <div class="input-control" *ngIf="includeProperty('subtypes')">
        <label for="subtypes">{{getPropertyLabel('subtypes')}}:: </label>
        <select-input [items]="item.p('subtypes') | async" 
          (updated)="updateProperty('subtypes', $event)" 
        [options]="item.constructor.p('all') | async"></select-input>
      </div>-->
      
      <!--Cardinality base-->
      <template-value *ngIf="includeProperty('cardinalityBase')" 
        [caption]="getPropertyLabel('cardinalityBase')" 
        [item]="item.cardinalityBase"
        [step]="0.1"
        (updated)="updateProperty('cardinalityBase', $event)"
      ></template-value>
      
      <!--Cardinality multipliers-->
      <div class="input-control" *ngIf="includeProperty('cardinalityMultipliers')">
        <label for="cardinalityMultipliers">{{getPropertyLabel('cardinalityMultipliers')}}: </label>
          <select-input [items]="item.p('cardinalityMultipliers') | async" 
          (updated)="updateProperty('cardinalityMultipliers', $event)"          
          [options]="item.fields['cardinalityMultipliers'].p('possibleValues') | async"></select-input>  
      </div>

      <ng-content select="relationGroup"></ng-content>
      
      <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, TemplateValue]
})
export class TemplatePanel extends ResourcePanel{

  //return this.item.constructor.relationships['-->HasType'].codomain.resourceClass.p('all');

}
