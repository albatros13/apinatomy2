/**
 * Created by Natallia on 6/14/2016.
 */
import {Component} from '@angular/core';
import {IResource, Resource, ITemplate} from '../../providers/service.apinatomy2';

@Component({
  selector: 'sort-toolbar',
  inputs: ['items'],
  template: `
      <button type="button" class="btn btn-default" aria-label="Sort by attribute" (click)="sortAsc(property)">
        <span class="glyphicon glyphicon-sort-by-attributes" aria-hidden="true"></span>
      </button>
      <button type="button" class="btn btn-default" aria-label="Sort by attribute (desc)" (click)="sortDesc(property)">
        <span class="glyphicon glyphicon-sort-by-attributes-alt" aria-hidden="true"></span>
      </button>
    `,
  directives: []
})
export class SortToolbar {
  property: string = "id";
  items: Array<any>;

  constructor(){}

  sortAsc(prop: string){
    this.items.sort((a: any, b: any) => {
      if (a[prop] > b[prop]) return 1;
      if (a[prop] < b[prop]) return -1;
      return 0;})
  }

  sortDesc(prop: string){
    this.items.sort((a: any, b: any) => {
      if (a[prop] > b[prop]) return -1;
      if (a[prop] < b[prop]) return 1;
      return 0;})
  }
}

@Component({
  selector: 'repo-toolbar',
  inputs: ['items'],
  template: `
      <sort-toolbar [items]="items"></sort-toolbar>
      <button type="button" class="btn btn-default" aria-label="Add" (click)="addItem()">
         <span class="glyphicon glyphicon-plus"></span>
      </button>
    `,
  directives: [SortToolbar]
})
export class RepoToolbar {
  items: Array<IResource>;
  constructor(){}
  addItem() {
    this.items.push(new Resource({id: 0, name: "New item"}));
  }
}

@Component({
  selector: 'repo-wrapper',
  inputs: ['items', 'caption'],
  template:`
        <div class="panel panel-info repo">
          <div class="panel-heading">{{caption}}</div>
          <div class="panel-body" >
            <repo-toolbar [items]="items"></repo-toolbar>
              <ng-content></ng-content>
          </div>
        </div>
   
  `,
  directives: [RepoToolbar]
})
export class RepoWrapper {
  public selected: IResource = null;
  public items: Array<IResource> = [];

  constructor(){}

  protected ngOnInit(){

    if (this.items && this.items[0])
      this.selected = this.items[0];
  }

  protected changeActive(item: any){
    this.selected = item;
  }

  protected onSaved(item: IResource, updatedItem: IResource){
     for (var key in updatedItem){
       if (updatedItem.hasOwnProperty(key)){
         item[key] = updatedItem[key];
       }
     }
   }

  protected onRemoved(item: IResource, items: Array<IResource>){
    if (!items) return;
    let index = items.indexOf(item);
    if (index > -1) items.splice(index, 1);
  }
}

@Component({
  selector: 'repo-template-wrapper',
  inputs: ['items', 'caption'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{caption}}</div>
      <div class="panel-body" >
          <ng-content></ng-content>
      </div>
    </div>
  `,
  directives: []
})
export class RepoTemplateWrapper {
  public selected: ITemplate = null;
  public items: Array<ITemplate> = [];

  constructor(){}

  protected ngOnInit(){
    if (!this.items) this.items = [];
    if (this.items && this.items[0])
      this.selected = this.items[0];
  }

  protected changeActive(item: any){
    this.selected = item;
  }

  protected onSaved(item: ITemplate, updatedItem: ITemplate){
    for (var key in updatedItem){
      if (updatedItem.hasOwnProperty(key)){
        item[key] = updatedItem[key];
      }
    }
  }

  protected onRemoved(item: ITemplate){
    let index = this.items.indexOf(item);
    if (index > -1) this.items.splice(index, 1);
  }
}


