/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {RepoWrapper} from './repo.wrapper';
import {ItemHeader} from '../component.general';
import {TypePanel} from '../panels/panel.type';

@Component({
  selector: 'repo-type',
  inputs: ['items', 'dependency'],
  template:`
      <repo-wrapper [model]="{items: items, caption: 'Types'}">
          <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['type-zone']" [sortableData]="items">
            <div *ngFor="let item of model.items; let i = index">
              <accordion-group class="list-group-item" dnd-sortable [sortableIndex]="i">
                  <div accordion-heading><item-header [item]="item" [icon]="'images/type.png'"></item-header></div>
                  <type-panel [item]="item" 
                    [dependency]="dependency"
                  (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></type-panel>
              </accordion-group>        
            </div>
          </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader, TypePanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoType extends RepoWrapper{}

