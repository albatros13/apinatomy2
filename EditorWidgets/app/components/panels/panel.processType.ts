/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IProcessType, TransportPhenomenon} from "../../providers/service.apinatomy2";
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'processType-panel',
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <resource-panel [item]="item" [dependency]="dependency" [ignore]="['equivalence', 'weakEquivalence']" (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
          <label for="transportPhenomenon">Transport phenomenon: </label>
          
        </div>
        <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput]
})
export class ProcessTypePanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<IProcessType>){
    super(restoreService);
  }
}
