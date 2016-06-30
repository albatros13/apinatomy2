/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../template.general';
import {TemplatePanel} from "./template.type";
import {RestoreService} from "../../providers/service.restore";

@Component({
  providers: [RestoreService],
  selector: 'nodeTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" [dependencies]="dependencies" ignore="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <ng-content></ng-content>      
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel]
})
export class NodeTemplatePanel extends TemplatePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
