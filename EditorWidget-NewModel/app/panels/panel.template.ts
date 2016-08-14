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
      (saved)    = "onSaved($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <toolbar *ngIf="!(options && options.hideCreateType)" >
        <input type="checkbox" [(ngModel)]="createType">Create type
      </toolbar>
      
      <!--Species-->
      <div class="input-control" *ngIf="includeProperty('species')">
        <label for="species">Species: </label>
        <input type="text" class="form-control" [(ngModel)]="item.species">
      </div>

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
      
      <!--Types-->
      <div class="input-control" *ngIf="includeProperty('types')">
        <label for="types">{{getPropertyLabel('types')}}: </label>
          <select-input [items]="item.p('types') | async" 
          (updated)="updateProperty('types', $event)"          
          [options]="item.fields['types'].p('possibleValues') | async"></select-input>  
      </div>
      
      <ng-content select="relationGroup"></ng-content>
      
      <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, TemplateValue]
})
export class TemplatePanel extends ResourcePanel{
  createType = false;

  onSaved(event: any){
    this.saved.emit({createType: this.createType});
  }

  //return this.item.constructor.relationships['-->HasType'].codomain.resourceClass.p('all');

}
