/**
 * Created by Natallia on 6/28/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {NodeTemplate, ResourceName, TemplateName} from '../services/service.apinatomy2';
import {EditToolbar, FilterToolbar} from '../components/component.toolbars';
import {NodeTemplatePanel} from "../templates/template.nodeType";
import {ItemHeader, RepoAbstract} from "./repo.abstract";
import {FilterBy} from "../transformations/pipe.general";

@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'dependencies', 'options'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <edit-toolbar [options]="types" (added)="onAdded($event)"></edit-toolbar>
        <filter-toolbar [filter]="searchString" [options]="['Name', 'ID']" (applied)="onFiltered($event)"></filter-toolbar>
          
        <accordion class="list-group" [closeOthers]="true" 
          dnd-sortable-container [dropZones]="zones" [sortableData]="items">
          <accordion-group *ngFor="let item of items | filterBy: [searchString, filterByMode]; let i = index" 
            class="list-group-item" dnd-sortable 
           [sortableIndex]="i" (click)="selectedItem = item">
            <div accordion-heading><item-header [item]="item" [icon]="getIcon(item)"></item-header></div>

            <div *ngIf="!options || !options.headersOnly">
              <panel-nodeTemplate *ngIf="item == selectedItem" 
                [item]="item" 
                [(dependencies)]="dependencies" 
                (saved)="onSaved(item, $event)" 
                (removed)="onRemoved(item)"></panel-nodeTemplate>            
            </div>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
  directives: [ItemHeader, EditToolbar, FilterToolbar,
    NodeTemplatePanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES],
  pipes: [FilterBy]
})
export class RepoTemplate extends RepoAbstract{
  types: Array<ResourceName | TemplateName> = [TemplateName.NodeTemplate];

  protected getIcon(item: any){
    return "images/nodeType.png";
  }

  protected onAdded(){
    let newItem = new NodeTemplate({name: "New node template"});
    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
