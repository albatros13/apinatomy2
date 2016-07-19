/**
 * Created by Natallia on 6/28/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader, EditToolbar, FilterToolbar} from '../component.general';
import {ResourceName, TemplateName,
  Template, BorderTemplate, NodeTemplate, CausalityTemplate, ProcessTemplate, MeasurableTemplate,
  GroupTemplate, OmegaTreeTemplate,
  LyphTemplate, CylindricalLyphTemplate} from '../../providers/service.apinatomy2';
import {PanelTemplate} from "./panel.template";
import {RepoAbstract} from "./repo.abstract";
import {FilterBy} from "../../transformations/pipe.general";

@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'dependencies', 'types', 'options'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <edit-toolbar [options]="types" (added)="onAdded($event)"></edit-toolbar>
        <filter-toolbar [filter]="searchString" [options]="['Name', 'ID']" (applied)="onFiltered($event)"></filter-toolbar>
          
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['lyphTemplate-zone']" [sortableData]="items">
          <accordion-group *ngFor="let item of items | filterBy: [searchString, filterByMode]; let i = index" class="list-group-item" dnd-sortable 
           [sortableIndex]="i" (click)="selectedItem = item">
            <div accordion-heading><item-header [item]="item" [icon]="getIcon(item)"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-template *ngIf="item == selectedItem" 
                [item]="item" 
                [(dependencies)]="dependencies" 
                (saved)="onSaved(item, $event)" 
                (removed)="onRemoved(item)"></panel-template>            
            </div>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
  directives: [ItemHeader, EditToolbar, FilterToolbar,
    PanelTemplate, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [FilterBy]
})
export class RepoTemplate extends RepoAbstract{
  templateName = TemplateName;

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

      case this.templateName.GroupTemplate     : return "images/groupType.png";
      case this.templateName.OmegaTreeTemplate : return "images/omegaTreeType.png";

    }
    return "images/resource.png";
  }

  protected onAdded(resourceType: ResourceName | TemplateName){
    let newItem: any;
    switch (resourceType){
      case this.templateName.CausalityTemplate  : newItem =
        new CausalityTemplate({name: "New causality template"}); break;
      case this.templateName.BorderTemplate  :
        newItem = new BorderTemplate({name: "New border template"}); break;
      case this.templateName.NodeTemplate  :
        newItem = new NodeTemplate({name: "New node template"}); break;
      case this.templateName.MeasurableTemplate  :
        newItem = new MeasurableTemplate({name: "New Measurable template"}); break;
      case this.templateName.ProcessTemplate  :
        newItem = new ProcessTemplate({name: "New process template"}); break;

      case this.templateName.LyphTemplate  :
        newItem = new LyphTemplate({name: "New lyph template"}); break;
      case this.templateName.CylindricalLyphTemplate  :
        newItem = new CylindricalLyphTemplate({name: "New cylindrical lyph template"}); break;

      case this.templateName.GroupTemplate  :
        newItem = new GroupTemplate({name: "New group template"}); break;
      case this.templateName.OmegaTreeTemplate  :
        newItem = new OmegaTreeTemplate({name: "New omega tree template"}); break;

      default: newItem = new Template({name: "New template"});
    }
    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
