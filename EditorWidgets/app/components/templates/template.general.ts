/**
 * Created by Natallia on 6/21/2016.
 */
import {Component, EventEmitter, Output} from '@angular/core';
import {IResource, ITemplate,
  IValueDistribution, ValueDistribution,
  IBoundedNormalDistribution, BoundedNormalDistribution,
  IUniformDistribution, UniformDistribution} from '../../providers/service.apinatomy2'
import {RestoreService} from "../../providers/service.restore";
import {RADIO_GROUP_DIRECTIVES} from "ng2-radio-group";

@Component({
  selector: 'uniformDistribution-input',
  inputs: ['item'],
  providers: [RestoreService],
  template:`
    <fieldset>
      <div class="input-control">
        <label for="min">Min: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.min">
      </div>
      <div class="input-control">
        <label for="max">Max: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.max">
      </div>
      <ng-content></ng-content>
    </fieldset>
  `,
  directives: []
})
export class UniformDistributionInput {
  @Output() saved = new EventEmitter();

  constructor(protected restoreService: RestoreService<IUniformDistribution>){}

  protected ngOnInit() {
    if (!this.item) this.item = new UniformDistribution();
  }

  protected set item (item: IUniformDistribution) {
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
}

@Component({
  selector: 'boundedNormalDistribution-input',
  inputs: ['item'],
  providers: [RestoreService],
  template:`
    <uniformDistribution-input [item]="item">
      <div class="input-control">
        <label for="mean">Mean: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.mean">
      </div>
      <div class="input-control">
        <label for="std">Std: </label>
        <input type="number" min="0" max="100" required [(ngModel)]="item.std">
      </div>
      <ng-content></ng-content>
    </uniformDistribution-input>
  `,
  directives: [UniformDistributionInput]
})
export class BoundedNormalDistributionInput extends UniformDistributionInput{
  constructor(protected restoreService: RestoreService<IBoundedNormalDistribution>){
    super(restoreService);
  }

  protected ngOnInit() {
    if (!this.item) this.item = new BoundedNormalDistribution();
  }
}

@Component({
  selector: 'distribution-input',
  inputs: ['item'],
  template:`
    <fieldset>
      <radio-group [(ngModel)]="distributionType" [required]="true">
        <input type="radio" value="Uniform" checked = "item.type == 'Uniform'">Uniform
        <input type="radio" value="BoundedNormal" checked = "item.type == 'BoundedNormal'">Bounded normal<br/>
      </radio-group>
      <uniformDistribution-input [item]="item.distribution" *ngIf="distributionType != 'BoundedNormal'"></uniformDistribution-input>
      <boundedNormalDistribution-input [item]="item.distribution" *ngIf="distributionType == 'BoundedNormal'"></boundedNormalDistribution-input>
    </fieldset>
  `,
  directives: [RADIO_GROUP_DIRECTIVES, UniformDistributionInput, BoundedNormalDistributionInput]
})
export class DistributionInput {
  distributionType: string[] = ["Uniform", "BoundedNormal"];
  item: IValueDistribution;
  constructor(){}

  protected ngOnInit() {
    if (!this.item) this.item = new ValueDistribution();
  }
}

@Component({
  "inputs": ["caption", "item"],
  "selector": "template-value",
  "template": `
     <fieldset>
       <legend>{{caption}}</legend>
       <radio-group [(ngModel)]="valueType" [required]="true">
         <input type="radio" value="Value">Value
         <input type="radio" value="Distribution">Distribution<br/>
       </radio-group>
       <input type="number" min="0" max="100" [(ngModel)]="item" *ngIf="valueType != 'Distribution'"/>
       <distribution-input [item]="item" *ngIf="valueType == 'Distribution'"></distribution-input>
     </fieldset>
   `,
  "directives": [RADIO_GROUP_DIRECTIVES, DistributionInput]
})
export class TemplateValue{
  valueType: string[] = ["Value", "Distribution"];
}

@Component({
  selector: 'repo-template-wrapper',
  inputs: ['model'],
  template:`
    <div class="panel panel-warning repo-template">
      <div class="panel-heading">{{model.caption}}</div>
      <div class="panel-body" >
          <ng-content></ng-content>
      </div>
    </div>
  `,
  directives: []
})
export class RepoTemplateWrapper {
  public selected: ITemplate = null;
  public model: {caption: string, items: Array<ITemplate>, options: Array<IResource>} = {
    caption: "Templates", items: [], options: []};

  constructor(){}

  protected ngOnInit(){
    if (!this.model.items) this.model.items = [];
    if (this.model && this.model.items && this.model.items[0])
      this.selected = this.model.items[0];
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
    let index = this.model.items.indexOf(item);
    if (index > -1) this.model.items.splice(index, 1);
  }
}
