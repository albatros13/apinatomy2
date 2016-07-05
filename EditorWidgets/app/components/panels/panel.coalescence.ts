/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'coalescence-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <resource-panel [item]="item" [dependencies]="dependencies" [ignore]="['externals']"  
            (saved)    = "saved.emit($event)"
            (canceled) = "canceled.emit($event)"
            (removed)  = "removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('interfaceLayers')">
          <label for="interfaceLayers">Interface layers: </label>
          <select-input [items]="item.interfaceLayers" 
          (updated)="updateProperty('interfaceLayers', $event)"          
          [options]="dependencies.interfaceLayers"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('lyphs')">
          <repo-template caption='Lyphs' [items]="item.lyphs" 
          (updated)="updateProperty('lyphs', $event)"          
          [dependencies]="dependencies"
          [types]="[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        <ng-content></ng-content>      
    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, RepoTemplate]
})
export class CoalescencePanel extends ResourcePanel{}
