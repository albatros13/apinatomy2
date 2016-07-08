/**
 * Created by Natallia on 6/28/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader, EditToolbar} from '../component.general';
import {ResourceName, TemplateName,
  Template, BorderTemplate, NodeTemplate, CausalityTemplate, ProcessTemplate, MeasurableTemplate,
  GroupTemplate, OmegaTreeTemplate,
  LyphTemplate, CylindricalLyphTemplate} from '../../providers/service.apinatomy2';
import {PanelTemplate} from "./panel.template";
import {RepoAbstract} from "./repo.abstract";

@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'dependencies', 'types', 'options'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <edit-toolbar [options]="types" (added)="onAdded($event)"></edit-toolbar>
      
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['lyphTemplate-zone']" [sortableData]="items">
          <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable 
           [sortableIndex]="i" (click)="selectedItem = item">
            <div accordion-heading><item-header [item]="item" [icon]="'images/lyphType.png'"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-template *ngIf="item == selectedItem" [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></panel-template>            
            </div>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
  directives: [ItemHeader, EditToolbar, PanelTemplate, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoTemplate extends RepoAbstract{
  templateNames = TemplateName;

  protected getIcon(item: any){
    switch (item.class){
      case this.templateNames.Template          : return "images/type.png";
      case this.templateNames.LyphTemplate      : return "images/lyphType.png";
      case this.templateNames.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";

      case this.templateNames.ProcessTemplate   : return "images/processType.png";
      case this.templateNames.MeasurableTemplate: return "images/measurableType.png";
      case this.templateNames.CausalityTemplate : return "images/causalityType.png";
      case this.templateNames.NodeTemplate      : return "images/nodeType.png";
      case this.templateNames.BorderTemplate    : return "images/borderType.png";

      case this.templateNames.GroupTemplate     : return "images/groupType.png";
      case this.templateNames.OmegaTreeTemplate : return "images/omegaTreeType.png";

    }
    return "images/resource.png";
  }

  protected onAdded(resourceType: ResourceName | TemplateName){
    let newItem: any;
    switch (resourceType){
      case this.templateNames.CausalityTemplate  : newItem =
        new CausalityTemplate({name: "New causality template"}); break;
      case this.templateNames.BorderTemplate  :
        newItem = new BorderTemplate({name: "New border template"}); break;
      case this.templateNames.NodeTemplate  :
        newItem = new NodeTemplate({name: "New node template"}); break;
      case this.templateNames.MeasurableTemplate  :
        newItem = new MeasurableTemplate({name: "New Measurable template"}); break;
      case this.templateNames.ProcessTemplate  :
        newItem = new ProcessTemplate({name: "New process template"}); break;

      case this.templateNames.LyphTemplate  :
        newItem = new LyphTemplate({name: "New lyph template"}); break;
      case this.templateNames.CylindricalLyphTemplate  :
        newItem = new CylindricalLyphTemplate({name: "New cylindrical lyph template"}); break;

      case this.templateNames.GroupTemplate  :
        newItem = new GroupTemplate({name: "New group template"}); break;
      case this.templateNames.OmegaTreeTemplate  :
        newItem = new OmegaTreeTemplate({name: "New omega tree template"}); break;

      default: newItem = new Template({name: "New template"});
    }
    this.items.push(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
