/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {TemplateName} from "../services/utils.model";
import {LyphType} from "open-physiology-model";
import {SetToArray} from '../transformations/pipe.general';

@Component({
  selector: 'coalescence-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <resource-panel [item] = "item" 
      [ignore] = "ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--InterfaceLayers-->
        <div class="input-control" *ngIf="includeProperty('interfaceLayers')">
          <label for="interfaceLayers">Interface layers: </label>
          <select-input [items]="item.p('interfaceLayers') | async" 
          (updated)="updateProperty('interfaceLayers', $event)"          
          [options]="LyphType.p('all') | async"></select-input>
        </div>
        
      <!--Lyphs-->
        <div class="input-control" *ngIf="includeProperty('lyphs')">
          <repo-template caption='Lyphs' [items]="item.p('lyphs') | async | setToArray" 
          (updated)="updateProperty('lyphs', $event)"          
          [types]="[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>

        <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, RepoTemplate],
  pipes: [SetToArray]
})
export class CoalescencePanel extends ResourcePanel{
  protected templateName = TemplateName;
  LyphType = LyphType;
}
