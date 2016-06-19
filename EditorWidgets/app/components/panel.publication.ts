/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../providers/service.restore";
import {IPublication} from "../providers/service.apinatomy2";
import {ResourcePanel} from "./panel.resource";
import {SelectInput} from './component.general';

@Component({
  providers: [RestoreService],
  selector: 'publication-panel',
  inputs: ['item', 'ignore'],
  template:`
    <resource-panel [item]="item" [ignore]="['equivalence', 'weakEquivalence']" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <inputs>
        <ng-content select="inputs"></ng-content>      
      </inputs>
    </resource-panel>
  `,
  directives: [ResourcePanel, SelectInput]
})
export class PublicationPanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<IPublication>){
    super(restoreService);
  }
}
