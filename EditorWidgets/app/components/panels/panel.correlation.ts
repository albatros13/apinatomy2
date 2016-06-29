/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ICorrelation} from "../../providers/service.apinatomy2";
import {ResourcePanel} from "./panel.resource";
import {SingleSelectInput, MultiSelectInput} from '../component.general';

@Component({
  providers: [RestoreService],
  selector: 'correlation-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <resource-panel [item]="item" [dependencies]="dependencies" [ignore]="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div>
          <label for="publication">Publication: </label>
          <select-input-1 [item] = "item.publication" [options] = "dependencies.publications"></select-input-1>
        </div>
        <div class="input-control" *ngIf="includeProperty('clinicalIndices')">
          <label for="clinicalIndices">Clinical indices: </label>
          <select-input [item]="item.clinicalIndices" [options]="dependencies.clinicalIndices"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('locatedMeasurables')">
          <label for="locatedMeasurables">Located measurables: </label>
          <select-input [item]="item.locatedMeasurables" [options]="dependencies.locatedMeasurables"></select-input>
        </div>
        <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, SingleSelectInput, MultiSelectInput]
})
export class CorrelationPanel extends ResourcePanel{
  constructor(protected restoreService: RestoreService<ICorrelation>){
    super(restoreService);
  }
}
