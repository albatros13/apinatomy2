/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.template';
import {ResourcePanel} from "../panels/panel.resource";
import {TemplateName} from "../services/service.apinatomy2";

@Component({
  selector: 'template-panel',
  inputs: ['item', 'dependencies', 'ignore'],
  template:`
    <resource-panel [item]="item" 
      [dependencies]="dependencies.types"
      [ignore]="ignore.concat(['externals'])"  
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
    
      <!--Type-->
      <div class="input-control">
        <label for="type">Type: </label>
        <select-input-1 [item] = "item.type"
         (updated)="updateProperty('type', $event)"    
         [options] = "dependencies.types"></select-input-1>
      </div>
    
      <!--Template-->
      <div *ngIf="includeProperty('template')">

        <!--Cardinality base-->
        <template-value caption="Cardinality base:" 
          [item]="item.cardinalityBase"
          (updated)="updateProperty('cardinalityBase', $event)"
          ></template-value>
        
        <!--Cardinality multipliers-->
        <div class="input-control" *ngIf="includeProperty('cardinalityMultipliers')">
          <label for="cardinalityMultipliers">Cardinality multipliers: </label>
            <select-input [items]="item.cardinalityMultipliers" 
            (updated)="updateProperty('cardinalityMultipliers', $event)"          
            [options]="dependencies.templates"></select-input>  
        </div>
        <ng-content></ng-content>           
      </div>
    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, MultiSelectInput, ResourcePanel]
})
export class TemplatePanel extends ResourcePanel{
  protected templateName = TemplateName;
}

