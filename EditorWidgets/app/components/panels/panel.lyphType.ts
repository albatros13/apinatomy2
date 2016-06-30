/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {RestoreService} from "../../providers/service.restore";
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  providers: [RestoreService],
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <materialType-panel [item]="item" 
        [dependencies]="dependencies" 
        (saved)="saved.emit($event)" (removed)="removed.emit($event)">
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" [(ngModel)]="item.species">
        </div>
        <div class="input-control" *ngIf="includeProperty('layerProviders')">
          <label for="layerProviders">Inherits layers from: </label>
          <select-input [item]="item.layerProviders" [options]="dependencies.lyphs"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('patchProviders')">
          <label for="patchProviders">Inherits patches from: </label>
          <select-input [item]="item.patchProviders" [options]="dependencies.lyphs"></select-input>
        </div>
        <div class="input-control" *ngIf="includeProperty('partProviders')">
          <label for="partProviders">Inherits parts from: </label>
          <select-input [item]="item.partProviders" [options]="dependencies.lyphs"></select-input>
        </div>
        <br/>
        <div class="input-control" *ngIf="includeProperty('layers')">
          <repo-template caption="Layers" [items] = "item.layers" [dependencies] = "dependencies" 
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate, templateName.NodeTemplate]"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('patches')">
          <repo-template caption="Patches" [items] = "item.patches" [dependencies] = "dependencies"
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('parts')">
          <repo-template caption="Parts" [items] = "item.parts" [dependencies] = "dependencies"
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('processes')">
          <repo-template caption="Processes" [items] = "item.processes" [dependencies] = "dependencies"
          [types] = "[templateName.ProcessTemplate]"></repo-template>
        </div>
        <div class="input-control" *ngIf="includeProperty('nodes')">
          <repo-template caption="Nodes" [items] = "item.nodes" [dependencies] = "dependencies"
          [types] = "[templateName.NodeTemplate]"></repo-template>
        </div>
        <!--InnerBorder-->
        <!--OuterBorder-->
        <ng-content></ng-content>
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, RepoTemplate]
})
export class LyphTypePanel extends MaterialTypePanel{
  constructor(protected restoreService: RestoreService<any>){
    super(restoreService);
  }
}
