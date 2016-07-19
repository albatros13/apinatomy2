/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader, SortToolbar, EditToolbar, FilterToolbar} from '../component.general';
import {ResourceName, TemplateName,
  Resource, Type, MaterialType, LyphType, CylindricalLyphType, BorderType, NodeType,
  CausalityType, MeasurableType, GroupType, ProcessType, OmegaTreeType,
  Publication, Correlation, ClinicalIndex
} from "../../providers/service.apinatomy2";
import {OrderBy, FilterBy} from "../../transformations/pipe.general";
import {PanelGeneral} from "./panel.general";
import {RepoAbstract} from "./repo.abstract";

@Component({
  selector: 'repo-general',
  inputs: ['items', 'caption', 'dependencies', 'types', 'options'],
  template:`
     <div class="panel panel-info repo">
        <div class="panel-heading">{{caption}}</div>
        <div class="panel-body">
          <sort-toolbar [options]="['Name', 'ID']" (sorted)="onSorted($event)"></sort-toolbar>
          <edit-toolbar [options]="types" (added)="onAdded($event)"></edit-toolbar>
          <filter-toolbar [filter]="searchString" [options]="['Name', 'ID']" (applied)="onFiltered($event)"></filter-toolbar>
          
          <accordion class="list-group" [closeOthers]="true" 
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index" class="list-group-item" 
            dnd-sortable [sortableIndex]="i" (click)="selectedItem = item">
            <div accordion-heading><item-header [item]="item" [icon]="getIcon(item)"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-general *ngIf="item == selectedItem" [item]="item" 
                [(dependencies)]="dependencies" 
                (saved)="onSaved(item, $event)" 
                (canceled)="onCanceled($event)"
                (removed)="onRemoved(item)">
               </panel-general>            
            </div>

          </accordion-group>        
          </accordion>       
        </div>
      </div>
  `,
  styles: ['.repo{ width: 100%}'],
  directives: [
    SortToolbar, EditToolbar, FilterToolbar,
    ItemHeader,
    PanelGeneral,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy, FilterBy]
})
export class RepoGeneral extends RepoAbstract{
  resourceName = ResourceName;

  protected getIcon(item: any){
    switch (item.class){
      case this.resourceName.Type          : return "images/type.png";
      case this.resourceName.MaterialType  : return "images/materialType.png";
      case this.resourceName.LyphType      : return "images/lyphType.png";
      case this.resourceName.CylindricalLyphType: return "images/cylindricalLyphType.png";

      case this.resourceName.ProcessType   : return "images/processType.png";
      case this.resourceName.MeasurableType: return "images/measurableType.png";
      case this.resourceName.CausalityType : return "images/causalityType.png";
      case this.resourceName.NodeType      : return "images/nodeType.png";
      case this.resourceName.BorderType    : return "images/borderType.png";

      case this.resourceName.GroupType     : return "images/groupType.png";
      case this.resourceName.OmegaTreeType : return "images/omegaTreeType.png";

      case this.resourceName.Publication   : return "images/publication.png";
      case this.resourceName.Correlation   : return "images/correlation.png";
      case this.resourceName.ClinicalIndex : return "images/clinicalIndex.png";
    }
    return "images/resource.png";
  }

  protected onAdded(resourceType: ResourceName | TemplateName){
    let newItem: any;
    switch (resourceType){
      case this.resourceName.Type          : newItem = new Type({}); break;
      case this.resourceName.MaterialType  : newItem = new MaterialType({name: "New material"}); break;
      case this.resourceName.LyphType      : newItem = new LyphType({name: "New lyph"}); break;
      case this.resourceName.CylindricalLyphType: newItem = new CylindricalLyphType({name: "New cylindrical lyph"}); break;

      case this.resourceName.ProcessType   : newItem = new ProcessType({name: "New process"}); break;
      case this.resourceName.MeasurableType: newItem = new MeasurableType({name: "New measurable"}); break;
      case this.resourceName.CausalityType : newItem = new CausalityType({name: "New casuality"}); break;
      case this.resourceName.NodeType      : newItem = new NodeType({name: "New node"}); break;
      case this.resourceName.BorderType    : newItem = new BorderType({name: "New border"}); break;

      case this.resourceName.GroupType     : newItem = new GroupType({name: "New group"}); break;
      case this.resourceName.OmegaTreeType : newItem = new OmegaTreeType({name: "New omge tree"}); break;

      case this.resourceName.Publication   : newItem = new Publication({name: "New publication"}); break;
      case this.resourceName.Correlation   : newItem = new Correlation({name: "New correlation"}); break;
      case this.resourceName.ClinicalIndex : newItem = new ClinicalIndex({name: "New clinical index"}); break;
      default: newItem = new Resource();
    }
    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
