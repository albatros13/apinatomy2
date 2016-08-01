/**
 * Created by Natallia on 6/14/2016.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MultiSelectInput} from '../components/component.select';
import {FormToolbar} from '../components/toolbar.panelEdit';
import {MapToCategories} from "../transformations/pipe.general";
import {PropertyToolbar} from '../components/toolbar.propertySettings';
import * as model from "open-physiology-model";

@Component({
  selector: 'resource-panel',
  inputs: ['item', 'ignore', 'options'],
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
            [options] = "properties"
            (selectionChanged) = "selectionChanged($event)">
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
                [items]="item.p('externals') | async" 
                (updated)="updateProperty('externals', $event)" 
                [options]="ExternalResource.p('all') | async"></select-input>
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
  @Input() item: any;
  @Input() ignore: Set<string> = new Set<string>();

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() propertyUpdated = new EventEmitter();

  ExternalResource = model.ExternalResource;

  properties: any[] = [];

  ngOnInit(){
    if (!this.ignore) this.ignore = new Set<string>();
    this.ignore = this.ignore.add("id").add("href");

    if (this.item && this.item.constructor){
      let properties = Object.assign({}, this.item.constructor.properties,
        this.item.constructor.relationshipShortcuts);

      for (let property in properties){
        if (property == "class" || property == "themes" || property == "nature") continue;
        if (property.indexOf("Border") > -1) {
          if (!this.properties.find(x => (x.value == "border")))
            this.properties.push({value: "borders", selected: !this.ignore.has("borders")});
          continue;
        }
        this.properties.push({value: property, selected: !this.ignore.has(property)});
      }
    }
  }

  selectionChanged(option: any){
    if ( this.ignore.has(option.value) &&  option.selected) this.ignore.delete(option.value);
    if (!this.ignore.has(option.value) && !option.selected) this.ignore.add(option.value);
  }

  protected includeProperty(prop: string){
    return !this.ignore.has(prop);
  }

  updateProperty(property: string, item: any){
    if (this.item.constructor &&
      this.item.constructor.properties &&
      this.item.constructor.properties[property]
      && this.item.constructor.properties[property].readonly) return;

      this.item[property] = item;
      this.propertyUpdated.emit({property: property, values: item});
  }

  addTemplate(property: string, Class: string){
    this.item[property] = model[Class].new({name: "T: " + property + " " + this.item.name});
  }

  removeTemplate(property: string, item: any){
    item.delete();
    this.updateProperty(property, null);
  }

}
