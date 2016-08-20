/**
 * Created by Natallia on 7/8/2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ResourceName, model} from "../services/utils.model";

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
          <img *ngIf="isType" class="imtip" src="images/t.png"/>
          <img class="icon" src="{{icon}}"/>
          <ng-content select="extra"></ng-content>
        </span>
  `
})
export class ItemHeader {
  @Input() item: any;
  @Input() selectedItem: any;
  @Input() isSelectedOpen: boolean;
  @Input() icon: string;

  isType = false;

  ngOnInit(){
    if (this.item){
      if (this.item.class.indexOf('Type') > -1) this.isType = true;
    }
  }
}

export abstract class RepoAbstract{
  @Output() added = new EventEmitter();
  @Output() removed = new EventEmitter();
  @Output() updated = new EventEmitter();
  @Output() selectedItemChange = new EventEmitter();
  @Output() activeItemChange = new EventEmitter();

  @Input() items: Array<any> = [];
  @Input() types: Array<any> = [];
  @Input() options: any = {};
  _selectedItem: any;
  _activeItem: any;

  zones: Array<string> = [];
  ignore: Set<string> = new Set<string>();

  sortByMode: string = "unsorted";
  filterByMode: string = "Name";
  searchString: string = "";
  isSelectedOpen: boolean = false;

  public set selectedItem (item: any) {
    if (this._selectedItem != item){
      this._selectedItem = item;
      this.selectedItemChange.emit(this._selectedItem);
    }
  }

  public get selectedItem () {
    return this._selectedItem;
  }

  public set activeItem (item: any) {
    if (this._activeItem != item){
      this._activeItem = item;
      this.activeItemChange.emit(this._activeItem);
    }
  }

  public get activeItem () {
    return this._activeItem;
  }

  ngOnInit(){
    if (!this.items) this.items = [];
    if (this.items[0] || !this.selectedItem)
      this.selectedItem = this.items[0];
    //Resources
    if (this.types.length == 0) {
      for (let x in ResourceName) {
        if (x != ResourceName.Border)
          this.types.push(x);
      }
    }
    this.zones = this.types.map(x => x + "_zone");
  }

  protected updateActive(item: any){
    this.activeItem = item;
  }

  protected updateSelected(item: any){
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
       this.selectedItemChange.emit(this.selectedItem);
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
    let options = {};
    if (Class == ResourceName.LyphWithAxis) {
      Class = ResourceName.Lyph;
      options = {createRadialBorders: true, createAxis: true};
    }

    let newItem = model[Class].new({name: "New " + Class}, options);

    if (Class == ResourceName.Material) {
      let newType = model.Type.new({name: newItem.name, definition: newItem});
      newItem.p('name').subscribe(newType.p('name'));
    }

    this.items.push(newItem);
    this.updated.emit(this.items);
    this.added.emit(newItem);
    this.selectedItem = newItem;
  }

  getClassLabel(option: string){
    if (!option) return "";
    let label = option;
    label = label.replace(/([a-z])([A-Z])/g, '$1 $2');
    label = label[0].toUpperCase() + label.substring(1).toLowerCase();
    return label;
  }
}
