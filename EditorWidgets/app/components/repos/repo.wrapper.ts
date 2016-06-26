/**
 * Created by Natallia on 6/14/2016.
 */
import {Component} from '@angular/core';
import {IResource, Resource} from '../../providers/service.apinatomy2';

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
    this.items.push(new Resource());
  }
}

@Component({
  selector: 'repo-wrapper',
  inputs: ['model'],
  template:`
        <div class="panel panel-info repo">
          <div class="panel-heading">{{model.caption}}</div>
          <div class="panel-body" >
            <repo-toolbar [items]="model.items"></repo-toolbar>
              <ng-content></ng-content>
          </div>
        </div>
   
  `,
  directives: [RepoToolbar]
})
export class RepoWrapper {
  public selected: IResource = null;
  public model: {items: Array<IResource>, caption: string};

  constructor(){}

  protected ngOnInit(){
    if (this.model && this.model.items && this.model.items[0])
      this.selected = this.model.items[0];
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

  protected onRemoved(item: IResource){
    let index = this.model.items.indexOf(item);
    if (index > -1) this.model.items.splice(index, 1);
  }
}

