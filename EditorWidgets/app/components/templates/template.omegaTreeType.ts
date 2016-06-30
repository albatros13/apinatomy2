/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../template.general';
import {GroupTemplatePanel} from "./template.groupType";
import {RestoreService} from "../../providers/service.restore";

@Component({
  providers: [RestoreService],
  selector: 'omegaTreeTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" [dependencies]="dependencies" ignore="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <ng-content></ng-content>      
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, GroupTemplatePanel]
})
export class OmegaTreeTemplatePanel extends GroupTemplatePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
