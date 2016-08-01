/**
 * Created by Natallia on 7/8/2016.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ResourceName, TemplateName} from "../services/service.apinatomy2";
import * as model from "open-physiology-model";

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

  @Input() items: Array<any> = [];
  @Input() types: Array<any> = [];
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

  protected getIcon(Class: any): string{
    switch (Class){
      case ResourceName.ExternalResource : return "images/external.png";
      case ResourceName.MaterialType  : return "images/materialType.png";
      case ResourceName.LyphType      : return "images/lyphType.png";
      case ResourceName.CylindricalLyphType: return "images/cylindricalLyphType.png";

      case ResourceName.ProcessType   : return "images/processType.png";
      case ResourceName.MeasurableType: return "images/measurableType.png";
      case ResourceName.CausalityType : return "images/causalityType.png";
      case ResourceName.NodeType      : return "images/nodeType.png";
      case ResourceName.BorderType    : return "images/borderType.png";
      case ResourceName.Coalescence   : return "images/coalescence.png";

      case ResourceName.GroupType     : return "images/groupType.png";
      case ResourceName.OmegaTreeType : return "images/omegaTreeType.png";

      case ResourceName.Publication   : return "images/publication.png";
      case ResourceName.Correlation   : return "images/correlation.png";
      case ResourceName.ClinicalIndex : return "images/clinicalIndex.png";

      case TemplateName.LyphTemplate      : return "images/lyphType.png";
      case TemplateName.CylindricalLyphTemplate: return "images/cylindricalLyphType.png";

      case TemplateName.ProcessTemplate   : return "images/processType.png";
      case TemplateName.MeasurableTemplate: return "images/measurableType.png";
      case TemplateName.CausalityTemplate : return "images/causalityType.png";
      case TemplateName.NodeTemplate      : return "images/nodeType.png";
      case TemplateName.BorderTemplate    : return "images/borderType.png";
      case TemplateName.CausalityTemplate : return "images/causality.png";

      case TemplateName.GroupTemplate     : return "images/groupType.png";
      case TemplateName.OmegaTreeTemplate : return "images/omegaTreeType.png";

    }
    return "images/resource.png";
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
        this.selectedItem = 0;
    }
    this.removed.emit(item);
    this.updated.emit(this.items);
  }

  protected onAdded(Class: any){
    let proto: any = {name: "New " + Class};
    if (Class.indexOf("Template") > 0) {
      proto = {name: "T: New " + Class, cardinality: 1};
    }
    let newItem = model[Class].new(proto);
    this.items.push(newItem);
    this.added.emit(newItem);
    this.updated.emit(this.items);
    this.selectedItem = newItem;
  }
}
