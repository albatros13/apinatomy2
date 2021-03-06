/**
 * Created by Natallia on 6/17/2016.
 */
import {Component} from '@angular/core';
import {GroupPanel} from "./panel.group";
import {MultiSelectInput, SingleSelectInput} from '../components/component.select';
import {SetToArray} from "../transformations/pipe.general";
import {RepoNested} from '../repos/repo.nested';
import {model} from "../services/utils.model";
const {Node, OmegaTreePart} = model;

@Component({
  selector: 'omegaTree-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <group-panel [item]="item" 
      [ignore] = "ignore"
      [options] = "options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "onPropertyUpdate($event)">
      
      <!--Root-->
      <div class="input-control" *ngIf="includeProperty('root')">      
        <label for="root">{{getPropertyLabel('root')}}: </label>
        <select-input [item] = "item.p('root') | async" 
          (updated) = "updateProperty('root', $event)"   
          [options] = "Node.p('all') | async"></select-input>
      </div>
      
       <relationGroup>
        <!--Parts-->
        <div class="input-control" *ngIf="includeProperty('parts')">
           <repo-nested [caption]="getPropertyLabel('parts')" 
           [items] = "item.p('parts') | async | setToArray" 
           (updated)="updateProperty('parts', $event)"
           [options]="{linked: true}"
           [types]="[ResourceName.Lyph, ResourceName.OmegaTree]"></repo-nested>
        </div>
         <ng-content select="relationGroup"></ng-content> 
      </relationGroup>
      
      <!--TreeParent-->
      <div  *ngIf="includeProperty('type')" class="input-control">
        <label for="treeParent">{{getPropertyLabel('treeParent')}}: </label>
        <select-input-1 [item] = "item.p('treeParent') | async"
         (updated) = "updateProperty('treeParent', $event)"    
         [options] = "OmegaTreePart.p('all') | async"></select-input-1>
      </div>
      
      <!--TreeChildren-->
      <div class="input-control" *ngIf="includeProperty('treeChildren')">
        <label for="treeChildren">{{getPropertyLabel('treeChildren')}}: </label>
        <select-input 
          [items]="item.p('treeChildren') | async" 
          (updated)="updateProperty('treeChildren', $event)" 
          [options]="OmegaTreePart.p('all') | async"></select-input>
      </div>  

      <ng-content></ng-content> 
    
    </group-panel>
  `,
  directives: [GroupPanel, MultiSelectInput, SingleSelectInput, RepoNested],
  pipes: [SetToArray]
})
export class OmegaTreePanel extends GroupPanel{
  Node = Node;
  OmegaTreePart = OmegaTreePart;

  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('supertypes').add('subtypes').add('elements')
      .add('cardinalityMultipliers').add('treeParent').add('treeChildren');
  }

  onPropertyUpdate(event){
    this.propertyUpdated.emit(event);
  }
}
