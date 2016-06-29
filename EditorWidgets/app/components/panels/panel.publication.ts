/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IPublication} from "../../providers/service.apinatomy2";
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'publication-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <resource-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput]
})
export class PublicationPanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<IPublication>){
    super(restoreService);
  }
}
