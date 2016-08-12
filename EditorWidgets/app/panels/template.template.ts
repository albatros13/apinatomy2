/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {ResourcePanel} from "./panel.resource";
import {TemplateName} from "../services/utils.model";

@Component({
  selector: 'template-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <resource-panel [item]="item" 
      [ignore]   = "ignore"  
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      
      <!--Type-->
      <div  *ngIf="includeProperty('type')" class="input-control">
        <label for="type">{{getPropertyLabel('type')}}: </label>
        <select-input-1 [item] = "item.p('type') | async"
         (updated)="onTypeUpdate($event)"    
         [options] = "getTypes() | async"></select-input-1>
      </div>
    
      <!--Template-->
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
          [options]="item.constructor.p('all') | async"></select-input>  
      </div>

      <ng-content></ng-content>            

    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, MultiSelectInput, ResourcePanel]
})
export class TemplatePanel extends ResourcePanel{
  protected templateName = TemplateName;

  onTypeUpdate(type: any){
    if (type && !this.item.name) this.item.name = "T:" + type.name;
    super.updateProperty('type', type);
  }

  getTypes(){
    return this.item.constructor.relationships['-->HasType'].codomain.resourceClass.p('all');
  }

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('externals');
  }

}

