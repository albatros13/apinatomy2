/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput, MultiSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {ResourcePanel} from "../panels/panel.resource";
import {RestoreService} from "../../providers/service.restore";

@Component({
  providers: [RestoreService],
  selector: 'template-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <resource-panel [item]="item" 
      [ignore]="['externals']"  (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <div class="input-control">
        <label for="type">Type: </label>
        <select-input-1 [item] = "item.type" [options] = "dependencies.types"></select-input-1>
      </div>
      <fieldset>
        <legend>Template:</legend>
        <template-value caption="Cardinality base:" [item]="item.cardinalityBase"></template-value>
        <div class="input-control" *ngIf="includeProperty('cardinalityMultipliers')">
          <label for="cardinalityMultipliers">Cardinality multipliers: </label>
            <select-input [item]="item.cardinalityMultipliers" [options]="dependencies.templates"></select-input>  
        </div>
        <ng-content></ng-content>           
      </fieldset>
    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, MultiSelectInput, ResourcePanel]
})
export class TemplatePanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}

