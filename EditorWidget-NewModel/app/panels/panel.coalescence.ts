/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {RepoNested} from '../repos/repo.nested';
import {model} from "../services/utils.model";
const {Lyph} = model;
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
          <label for="interfaceLayers">{{getPropertyLabel('interfaceLayers')}}: </label>
          <select-input [items]="item.p('interfaceLayers') | async" 
          (updated)="updateProperty('interfaceLayers', $event)"          
          [options]="Lyph.p('all') | async"></select-input>
        </div>
        
      <!--Lyphs-->
        <div class="input-control" *ngIf="includeProperty('lyphs')">
          <repo-nested [caption]="getPropertyLabel('lyphs')" 
          [items]="item.p('lyphs') | async | setToArray" 
          (updated)="updateProperty('lyphs', $event)"          
          [types]="[ResourceName.Lyph, ResourceName.CylindricalLyph]"></repo-nested>
        </div>

        <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, RepoNested],
  pipes: [SetToArray]
})
export class CoalescencePanel extends ResourcePanel{
  Lyph = Lyph;
}
