/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../template.general';
import {LyphTemplatePanel} from "./template.lyphType";
import {RestoreService} from "../../providers/service.restore";

@Component({
  providers: [RestoreService],
  selector: 'cylindricalLyphTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <lyphTemplate-panel [item]="item" [dependencies]="dependencies" ignore="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <ng-content></ng-content>      
    </lyphTemplate-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, LyphTemplatePanel]
})
export class CylindricalLyphTemplatePanel extends LyphTemplatePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
