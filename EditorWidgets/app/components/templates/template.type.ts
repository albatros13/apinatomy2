/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../template.general';
import {ResourcePanel} from "../panels/panel.resource";
import {RestoreService} from "../../providers/service.restore";

@Component({
  providers: [RestoreService],
  selector: 'template-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <resource-panel [item]="item" ignore="['equivalence', 'weakEquivalence']" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <label for="type">Type: </label>
      <select-input-1 [item] = "item.type" [options] = "dependencies"></select-input-1>
      <fieldset>
        <legend>Template:</legend>
        <template-value caption="Cardinality base:" [item]="item.cardinalityBase"></template-value>
        <ng-content></ng-content>           
      </fieldset>
    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, ResourcePanel]
})
export class TemplatePanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}

