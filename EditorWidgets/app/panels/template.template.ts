/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../components/component.select';
import {TemplateValue} from '../components/component.templateValue';
import {ResourcePanel} from "./panel.resource";
import {TemplateName} from "../services/utils.model";
//import {CylindricalLyphTemplate, OmegaTreeTemplate, OmegaTreePartTemplate} from "open-physiology-model";

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
        <label for="type">Type: </label>
        <select-input-1 [item] = "item.p('type') | async"
         (updated)="onTypeUpdate($event)"    
         [options] = "getTypes() | async"></select-input-1>
      </div>
    
      <!--Template-->
      <!--Cardinality base-->
      <template-value *ngIf="includeProperty('cardinalityBase')" caption="Cardinality base" 
        [item]="item.cardinalityBase"
        (updated)="updateProperty('cardinalityBase', $event)"
      ></template-value>
      
      <!--Cardinality multipliers-->
      <div class="input-control" *ngIf="includeProperty('cardinalityMultipliers')">
        <label for="cardinalityMultipliers">Cardinality multipliers: </label>
          <select-input [items]="item.p('cardinalityMultipliers') | async" 
          (updated)="updateProperty('cardinalityMultipliers', $event)"          
          [options]="getLinks() | async"></select-input>  
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

  getLinks(){
    // if ((this.item.class == TemplateName.OmegaTreeTemplate) || (this.item.class == TemplateName.CylindricalLyphTemplate)){
    //   return OmegaTreePartTemplate.p('all');
    // }
    return this.item.constructor.p('all');
  }

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('externals');
  }

}

