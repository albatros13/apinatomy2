/**
 * Created by Natallia on 7/8/2016.
 */
/**
 * Created by Natallia on 6/18/2016.
 */
import {Output, EventEmitter} from '@angular/core';
import {ResourceName, TemplateName} from "../../providers/service.apinatomy2";

export abstract class RepoAbstract{
  @Output() updated = new EventEmitter();
  @Output() selected = new EventEmitter();

  items: Array<any> = [];
  types: Array<ResourceName | TemplateName> = [];
  zones: Array<string> = [];
  sortByMode: string = "id";
  filterByMode: string = "id";
  searchString: string = "";

  _selectedItem: any;

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
    if (this.items[0]) this.selectedItem = this.items[0];
    if (!this.types || (this.types.length == 0))
      this.types = Array.from(new Set(this.items.map(item => item.class)));
    this.zones = this.types.map(x => x + "_zone");
  }

  // protected updateSelected(item: any){
  //   this.selectedItem = item;
  // }

  protected onSorted(prop: string){
    this.sortByMode = prop.toLowerCase();
  }

  protected onFiltered(config: any){
    this.filterByMode = config.mode.toLowerCase();
    this.searchString = config.filter;
  }

  protected onSaved(item: any, updatedItem: any){
    for (var key in updatedItem){
      if (updatedItem.hasOwnProperty(key)) {
        item[key] = updatedItem[key];
      }
    }
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
    this.updated.emit(this.items);
    if (item == this.selectedItem){
      if (this.items.length > 0)
        this.selectedItem = this.items[0];
      else
        this.selectedItem = 0;
    }
  }

  protected abstract getIcon(item: any): string;
  
  protected abstract onAdded(resourceType: ResourceName | TemplateName): void;
}
