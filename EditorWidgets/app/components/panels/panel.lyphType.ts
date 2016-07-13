/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput, SingleSelectInput, EditToolbar} from '../component.general';
import {RepoTemplate} from '../repos/repo.template';
import {ProcessTemplate, BorderTemplate} from '../../providers/service.apinatomy2';
import {BorderTemplatePanel} from '../templates/template.borderType';
import {FilterByClass, FilterBy} from "../../transformations/pipe.general";

@Component({
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <materialType-panel [item]="item" 
        [(dependencies)]="dependencies" 
        [ignore]="ignore"
        (saved)    = "saved.emit($event)"
        (canceled) = "canceled.emit($event)"
        (removed)  = "removed.emit($event)"
        (propertyUpdated) = "propertyUpdated.emit($event)">
        
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" [(ngModel)]="item.species">
        </div>

        <!--Layers-->
        <div class="input-control" *ngIf="includeProperty('layers')">
          <repo-template caption="Layers" 
          [items] = "item.layers" 
          (updated)="updateProperty('layers', $event)" 
          [dependencies] = "dependencies" 
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate, templateName.NodeTemplate]"></repo-template>
        </div>
        
        <!--LayerProviders-->
        <div class="input-control" *ngIf="includeProperty('layerProviders')">
          <label for="layerProviders">Inherits layers from: </label>
          <select-input [items]="item.layerProviders" 
          (updated)="updateProperty('layerProviders', $event)" 
          [options]="dependencies.lyphs"></select-input>
        </div>

        <!--Patches-->
        <div class="input-control" *ngIf="includeProperty('patches')">
          <repo-template caption="Patches" [items] = "item.patches" 
          (updated)="updateProperty('patches', $event)" 
          [dependencies] = "dependencies"
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        
        <!--PatchProviders-->
        <div class="input-control" *ngIf="includeProperty('patchProviders')">
          <label for="patchProviders">Inherits patches from: </label>
          <select-input [items]="item.patchProviders" 
          (updated)="updateProperty('patchProviders', $event)" 
          [options]="dependencies.lyphs"></select-input>
        </div>

        <!--Parts-->
        <div class="input-control" *ngIf="includeProperty('parts')">
          <repo-template caption="Parts" 
          [items] = "item.parts" 
          (updated)="updateProperty('parts', $event)" 
          [dependencies] = "dependencies"
          [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
        </div>
        
        <!--PartProviders-->
        <div class="input-control" *ngIf="includeProperty('partProviders')">
          <label for="partProviders">Inherits parts from: </label>
          <select-input [items]="item.partProviders"
          (updated)="updateProperty('partProviders', $event)" 
          [options]="dependencies.lyphs"></select-input>
        </div>

        <!--Processes-->
        <div class="input-control" *ngIf="includeProperty('processes')">
          <repo-template caption="Processes" 
          [items] = "item.processes" [dependencies] = "dependencies"
          (updated)="updateProperty('processes', $event)"           
          [types] = "[templateName.ProcessTemplate]" (added)="onProcessAdded($event)"></repo-template>
        </div>
        
        <!--Nodes-->
        <div class="input-control" *ngIf="includeProperty('nodes')">
          <repo-template caption="Nodes" 
          [items] = "item.nodes" 
          (updated)="updateProperty('nodes', $event)"
          [dependencies] = "dependencies"
          [types] = "[templateName.NodeTemplate]"></repo-template>
        </div>
        
        <!--InnerBorder-->
        <div class="input-control" *ngIf="includeProperty('innerBorder')">      
          <label for="item.innerBorder">Inner border: </label>
          <borderTemplate-panel [item]="item.innerBorder" 
            [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
            (saved)="updateProperty('innerBorder', $event)"    
            (removed)="updateProperty('innerBorder', null)">
          </borderTemplate-panel>
        </div>
        
        <!--OuterBorder-->
        <div class="input-control" *ngIf="includeProperty('outerBorder')">      
          <label for="item.outerBorder">Outer border: </label>
          <borderTemplate-panel [item]="item.outerBorder" 
            [dependencies]="{types: dependencies.borders, templates: dependencies.templates}" 
            (saved)="updateProperty('outerBorder', $event)"    
            (removed)="updateProperty('outerBorder', null)">
          </borderTemplate-panel>
        </div>            
        
        <ng-content></ng-content>
        
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, SingleSelectInput, RepoTemplate, BorderTemplatePanel, EditToolbar],
  pipes: [FilterByClass, FilterBy]
})
export class LyphTypePanel extends MaterialTypePanel{
  dependencies: any;

  addProperty(property: string){
    this.item[property] = new BorderTemplate({name: "T: " + property + " " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item[property]);
    }
  }

  onProcessAdded(process: ProcessTemplate){
    if (process) process.conveyingLyph = this.item;
  }

}
