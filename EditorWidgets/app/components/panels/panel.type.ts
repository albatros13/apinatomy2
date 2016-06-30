/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../component.general';
import {TemplateName} from "../../providers/service.apinatomy2";

@Component({
  providers: [RestoreService],
  selector: 'type-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <resource-panel [item]="item" 
      [dependencies]="dependencies" 
      (saved)="saved.emit($event)" 
      (removed)="removed.emit($event)">
         <div class="input-control" *ngIf="includeProperty('supertypes')">
            <label for="name">Supertypes: </label>
            <select-input [item]="item.supertypes" [options]="dependencies.types"></select-input>
         </div>
         <div class="input-control" *ngIf="includeProperty('subtypes')">
            <label for="name">Subtypes: </label>
            <select-input [item]="item.subtypes" [options]="dependencies.types"></select-input>
         </div>
        <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput]
})
export class TypePanel extends ResourcePanel{
  protected templateName = TemplateName;
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
