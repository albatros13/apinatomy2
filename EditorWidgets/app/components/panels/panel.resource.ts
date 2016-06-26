/**
 * Created by Natallia on 6/14/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {IResource} from "../../providers/service.apinatomy2";
import {RestoreService} from "../../providers/service.restore";
import {MultiSelectInput} from '../component.general';

@Component({
  selector: 'resource-toolbar',
  template: `
    <button type="button" class="btn btn-default" aria-label="Remove" (click)="removed.emit()">
      <span class="glyphicon glyphicon-remove"></span>
    </button>
    <button type="button" class="btn btn-default" aria-label="Save" (click)="saved.emit()">
      <span class="glyphicon glyphicon-check"></span>
    </button>
    <button type="button" class="btn btn-default" aria-label="Restore" (click)="canceled.emit()">
      <span class="glyphicon glyphicon-refresh"></span>
    </button>
    `
})
export class ResourceToolbar {
  @Output() removed = new EventEmitter();
  @Output() canceled = new EventEmitter();
  @Output() saved = new EventEmitter();

  constructor(){};
}

@Component({
  selector: 'resource-panel',
  providers: [RestoreService],
  inputs: ['item', 'ignore', 'dependency'],
  template:`
    <div class="panel">
        <div class="panel-body">
          <resource-toolbar  
            (saved)="onSaved()"
            (canceled)="onCanceled()"
            (removed)="onRemoved()">
          </resource-toolbar>
          <div class="panel-content">
              <div class="input-control" *ngIf="includeProperty('id')">
                <label for="id">ID: </label>
                <input type="text" disabled [(ngModel)]="item.id">
              </div>
              <div class="input-control" *ngIf="includeProperty('name')">
                <label for="name">Name: </label>
                <input type="text" required [(ngModel)]="item.name">
              </div>
              <div class="input-control" *ngIf="includeProperty('equivalence')">
                <label for="equivalence">Equivalence: </label>
                <select-input [item]="item.equivalence" [options]="dependency.equivalences"></select-input>
              </div>
              <div class="input-control" *ngIf="includeProperty('weakEquivalence')">
                <label for="weakEquivalence">Weak equivalence: </label>
                <select-input [item]="item.weakEquivalence" [options]="dependency.weakEquivalences"></select-input>
              </div>
              <ng-content></ng-content>
          </div>
        </div>
    </div>
  `,
  directives: [ResourceToolbar, MultiSelectInput]
})
export class ResourcePanel {
  ignore: Array<string> = [];
  @Output() saved = new EventEmitter();
  @Output() removed = new EventEmitter();

  constructor(protected restoreService: RestoreService<IResource>){}

  protected set item (item: IResource) {
    this.restoreService.setItem(item);
  }

  protected get item () {
    return this.restoreService.getItem();
  }

  protected onSaved() {
    this.item = this.restoreService.getItem();
    this.saved.emit(this.item);
  }

  protected onCanceled() {
    this.item = this.restoreService.restoreItem();
  }

  protected onRemoved(){
    this.removed.emit(this.item);
  }

  protected includeProperty(prop: string){
    if (this.ignore && (this.ignore.indexOf(prop) > -1)) return false;
    return true;
  }
}
