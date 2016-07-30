/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';

@Component({
  selector: 'externalResource-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <resource-panel [item] = "item" 
      [dependencies] = "dependencies" 
      [ignore] = "ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--URI-->
      <div class="input-control" *ngIf="includeProperty('uri')">
        <label for="uri">URI: </label>
        <input type="text" class="form-control" disabled [(ngModel)]="item.uri">
      </div>
  
      <!--Type-->
      <div class="input-control" *ngIf="includeProperty('type')">
        <label for="type">Type: </label>
        <input type="text" class="form-control" disabled [(ngModel)]="item.type">
      </div>

      <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, RepoTemplate]
})
export class ExternalResourcePanel extends ResourcePanel{}
