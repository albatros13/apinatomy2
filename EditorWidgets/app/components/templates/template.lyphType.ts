/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from './template.general';
import {ResourcePanel} from "../panels/panel.resource";
import {RestoreService} from "../../providers/service.restore";
import {ILyphTemplate} from "../../providers/service.apinatomy2";

@Component({
  providers: [RestoreService],
  selector: 'lyphType-template',
  inputs: ['item', 'dependencies'],
  template:`
    <resource-panel [item]="item" ignore="['equivalence', 'weakEquivalence']" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <div>
        <label for="type">Type: </label>
        <select-input-1 [item] = "item.type" [options] = "dependencies"></select-input-1>
      </div>
      <fieldset>
        <legend>Template:</legend>
        <template-value caption="Length:" [item]="item.length"></template-value>
        <template-value caption="Width:" [item]="item.width"></template-value>
      </fieldset>
      <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, ResourcePanel]
})
export class LyphTypeTemplate extends ResourcePanel{
  constructor(protected restoreService: RestoreService<ILyphTemplate>){
    super(restoreService);
  }
}
