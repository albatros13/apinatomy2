/**
 * Created by Natallia on 7/8/2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {model} from "../services/utils.model";

@Component({
  selector: 'item-header',
  inputs: ['item', 'selectedItem', 'isSelectedOpen', 'icon'],
  template: `
      <i class="pull-left glyphicon"
        [ngClass]="{
          'glyphicon-chevron-down': (item == selectedItem) && isSelectedOpen, 
          'glyphicon-chevron-right': (item != selectedItem) || !isSelectedOpen}"></i>&nbsp;
        {{(item.id)? item.id: "?"}}: {{item.name}}
        <span class="pull-right">
          <img *ngIf="isTemplate" class="imtip" src="images/template.png"/>
          <img class="icon" src="{{icon}}"/>
        </span>
  `
})
export class ItemHeader {
  @Input() item: any;
  @Input() selectedItem: any;
  @Input() isSelectedOpen: boolean;
  @Input() icon: string;

  isTemplate = false;

  ngOnInit(){
    //if (model.Template.hasInstance(this.item))
    //  this.isTemplate = true;

    if (this.item){
      if (this.item.class.indexOf('Template') > -1) this.isTemplate = true;
    }
  }
}

export abstract class RepoAbstract{
  @Output() added = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() selected = new EventEmitter();

  @Input() items: Array<any> = [];
  @Input() types: Array<any> = [];
  @Input() options: any = {};

  zones: Array<string> = [];
  ignore: Set<string> = new Set<string>();

  sortByMode: string = "unsorted";
  filterByMode: string = "Name";
  searchString: string = "";
  _selectedItem: any;
  isSelectedOpen: boolean = false;

  public set selectedItem (item: any) {
    if (this._selectedItem != item){
      this._selectedItem = item;
      this.selected.emit(this._selectedItem);
    }
  }

  public get selectedItem () {
    return this._selectedItem;
  }

  ngOnInit(){
    if (!this.items) this.items = [];
    if (this.items[0] || !this.selectedItem)
      this.selectedItem = this.items[0];
  }

  protected onHeaderClick(item: any){
    this.selectedItem = item;
    this.isSelectedOpen = !this.isSelectedOpen;
  }

  protected onSorted(prop: string){
    this.sortByMode = prop.toLowerCase();
  }

  protected onFiltered(config: any){
    this.filterByMode = config.mode.toLowerCase();
    this.searchString = config.filter;
  }

  protected onSaved(item: any, updatedItem: any){
    this.updated.emit(this.items);
    if (item == this.selectedItem){
       this.selected.emit(this.selectedItem);
    }
  }

  protected onCanceled(updatedItem: any){}

  protected onRemoved(item: any){
    if (!this.items) return;
    let index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
    if (item == this.selectedItem){
      if (this.items.length > 0)
        this.selectedItem = this.items[0];
      else
        this.selectedItem = null;
    }
    item.delete();
    this.removed.emit(item);
    this.updated.emit(this.items);
  }

  protected onAdded(Class: any){
    let proto: any = {name: "New " + Class};
    if (Class.indexOf("Template") > 0) {
      proto = {name: ""};
    }
    let newItem = model[Class].new(proto);
    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }

  getClassLabel(option: string){
    let name = model[option].singular;
    return name[0].toUpperCase() + name.substring(1);
  }
}
