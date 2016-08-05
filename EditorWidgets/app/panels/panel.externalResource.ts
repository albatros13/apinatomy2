/**
 * Created by Natallia on 6/19/2016.
 */
import {Component} from '@angular/core';
import {ResourcePanel} from "./panel.resource";
import {MultiSelectInput} from '../components/component.select';
import {RepoTemplate} from '../repos/repo.template';
import {Resource} from "open-physiology-model";

@Component({
  selector: 'externalResource-panel',
  inputs: ['item', 'ignore', 'options'],
  template:`
    <resource-panel [item] = "item" 
      [ignore] = "ignore"
      [options] ="options"
      (saved)    = "saved.emit($event)"
      (canceled) = "canceled.emit($event)"
      (removed)  = "removed.emit($event)"
      (propertyUpdated) = "propertyUpdated.emit($event)">

      <!--URI-->
      <div class="input-control" *ngIf="includeProperty('uri')">
        <label for="uri">URI: </label>
        <input type="text" class="form-control" [(ngModel)]="item.uri">
      </div>
  
      <!--Type-->
      <div class="input-control" *ngIf="includeProperty('type')">
        <label for="type">Type: </label>
        <input type="text" class="form-control" [(ngModel)]="item.type">
      </div>
      
      <!--Locals - TODO: map to categories-->
      <div class="input-control" *ngIf="includeProperty('locals')">
        <label for="locals">Local resources: </label>
        <select-input 
        [items]="item.p('locals') | async" 
        (updated)="updateProperty('locals', $event)" 
        [options]="Resource.p('all') | async"></select-input>
      </div>

      <ng-content></ng-content>      

    </resource-panel>
  `,
  directives: [ResourcePanel, MultiSelectInput, RepoTemplate]
})
export class ExternalResourcePanel extends ResourcePanel{
  protected Resource = Resource;
  ngOnInit(){
    super.ngOnInit();
    this.ignore = this.ignore.add('externals');
  }
}
