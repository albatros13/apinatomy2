/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {TypePanel} from "./panel.type";
//import {RepoTemplate} from '../repos/repo.template';
import {FormType} from "../services/service.apinatomy2";

@Component({
  selector: 'borderType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <type-panel [item] = "item" 
      [(dependencies)] = "dependencies" 
      [ignore] = "ignore"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">
            
      <div class="input-control">
        <label for="position">Position: {{item.position}}</label>
        <input type="range" min="0" max="100" step="0.1" required [(ngModel)]="item.position">
      </div>
      
      <!--Form-->
      <div class="input-control" *ngIf="includeProperty('form')">
          <fieldset>
            <legend>Form:</legend>
            <checkbox-group [(ngModel)]="item.form" [required]="true">
               <input type="checkbox" [value]="formType.open">{{formType.open}}&nbsp;
               <input type="checkbox" [value]="formType.closed">{{formType.closed}}<br/>
            </checkbox-group>
          </fieldset>
      </div>
      
      <!--Nodes-->
      <!--<repo-template caption="Nodes" [items] = "item.nodes" -->
        <!--(updated)="updateProperty('nodes', $event)"          -->
        <!--[dependencies] = "dependencies" [types]="[templateName.NodeTemplate]"></repo-template>-->
      <!--<ng-content></ng-content>           -->
       
    </type-panel>
  `,
  directives: [TypePanel/*, RepoTemplate*/]
})
export class BorderTypePanel extends TypePanel{
  public formType = FormType;
}
