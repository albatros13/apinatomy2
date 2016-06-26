/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {RepoWrapper} from './repo.wrapper';
import {ItemHeader} from '../component.general';
import {PublicationPanel} from '../panels/panel.publication';

@Component({
  selector: 'repo-publication',
  inputs: ['items', 'dependency'],
  template:`
      <repo-wrapper [model]="{items: items, caption: 'Publications'}">
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['publication-zone']" [sortableData]="items">
          <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
              <div accordion-heading><item-header [item]="item" [icon]="'images/pubmed.png'"></item-header></div>
              <publication-panel [item]="item" 
              [dependency]="dependency"
              (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></publication-panel>
          </accordion-group>        
        </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader, PublicationPanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoPublication extends RepoWrapper{}
