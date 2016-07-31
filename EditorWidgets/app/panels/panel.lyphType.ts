/**
 * Created by Natallia on 6/17/2016.
 */
import {Component, Output} from '@angular/core';
import {MaterialTypePanel} from "./panel.materialType";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {FilterByClass, FilterBy} from "../transformations/pipe.general";
import {BorderTemplatePanel} from "../templates/template.borderTemplate";

import {ProcessTemplate, BorderTemplate} from "open-physiology-model";

@Component({
  selector: 'lyphType-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <materialType-panel [item]="item" 
        [dependencies]="dependencies" 
        [ignore]="ignore"
        [options] ="options"
        (saved)    = "saved.emit($event)"
        (canceled) = "canceled.emit($event)"
        (removed)  = "removed.emit($event)"
        (propertyUpdated) = "propertyUpdated.emit($event)">
        
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" class="form-control" [(ngModel)]="item.species">
        </div>
         
           
        
        <providerGroup>
          <!--LayerProviders-->
          <div class="input-control" *ngIf="includeProperty('layerProviders')">
            <label for="layerProviders">Inherits layers from: </label>
            <select-input [items]="item.p('layerProviders') | async" 
            (updated)="updateProperty('layerProviders', $event)" 
            [options]="dependencies.lyphs"></select-input>
          </div>
            
          <!--PatchProviders-->
          <div class="input-control" *ngIf="includeProperty('patchProviders')">
            <label for="patchProviders">Inherits patches from: </label>
            <select-input [items]="item.p('patchProviders') | async" 
            (updated)="updateProperty('patchProviders', $event)" 
            [options]="dependencies.lyphs"></select-input>
          </div>
          
          <!--PartProviders-->
          <div class="input-control" *ngIf="includeProperty('partProviders')">
            <label for="partProviders">Inherits parts from: </label>
            <select-input [items]="item.p('partProviders') | async"
            (updated)="updateProperty('partProviders', $event)" 
            [options]="dependencies.lyphs"></select-input>
          </div>
          <ng-content select="providerGroup"></ng-content>
        </providerGroup>           
       
        <relationGroup>      
          <!--Layers-->
          <div class="input-control" *ngIf="includeProperty('layers')">
            <repo-template caption="Layers" 
            [items] = "item.layers" 
            [ignore]="ignore.add('cardinality')"
            (updated)="updateProperty('layers', $event)" 
            [dependencies] = "dependencies" 
            [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
          </div>          
  
          <!--Patches-->
          <div class="input-control" *ngIf="includeProperty('patches')">
            <repo-template caption="Patches" 
            [items] = "item.patches" 
            [ignore]="ignore.add('cardinality')"
            (updated)="updateProperty('patches', $event)" 
            [dependencies] = "dependencies"
            [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
          </div>
                  
          <!--Parts-->
          <div class="input-control" *ngIf="includeProperty('parts')">
            <repo-template caption="Parts" 
            [items] = "item.parts" 
            [ignore]="ignore.add('cardinality')"
            (updated)="updateProperty('parts', $event)" 
            [dependencies] = "dependencies"
            [types] = "[templateName.LyphTemplate, templateName.CylindricalLyphTemplate]"></repo-template>
          </div>
          
          <!--Processes-->
          <div class="input-control" *ngIf="includeProperty('processes')">
            <repo-template caption="Processes" 
            [items] = "item.processes" 
            
            [dependencies] = "dependencies"
            (updated)="updateProperty('processes', $event)"           
            [types] = "[templateName.ProcessTemplate]" 
              (added)  ="onProcessAdded($event)" 
              (removed)="onProcessRemoved($event)"></repo-template>
          </div>
          
          <!--Nodes-->
          <div class="input-control" *ngIf="includeProperty('nodes')">
            <repo-template caption="Nodes" 
            [items] = "item.nodes" 
            (updated)="updateProperty('nodes', $event)"
            [dependencies] = "dependencies"
            [types] = "[templateName.NodeTemplate]"></repo-template>
          </div>            
          <ng-content select="relationGroup"></ng-content>
        </relationGroup>     
        
        <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          <!--InnerBorder-->
          <div class="input-control">      
            <label for="innerBorder">Inner border: </label>
            <borderTemplate-panel [item]="item.innerBorder" 
              [dependencies]="dependencies" 
              [options]="borderPanelOptions"
              (added)  ="addTemplate('innerBorder', borderTemplate)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </borderTemplate-panel>
          </div>              
        
          <!--OuterBorder-->        
          <div class="input-control">      
            <label for="outerBorder">Outer border: </label>
            <borderTemplate-panel [item]="item.outerBorder" 
              [dependencies]="dependencies" 
              [options]="borderPanelOptions"
              (added)  = "addTemplate('outerBorder', borderTemplate)"
              (saved)  = "updateProperty('outerBorder', $event)"  
              (removed)= "removeTemplate('outerBorder', $event)">
            </borderTemplate-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>
        
       <ng-content></ng-content>   
        
    </materialType-panel>
  `,
  directives: [MaterialTypePanel, MultiSelectInput, SingleSelectInput,
    RepoTemplate, BorderTemplatePanel],
  pipes: [FilterByClass, FilterBy]
})
export class LyphTypePanel extends MaterialTypePanel{
  borderTemplate = BorderTemplate;
  borderPanelOptions = {'hideSave': true, 'hideRestore': true};

  onProcessAdded(process: ProcessTemplate){
    if (process) process.conveyingLyph = this.item;
  }

  onProcessRemoved(process: ProcessTemplate){
    if (process && (process.conveyingLyph == this.item)) process.conveyingLyph = null;
  }

}
