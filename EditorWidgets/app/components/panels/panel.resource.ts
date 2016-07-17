/**
 * Created by Natallia on 6/14/2016.
 */
import {Component, EventEmitter, Output, Inject} from '@angular/core';
import {MultiSelectInput, FormToolbar} from '../component.general';

@Component({
  selector: 'resource-panel',
  inputs: ['item', 'ignore', 'dependencies'],
  template:`
    <div class="panel">
        <div class="panel-body">
          <form-toolbar  
            (saved)    = "saved.emit(item)"
            (canceled) = "canceled.emit(item)"
            (removed)  = "removed.emit(item)">
          </form-toolbar>
          <div class="panel-content">
              <!--<div class="input-control" *ngIf="includeProperty('id')">-->
                <!--<label for="id">ID: </label>-->
                <!--<input type="text" disabled [(ngModel)]="item.id">-->
              <!--</div>-->
              
              <!--Name-->
              <div class="input-control" *ngIf="includeProperty('name')">
                <label for="name">Name: </label>
                <input type="text" [(ngModel)]="item.name">
              </div>
              
              <!--Externals-->
              <div class="input-control" *ngIf="includeProperty('externals')">
                <label for="externals">Annotations: </label>
                <select-input 
                [items]="item.externals" 
                (updated)="updateProperty('externals', $event)" 
                [options]="dependencies.externals"></select-input>
              </div>
              <ng-content></ng-content>
          </div>
        </div>
    </div>
  `,
  directives: [FormToolbar, MultiSelectInput]
})
export class ResourcePanel {
  item: any;
  ignore: Array<string> = [];
  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() propertyUpdated = new EventEmitter();

  constructor(){}

  protected includeProperty(prop: string){
    if (this.ignore && (this.ignore.indexOf(prop) > -1)) return false;
    return true;
  }

  updateProperty(property: string, selectedItems: Array<any>){
    this.item[property] = selectedItems;
    this.propertyUpdated.emit({property: property, values: selectedItems});
  }
}
