/**
 * Created by Natallia on 6/28/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {TemplateName,
  Template, BorderTemplate, NodeTemplate, CausalityTemplate, ProcessTemplate, MeasurableTemplate,
  GroupTemplate, OmegaTreeTemplate,
  LyphTemplate, CylindricalLyphTemplate} from '../services/service.apinatomy2';

import {EditToolbar} from '../components/toolbar.repoEdit';
import {FilterToolbar} from '../components/toolbar.filter';
import {SortToolbar} from '../components/toolbar.sort';

import {PanelDispatchTemplates} from "../templates/dispatch.templates";
import {ItemHeader, RepoAbstract} from "./repo.abstract";
import {OrderBy, FilterBy} from "../transformations/pipe.general";

@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'dependencies', 'ignore', 'types', 'selectedItem', 'options'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <sort-toolbar *ngIf= "options && options.showSortToolbar" [options]="['Name', 'ID']" (sorted)="onSorted($event)"></sort-toolbar>
        <edit-toolbar *ngIf= "!(options && options.headersOnly)" [options]="types" (added)="onAdded($event)"></edit-toolbar>
        <filter-toolbar *ngIf= "options && options.showFilterToolbar" [filter]="searchString" [options]="['Name', 'ID', 'Class']" (applied)="onFiltered($event)"></filter-toolbar>
          
        <accordion class="list-group" [closeOthers]="true" 
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | orderBy : sortByMode | filterBy: [searchString, filterByMode]; let i = index" 
            class="list-group-item" dnd-sortable 
           [sortableIndex]="i" (click)="onHeaderClick(item)">
            <div accordion-heading><item-header [item]="item" [selectedItem]="selectedItem" [isSelectedOpen]="isSelectedOpen" [icon]="getIcon(item)"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-template *ngIf="item == selectedItem" 
                [item]="item" 
                [ignore]="ignore"
                [dependencies]="dependencies" 
                (saved)="onSaved(item, $event)" 
                (removed)="onRemoved(item)"></panel-template>            
            </div>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
  directives: [ItemHeader, SortToolbar, EditToolbar, FilterToolbar,
    PanelDispatchTemplates, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [OrderBy, FilterBy]
})
export class RepoTemplate extends RepoAbstract{
  templateName = TemplateName;

  ngOnInit(){
    super.ngOnInit();
    if (this.types.length == 0){
      for (let x in TemplateName) this.types.push(x);
    }
    this.zones = this.types.map(x => x + "_zone");
  }


  protected getIcon(item: any){
    switch (item.class){
      case this.templateName.Template          : return "images/type.png";
      case this.templateName.LyphTemplate      : return "images/lyphType.png";
      case this.templateName.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";

      case this.templateName.ProcessTemplate   : return "images/processType.png";
      case this.templateName.MeasurableTemplate: return "images/measurableType.png";
      case this.templateName.CausalityTemplate : return "images/causalityType.png";
      case this.templateName.NodeTemplate      : return "images/nodeType.png";
      case this.templateName.BorderTemplate    : return "images/borderType.png";
      case this.templateName.CausalityTemplate : return "images/causality.png";

      case this.templateName.GroupTemplate     : return "images/groupType.png";
      case this.templateName.OmegaTreeTemplate : return "images/omegaTreeType.png";

    }
    return "images/resource.png";
  }

  protected onAdded(resourceType: any){
    let newItem: any;
    switch (resourceType){
      case this.templateName.CausalityTemplate        : newItem = new CausalityTemplate({name: "(New) T: causality"}); break;
      case this.templateName.BorderTemplate           :  newItem = new BorderTemplate({name: "(New) T: border"}); break;
      case this.templateName.NodeTemplate             :  newItem = new NodeTemplate({name: "(New) T: node"}); break;
      case this.templateName.MeasurableTemplate       :  newItem = new MeasurableTemplate({name: "(New) T: measurable"}); break;
      case this.templateName.ProcessTemplate          :  newItem = new ProcessTemplate({name: "(New) T: process"}); break;

      case this.templateName.LyphTemplate             : newItem = new LyphTemplate({name: "(New) T: type"}); break;
      case this.templateName.CylindricalLyphTemplate  : newItem = new CylindricalLyphTemplate({name: "(New) T: cylindrical lyph"}); break;

      case this.templateName.GroupTemplate            : newItem = new GroupTemplate({name: "(New) T: group"}); break;
      case this.templateName.OmegaTreeTemplate        : newItem = new OmegaTreeTemplate({name: "(New) T: omega tree"}); break;

      default: newItem = new Template({name: "(New) T"});
    }
    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
