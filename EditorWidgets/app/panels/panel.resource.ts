/**
 * Created by Natallia on 6/14/2016.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MultiSelectInput} from '../components/component.select';
import {FormToolbar} from '../components/toolbar.panelEdit';
import {MapToCategories} from "../transformations/pipe.general";
import {PropertyToolbar} from '../components/toolbar.propertySettings';

@Component({
  selector: 'resource-panel',
  inputs: ['item', 'ignore', 'dependencies', 'options'],
  template:`
    <div class="panel">
        <div class="panel-body">
          <form-toolbar  
            [options]  = "options"
            (saved)    = "saved.emit(item)"
            (canceled) = "canceled.emit(item)"
            (removed)  = "removed.emit(item)">
          </form-toolbar>
          <property-toolbar  
            [options] = "properties">
          </property-toolbar>
          
          <div class="panel-content">
              <div class="input-control" *ngIf="includeProperty('id')">
                <label for="id">ID: </label>
                <input type="text" class="form-control" disabled readonly [ngModel]="item.id">
              </div>

              <div class="input-control" *ngIf="includeProperty('href')">
                <label for="href">Reference: </label>
                <input type="text" class="form-control" disabled readonly [ngModel]="item.href">
              </div>

              <!--Name-->
              <div class="input-control" *ngIf="includeProperty('name')">
                <label for="name">Name: </label>
                <input type="text" class="form-control" [(ngModel)]="item.name">
              </div>
              
              <!--Externals-->
              <div class="input-control" *ngIf="includeProperty('externals')">
                <label for="externals">Annotations: </label>
                <select-input 
                [items]="item.externals" 
                (updated)="updateProperty('externals', $event)" 
                [options]="dependencies.externals | mapToCategories"></select-input>
              </div>
              <ng-content></ng-content>
          </div>
        </div>
    </div>
  `,
  directives: [FormToolbar, PropertyToolbar, MultiSelectInput],
  pipes: [MapToCategories]
})
export class ResourcePanel {
  item: any;
  ignore: Set<string> = new Set<string>();
  dependencies: any;

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() propertyUpdated = new EventEmitter();

  protected properties: any[] = [];

  ngOnInit(){
    if (!this.ignore) this.ignore = new Set<string>();
    this.ignore = this.ignore.add("id").add("href");
    let i = 1;

    if (this.item && this.item.constructor){
      let properties = Object.assign({}, this.item.constructor.properties, this.item.constructor.relationshipShortcuts);
      for (let property in properties){
        let option = {value: property, selected: false};
        if (!this.ignore.has(property)){
          option.selected = true;
        }
        this.properties.push(option);
      }
    }
  }

  protected includeProperty(prop: string, group: string){
    // if (this.properties){
    //   let option = this.properties.find((x:any) => (x.value == prop));
    //   if (option && !option.selected) return false;
    // } else {
      if (this.ignore.has(prop)) return false;
      if (group && this.ignore.has(group)) return false;
    // }
    return true;
  }

  updateProperty(property: string, item: any){
    if (this.item.constructor &&
      this.item.constructor.properties &&
      this.item.constructor.properties[property]
      && this.item.constructor.properties[property].readonly) return;

      this.item[property] = item;
      this.propertyUpdated.emit({property: property, values: item});
  }

  addTemplate(property: string, Class: any){
    //TODO: rewrite using client library!
    //TODO: replace with Class.new();
    this.item[property] = new Class({name: "T: " + property + " " + this.item.name});
    if (this.dependencies) {
      if (!this.dependencies.templates) this.dependencies.templates = [];
      this.dependencies.templates.push(this.item[property]);
    }
  }

  removeTemplate(property: string, item: any){
    //TODO: rewrite using client library!
    if (this.dependencies && this.dependencies.templates) {
      let index = this.dependencies.templates.indexOf(item);
      if (index >= 0) {this.dependencies.templates.splice(index, 1);}
    }
    this.updateProperty(property, null);
  }

}
