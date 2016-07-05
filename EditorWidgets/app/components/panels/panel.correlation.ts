/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {SingleSelectInput, MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'correlation-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <resource-panel [item]="item" [dependencies]="dependencies" [ignore]="['externals']"  
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
         <div class="input-control" *ngIf="includeProperty('comment')">
          <label for="comment">Comment: </label>
          <input type="text" [(ngModel)]="item.comment">
        </div>
        <div>
          <label for="publication">Publication: </label>
          <select-input-1 [item] = "item.publication" 
            (updated)="updateProperty('publication', $event)"  
            [options] = "dependencies.publications"></select-input-1>
        </div>
        <div class="input-control" *ngIf="includeProperty('clinicalIndices')">
          <label for="clinicalIndices">Clinical indices: </label>
          <select-input [items]="item.clinicalIndices" 
          (updated)="updateProperty('clinicalIndices', $event)"
          [options]="dependencies.clinicalIndices"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' [items]="item.measurables" 
          (updated)="updateProperty('measurables', $event)"          
          [dependencies]="dependencies"
          [types]="[templateName.MeasurableTemplate]"></repo-template>
        </div>
        <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, SingleSelectInput, MultiSelectInput, RepoTemplate]
})
export class CorrelationPanel extends ResourcePanel{}
