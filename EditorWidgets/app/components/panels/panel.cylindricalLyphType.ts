/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {SideType} from "../../providers/service.apinatomy2";
import {LyphTypePanel} from "./panel.lyphType";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";
import {MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'cylindricalLyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <lyphType-panel 
      [item]="item" [dependencies]="dependencies" 
      (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('minusSide')">
          <fieldset>
            <legend>Minus side:</legend>
            <checkbox-group [(ngModel)]="item.plusSide" [required]="true">
             <input type="checkbox" [value]="sideType.open">{{sideType.open}}&nbsp;
             <input type="checkbox" [value]="sideType.closed">{{sideType.closed}}<br/>
            </checkbox-group>
          </fieldset>
        </div>
        <div class="input-control" *ngIf="includeProperty('plusSide')">
          <fieldset>
            <legend>Plus side:</legend>
             <checkbox-group [(ngModel)]="item.minusSide" [required]="true">
               <input type="checkbox" [value]="sideType.open">{{sideType.open}}&nbsp;
               <input type="checkbox" [value]="sideType.closed">{{sideType.closed}}<br/>
             </checkbox-group>
          </fieldset>
        </div>
        <div class="input-control" *ngIf="includeProperty('segmentProviders')">
          <label for="segmentProviders">Inherits segments from: </label>
          <select-input [item]="item.segmentProviders" [options]="dependencies.cylindricalLyphs"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('segments')">
          <repo-template caption="Segments" [items] = "item.segments" [dependencies] = "dependencies"
            [types]="[templateName.LyphTemplate]"></repo-template>
        </div>
        <ng-content></ng-content>
    </lyphType-panel>
  `,
  directives: [LyphTypePanel, RADIO_GROUP_DIRECTIVES, MultiSelectInput, RepoTemplate]
})
export class CylindricalLyphTypePanel extends LyphTypePanel{
  public sideType = SideType;

  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
