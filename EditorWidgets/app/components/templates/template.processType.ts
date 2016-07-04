/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {TemplatePanel} from "./template.type";
import {RestoreService} from "../../providers/service.restore";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {TransportPhenomenon} from "../../providers/service.apinatomy2";

@Component({
  providers: [RestoreService],
  selector: 'processTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" [dependencies]="dependencies" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
      <div class="input-control" *ngIf="includeProperty('transportPhenomenon')">
        <fieldset>
          <legend>Transport phenomenon:</legend>
          <radio-group [(ngModel)]="item.transportPhenomenon" [required]="true">
             <input type="radio" [value]="transportPhenomenon.diffusion">{{transportPhenomenon.diffusion}}&nbsp;
             <input type="radio" [value]="transportPhenomenon.advection">{{transportPhenomenon.advection}}<br/>
           </radio-group>
        </fieldset>
      </div>
      <ng-content></ng-content>      
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, TemplatePanel, RADIO_GROUP_DIRECTIVES]
})
export class ProcessTemplatePanel extends TemplatePanel{
  transportPhenomenon = TransportPhenomenon;

  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
