/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {ResourcePanel} from "../panels/panel.resource";
import {TemplateName} from "../services/service.apinatomy2";

@Component({
  selector: 'template-panel',
  inputs: ['item', 'templates', 'types', 'ignore', 'options'],
  template:`
    <resource-panel [item]="item" 
      [ignore]="ignore.add('externals')"  
      [options]  = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
      <!--No use for dependencies-->
      <!--[dependencies]="dependencies"-->
      
      <!--Type-->
      <div  *ngIf="includeProperty('type')" class="input-control">
        <label for="type">Type: </label>
        <select-input-1 [item] = "item.type"
         (updated)="updateProperty('type', $event)"    
         [options] = "types"></select-input-1>
      </div>
    
      <!--Template-->
      <div *ngIf="includeProperty('cardinality')">
        <!--Cardinality base-->
        <template-value caption="Cardinality base" 
          [item]="item.cardinalityBase"
          (updated)="updateProperty('cardinalityBase', $event)"
        ></template-value>
        
        <!--Cardinality multipliers-->
        <div class="input-control" *ngIf="includeProperty('cardinalityMultipliers')">
          <label for="cardinalityMultipliers">Cardinality multipliers: </label>
            <select-input [items]="item.cardinalityMultipliers" 
            (updated)="updateProperty('cardinalityMultipliers', $event)"          
            [options]="templates"></select-input>  
        </div>
      </div>
      <ng-content></ng-content>            
    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, MultiSelectInput, ResourcePanel]
})
export class TemplatePanel extends ResourcePanel{
  protected templateName = TemplateName;
}

