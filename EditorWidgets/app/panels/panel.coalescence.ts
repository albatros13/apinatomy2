/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {TemplateName} from "../services/service.apinatomy2";

@Component({
  selector: 'coalescence-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <resource-panel [item] = "item" 
      [dependencies] = "dependencies" 
      [ignore] = "ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--InterfaceLayers-->
        <div class="input-control" *ngIf="includeProperty('interfaceLayers')">
          <label for="interfaceLayers">Interface layers: </label>
          <select-input [items]="item.interfaceLayers" 
          (updated)="updateProperty('interfaceLayers', $event)"          
          [options]="dependencies.lyphs"></select-input>
        </div>
        
      <!--Lyphs-->
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
export class CoalescencePanel extends ResourcePanel{
  protected templateName = TemplateName;
}
