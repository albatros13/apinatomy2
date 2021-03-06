/**
 * Created by Natallia on 6/14/2016.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MultiSelectInput} from '../components/component.select';
import {FormToolbar} from '../components/toolbar.form';
import {MapToCategories} from "../transformations/pipe.general";
import {PropertyToolbar} from '../components/toolbar.propertySettings';
import {model, ResourceName} from "../services/utils.model";
import {getPropertyLabel as generalPropertyLabel} from "../services/utils.model";

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
            [transform] = "getPropertyLabel"
            (selectionChanged) = "selectionChanged($event)">
          </property-toolbar>
          <ng-content select="toolbar"></ng-content>
          
          <div class="panel-content">
              <div class="input-control" *ngIf="includeProperty('id')">
                <label for="id">{{getPropertyLabel('id')}}: </label>
                <input type="text" class="form-control" disabled readonly [ngModel]="item.id">
              </div>

              <div class="input-control" *ngIf="includeProperty('href')">
                <label for="href">{{getPropertyLabel('href')}}: </label>
                <input type="text" class="form-control" disabled readonly [ngModel]="item.href">
              </div>

              <!--Name-->
              <div class="input-control" *ngIf="includeProperty('name')">
                <label for="name">{{getPropertyLabel('name')}}: </label>
                <input type="text" class="form-control" [(ngModel)]="item.name">
              </div>
              
              <!--Externals-->
              <div class="input-control" *ngIf="includeProperty('externals')">
                <label for="externals">{{getPropertyLabel('externals')}}: </label>
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

  protected ResourceName = ResourceName;

  ExternalResource = model.ExternalResource;

  properties: any[] = [];

  protected getPropertyLabel(option: string){
    if (this.item)
      if ((this.item.class == ResourceName.Lyph) ||
        (this.item.class == ResourceName.OmegaTree)) {
        if (option == "cardinalityBase") return "Branching factor";
      }
    return generalPropertyLabel(option);
  }

  ngOnInit(){
    if (!this.ignore) this.ignore = new Set<string>();
    this.ignore = this.ignore.add("id").add("href");

    this.setPropertySettings();
  }

  setPropertySettings(){
    let privateProperties: Set<string> = new Set(["class", "themes", "parent", "children"]);

    if (this.item && this.item.constructor) {
      let properties = Object.assign({}, this.item.constructor.properties,
        this.item.constructor.relationshipShortcuts);

      for (let property in properties) {

        //Unsupported fields
        if (privateProperties.has(property)) continue;

        //Groups
        if (property.indexOf("Border") > -1) {
          if (!this.properties.find(x => (x.value == "borders")))
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

  includeProperty(prop: string){
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

  addItem(parent: any, property: string, item: any){
    console.log("Updating " + property, parent[property]);
    if (parent && (parent[property])){
      parent[property].add(item);
      this.propertyUpdated.emit({property: property, values: parent[property]});
    }
  }

  removeItem(parent: any, property: string, item: any){
    item.delete();
    this.updateProperty(property, parent[property]);
  }

}
