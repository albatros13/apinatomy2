/**
 * Created by Natallia on 7/8/2016.
 */
import {Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'item-header',
  inputs: ['item', 'selectedItem', 'isSelectedOpen', 'icon'],
  template: `
      <i class="pull-left glyphicon"
        [ngClass]="{
          'glyphicon-chevron-down': (item == selectedItem) && isSelectedOpen, 
          'glyphicon-chevron-right': (item != selectedItem) || !isSelectedOpen}"></i>&nbsp;
        {{(item.id)? item.id: "?"}}: {{item.name}}
        <img class="pull-right icon" src="{{icon}}"/>
  `
})
export class ItemHeader {}

export abstract class RepoAbstract{
  @Output() added = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() selected = new EventEmitter();

  items: Array<any> = [];
  types: Array<any> = [];
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
    if (!this.types || (this.types.length == 0)){
      this.types = Array.from(new Set(this.items.map(item => item.class)));
    }
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

  protected abstract getIcon(Class: any): string;

  protected abstract onAdded(Class: any): void;

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
        this.selectedItem = 0;
    }
    this.removed.emit(item);
    this.updated.emit(this.items);
  }

}
