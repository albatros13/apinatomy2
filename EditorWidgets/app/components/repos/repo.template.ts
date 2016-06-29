/**
 * Created by Natallia on 6/28/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {ItemHeader} from '../component.general';
import {LyphTypeTemplate} from '../templates/template.lyphType';
import {RepoTemplateWrapper} from "../repos/repo.wrapper";

@Component({
  selector: 'repo-template',
  inputs: ['items', 'caption', 'dependencies'],
  template:`
       <repo-template-wrapper [items]="items" caption="{{caption}}">
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['lyphTemplate-zone']" [sortableData]="items">
          <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
              <div accordion-heading><item-header [item]="item" [icon]="'images/lyphType.png'"></item-header></div>
              <lyphType-template [item]="item" [dependencies]="dependencies" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></lyphType-template>
          </accordion-group>        
        </accordion>       
      </repo-template-wrapper>     
  `,
  directives: [RepoTemplateWrapper, ItemHeader, 
    LyphTypeTemplate, 
    ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoTemplate extends RepoTemplateWrapper{
  constructor(){
    super();
  }
}
