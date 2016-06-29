/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {SingleSelectInput, ItemHeader} from '../component.general';
import {TemplateValue, RepoTemplateWrapper} from './template.general';
import {ResourcePanel} from "../panels/panel.resource";
import {RestoreService} from "../../providers/service.restore";
import {IGroupTemplate} from "../../providers/service.apinatomy2";

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
        <template-value caption="Cardinality base:" [item]="item.cardinalityBase"></template-value>
      </fieldset>
      <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, ResourcePanel]
})
export class GroupTypeTemplate extends ResourcePanel{
  constructor(protected restoreService: RestoreService<IGroupTemplate>){
    super(restoreService);
  }
}
