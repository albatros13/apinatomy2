/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {List, ItemHeader, RepoWrapper} from './repo.wrapper';
import {LyphTypePanel} from './panel.lyphType';

@Component({
  selector: 'repo-lyphType',
  inputs: ['items'],
  template:`
      <repo-wrapper [model]="{items: items, caption: 'Lyph types'}">
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['resource-zone']" [sortableData]="items">
          <list [items]="items" >
            <accordion-group template="let item let i=index" class="list-group-item" dnd-sortable [sortableIndex]="i">
                <div accordion-heading><item-header [item]="item" [icon]="'images/lyphType.png'"></item-header></div>
                <lyphType-panel [item]="item" [lyphTypes]="items" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></lyphType-panel>
            </accordion-group>        
          </list>
        </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader, List, LyphTypePanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoLyphType extends RepoWrapper{}
