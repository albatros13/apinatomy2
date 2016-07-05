/**
 * Created by Natallia on 6/21/2016.
 */
import {Component} from '@angular/core';
import {SingleSelectInput} from '../component.general';
import {TemplateValue} from '../component.template';
import {GroupTemplatePanel} from "./template.groupType";

@Component({
  selector: 'omegaTreeTemplate-panel',
  inputs: ['item', 'dependencies'],
  template:`
    <template-panel [item]="item" [dependencies]="dependencies" 
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
      <div class="input-control" *ngIf="includeProperty('minusSide')">
          <fieldset>
            <legend>Minus side:</legend>
            <radio-group [(ngModel)]="item.plusSide" [required]="true">
             <input type="radio" [value]="sideType.open">{{sideType.open}}&nbsp;
             <input type="radio" [value]="sideType.closed">{{sideType.closed}}<br/>
            </radio-group>
          </fieldset>
        </div>
        <div class="input-control" *ngIf="includeProperty('plusSide')">
          <fieldset>
            <legend>Plus side:</legend>
             <radio-group [(ngModel)]="item.minusSide" [required]="true">
               <input type="radio" [value]="sideType.open">{{sideType.open}}&nbsp;
               <input type="radio" [value]="sideType.closed">{{sideType.closed}}<br/>
             </radio-group>
          </fieldset>
      </div>
      <ng-content></ng-content>      
    </template-panel>
  `,
  directives: [TemplateValue, SingleSelectInput, GroupTemplatePanel]
})
export class OmegaTreeTemplatePanel extends GroupTemplatePanel{
}
