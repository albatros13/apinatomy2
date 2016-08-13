/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {MaterialPanel} from "./panel.material";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {RepoNested} from '../repos/repo.nested';
import {SetToArray} from "../transformations/pipe.general";
import {BorderPanel} from "./panel.border";
import {TemplateValue} from '../components/component.templateValue';
import {ResourceName} from '../services/utils.model';

@Component({
  selector: 'lyph-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <material-panel [item]="item" 
        [ignore]  = "ignore"
        [options] = "options"
        (saved)   = "saved.emit($event)"
        (canceled)= "canceled.emit($event)"
        (removed) = "removed.emit($event)"
        (propertyUpdated) = "propertyUpdated.emit($event)">
        
        <!--Species-->
        <div class="input-control" *ngIf="includeProperty('species')">
          <label for="species">Species: </label>
          <input type="text" class="form-control" [(ngModel)]="item.species">
        </div>
         
        <!--Thickness-->
        <template-value *ngIf="includeProperty('thickness')" 
          [caption]="getPropertyLabel('thickness')" 
          [item]="item.thickness"
          (updated)="updateProperty('thickness', $event)"
        ></template-value>
        <ng-content select="dimensionGroup"></ng-content>  
       
        <ng-content></ng-content>   
        
        <!--Auxilliary field: measurables to generate-->
        <!--TODO: replace with modal-->
        <!--<generateFromSupertype>-->
          <!--<div class="generate-control">-->
            <!--<label for="measurablesToReplicate"><img class="icon" src="images/measurable.png"/> Measurables to generate </label>-->
            <!--<select-input [items]="measurablesToReplicate" -->
              <!--(updated)="measurablesToReplicate = $event"-->
              <!--[options]="supertypeMeasurables">-->
            <!--</select-input>-->
          <!--</div>-->
        <!--</generateFromSupertype>-->
        
        <relationGroup>   
           <!--Measurables-->
          <div class="input-control" *ngIf="includeProperty('measurables')">
            <repo-nested [caption]="getPropertyLabel('measurables')" 
            [items]  = "item.p('measurables') | async | setToArray" 
            (updated)= "updateProperty('measurables', $event)" 
            [types]  = "[ResourceName.Measurable]"></repo-nested>
          </div> 
           
          <!--Layers-->
          <div class="input-control" *ngIf="includeProperty('layers')">
            <repo-nested [caption]="getPropertyLabel('layers')" 
            [items]  = "item.p('layers') | async | setToArray" 
            [ignore] = "layersIgnore"
            (updated)= "updateProperty('layers', $event)" 
            [types]  = "[item.class]"></repo-nested>
          </div>          
  
          <!--Patches-->
          <div class="input-control" *ngIf="includeProperty('patches')">
            <repo-nested [caption]="getPropertyLabel('patches')" 
            [items]  = "item.p('patches') | async | setToArray" 
            [ignore] = "patchesIgnore"
            [types]  = "[item.class]"
            (updated)= "updateProperty('patches', $event)" 
            ></repo-nested>
          </div>
                  
          <!--Parts-->
          <div class="input-control" *ngIf="includeProperty('parts')">
            <repo-nested [caption]="getPropertyLabel('parts')" 
            [items]  = "item.p('parts') | async | setToArray" 
            [ignore] = "partsIgnore"
            [types]  = "[item.class]"
            (updated)= "updateProperty('parts', $event)" 
            ></repo-nested>
          </div>
          
          <!--Processes-->
          <div class="input-control" *ngIf="includeProperty('processes')">
            <repo-nested [caption]="getPropertyLabel('processes')" 
             [items]  = "item.p('processes') | async | setToArray" 
             [types]  = "[ResourceName.Process]" 
             (updated)= "updateProperty('processes', $event)"           
             ></repo-nested>
          </div>
          
           <!--Coalescences-->
           <div class="input-control" *ngIf="includeProperty('coalescences')">
            <repo-nested [caption]="getPropertyLabel('coalescences')" 
             [items]  = "item.p('coalescences') | async | setToArray" 
             [types]  = "[ResourceName.Coalescence]" 
             (updated)= "updateProperty('coalescences', $event)"           
             ></repo-nested>
          </div>
            
          <!--Incoming processes-->
           <div class="input-control" *ngIf="includeProperty('incomingProcesses')">
            <repo-nested [caption]="getPropertyLabel('incomingProcesses')" 
             [items]  = "item.p('incomingProcesses') | async | setToArray" 
             [types]  = "[ResourceName.Process]" 
             (updated)= "updateProperty('incomingProcesses', $event)"           
             ></repo-nested>
          </div>
          
          <!--Outgoing processes-->
           <div class="input-control" *ngIf="includeProperty('outgoingProcesses')">
            <repo-nested [caption]="getPropertyLabel('outgoingProcesses')" 
             [items]  = "item.p('outgoingProcesses') | async | setToArray" 
             [types]  = "[ResourceName.Process]" 
             (updated)= "updateProperty('outgoingProcesses', $event)"           
             ></repo-nested>
          </div>
          
          <ng-content select="relationGroup"></ng-content>
        </relationGroup>     
        
        <fieldset *ngIf="includeProperty('borders')" >  
          <legend>Borders</legend>
          
          <!--InnerBorder-->
          <div class="input-control">      
            <label for="innerBorder">{{getPropertyLabel('innerBorder')}}: </label>
            <border-panel [item]="item.p('innerBorder') | async" 
              [options]="borderPanelOptions"
              (propertyUpdated) = "propertyUpdated.emit($event)"
              (saved)  ="updateProperty('innerBorder', $event)"    
              (removed)="removeTemplate('innerBorder', $event)">
            </border-panel>
          </div>              
        
          <!--OuterBorder-->        
          <div class="input-control">      
            <label for="outerBorder">{{getPropertyLabel('outerBorder')}}: </label>
            <border-panel [item]="item.p('outerBorder') | async" 
              [options]= "borderPanelOptions"
              (propertyUpdated) = "propertyUpdated.emit($event)"
              (saved)  = "updateProperty('outerBorder', $event)"  
              (removed)= "removeTemplate('outerBorder', $event)">
            </border-panel>
          </div>
          
          <ng-content select="borderGroup"></ng-content>
        </fieldset>
        
    </material-panel>
  `,
  directives: [MaterialPanel, MultiSelectInput, SingleSelectInput,
    RepoNested, BorderPanel, TemplateValue],
  pipes: [SetToArray]
})
export class LyphPanel extends MaterialPanel{
  borderPanelOptions = {'hideRemove': true, 'hideSave': true, 'hideRestore': true};

  layersIgnore  : Set<string> = new Set<string>();
  patchesIgnore : Set<string> = new Set<string>();
  partsIgnore   : Set<string> = new Set<string>();

  ngOnInit(){
    super.ngOnInit();
    this.layersIgnore  = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
    this.patchesIgnore = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);
    this.partsIgnore   = new Set<string>(['cardinalityBase', 'cardinalityMultipliers', 'treeParent', 'treeChildren']);

    if (this.item){
      this.item.p('layers').subscribe(x => {
        console.log("Layers updated", x);
      });
      this.item.p('parts').subscribe(x => {
        console.log("Parts updated", x);
      })
    }
  }

  //MeasurableType = MeasurableType;
  //measurablesToReplicate: Array<any> = [];
  //supertypeMeasurables  : Array<any> = [];

  //TODO: Move generation of measurables to modal window
  /*onPropertyUpdated(event: any){
   let property = event.properties;
   if (property == "supertypes"){
   let supertypes = event.values;
   this.supertypeMeasurables = [];
   for (let supertype of supertypes){
   if (supertype.measurables){
   let supertypeMeasurables = Array.from(new Set(supertype.measurables.map((item: any) => item.type)));
   for (let supertypeMeasurable of supertypeMeasurables){
   if (this.supertypeMeasurables.indexOf(supertypeMeasurable) < 0)
   this.supertypeMeasurables.push(supertypeMeasurable);
   }
   }
   }
   this.measurablesToReplicate = Array.from(this.supertypeMeasurables);
   }
   this.propertyUpdated.emit(event);
   }

   protected onSaved(event: any) {
   for (let measurable of this.measurablesToReplicate){
   delete measurable["id"];
   let newMeasurable = MeasurableType.new(measurable);
   newMeasurable.location = this.item;
   }
   this.saved.emit(event);
   }*/


}
