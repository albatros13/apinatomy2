/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {IProcessType, TransportPhenomenon} from "../../providers/service.apinatomy2";
import {TypePanel} from "./panel.type";
import {MultiSelectInput} from '../component.general';
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";


@Component({
  providers: [RestoreService],
  selector: 'processType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item]="item" 
      [dependencies]="dependencies" 
      [ignore]="['equivalence', 'weakEquivalence']" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
          <fieldset>
            <legend>Transport phenomenon:</legend>
            <radio-group [(ngModel)]="item.transportPhenomenon" [required]="true">
               <input type="radio" [value]="transportPhenomenon.diffusion">{{transportPhenomenon.diffusion}}&nbsp;
               <input type="radio" [value]="transportPhenomenon.advection">{{transportPhenomenon.advection}}<br/>
             </radio-group>
          </fieldset>
        </div>
        <div class="input-control" *ngIf="includeProperty('measurables')">
          <repo-template caption='Measurables' [items]="item.measurables" [dependencies]="dependencies.measurableTypes"></repo-template>
        </div>
        <ng-content></ng-content>      
    </type-panel>
  `,
  directives: [TypePanel, MultiSelectInput, RADIO_GROUP_DIRECTIVES]
})
export class ProcessTypePanel extends TypePanel{
  transportPhenomenon = TransportPhenomenon;
  constructor(protected restoreService: RestoreService<IProcessType>){
    super(restoreService);
  }
}
