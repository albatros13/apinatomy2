/**
 * Created by Natallia on 6/18/2016.
 */
import {Component} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgForm} from '@angular/common';
import {ACCORDION_DIRECTIVES} from 'ng2-bootstrap/components/accordion';
import {DND_DIRECTIVES} from 'ng2-dnd/ng2-dnd';
import {RepoWrapper} from './repo.wrapper';
import {ItemHeader} from '../component.general';
import {ClinicalIndexPanel} from '../panels/panel.clinicalIndex';

@Component({
  selector: 'repo-clinicalIndex',
  inputs: ['items', 'dependency'],
  template:`
      <repo-wrapper [model]="{items: items, caption: 'Clinical indices'}">
        <accordion class="list-group" [closeOthers]="true" dnd-sortable-container [dropZones]="['clinicalIndex-zone']" [sortableData]="items">
            <accordion-group *ngFor="let item of items; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">
                <div accordion-heading><item-header [item]="item" [icon]="'images/clinicalIndex.png'"></item-header></div>
                <clinicalIndex-panel [item]="item" [dependency]="dependency" (saved)="onSaved(item, $event)" (removed)="onRemoved(item)"></clinicalIndex-panel>
            </accordion-group>        
        </accordion>       
      </repo-wrapper>
  `,
  directives: [RepoWrapper, ItemHeader, ClinicalIndexPanel, ACCORDION_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, DND_DIRECTIVES]
})
export class RepoClinicalIndex extends RepoWrapper{}
