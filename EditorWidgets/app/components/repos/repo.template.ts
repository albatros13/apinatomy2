/**
 * Created by Natallia on 6/28/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader} from '../component.general';
import {LyphTypeTemplate} from '../templates/template.lyphType';
import {ITemplate} from '../../providers/service.apinatomy2';

@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'dependencies'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['lyphTemplate-zone']" [sortableData]="items">
          <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
              <div accordion-heading><item-header [item]="item" [icon]="'images/lyphType.png'"></item-header></div>
              <lyphType-template [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></lyphType-template>
          </accordion-group>        
        </accordion>       
      </div>
    </div>
  `,
  directives: [ItemHeader,
    LyphTypeTemplate,
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoTemplate{
  public selected: ITemplate = null;
  public items: Array<ITemplate> = [];

  constructor(){}

  protected ngOnInit(){
    if (!this.items) this.items = [];
    if (this.items && this.items[0])
      this.selected = this.items[0];
  }

  protected changeActive(item: any){
    this.selected = item;
  }

  protected onSaved(item: ITemplate, updatedItem: ITemplate){
    for (var key in updatedItem){
      if (updatedItem.hasOwnProperty(key)) item[key] = updatedItem[key];
    }
  }

  protected onRemoved(item: ITemplate){
    if (!this.items) return;
    let index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
  }
}
