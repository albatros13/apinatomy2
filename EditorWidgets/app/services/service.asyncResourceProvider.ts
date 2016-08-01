"use strict";
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

import * as model from "open-physiology-model";

@Injectable()
export class AsyncResourceProvider {
  private _data$: Subject<any> = <Subject<any>>new Subject();
  private dataStore: any = {};

  get data$() {
    return this._data$.asObservable();
  }

  loadAll(dataStore: any) {
    this.dataStore = dataStore;
    this._data$.next(this.dataStore);
  }

  addResources(dataItems: any[]) {
    if (this.dataStore.resources && (dataItems.length > 0)){
      for (let dataItem of dataItems){
        let index = this.dataStore.resources.findIndex((item: any) => (item == dataItem));
        if (index >= 0) {
          this.dataStore.resources[index] = dataItem;
        } else {
          this.dataStore.resources.push(dataItem);
        }
      }
    } else {
      this.dataStore.resources = dataItems;
    }
    this._data$.next(this.dataStore);
  }

  addResource(dataItem: any) {
    if (this.dataStore.resources){
      let index = this.dataStore.resources.findIndex((item: any) => (item == dataItem));
      if (index >= 0) {
        this.dataStore.resources[index] = dataItem;
      } else {
        this.dataStore.resources.push(dataItem);
      }
    } else {
      this.dataStore.resources = [dataItem];
    }
    this._data$.next(this.dataStore);
  }

  removeResource(dataItem: any) {
    if (this.dataStore.resources){
      let index = this.dataStore.resources.findIndex((item: any) => (item == dataItem));
      if (index >= 0) {
        this.dataStore.resources.slice(index,1);
      }
    }
    this._data$.next(this.dataStore);
  }

  loadExtra(){
    let self = this;

    (async function() {
      /*Material type*/
      var water = model.MaterialType.new({name: "Water"});
      await water.commit();
      var vWater = model.MeasurableType.new({name: "Concentration of water", quality: "concentration",
        materials: [water]});
      await vWater.commit();

      /*Measurable type*/
      var sodiumIon = model.MaterialType.new({name: "Sodium ion"});
      await sodiumIon.commit();
      var vSodiumIon = model.MeasurableType.new({name: "Concentration of sodium ion", quality: "concentration",
        materials: [sodiumIon]});
      await vSodiumIon.commit();

      /*Process type*/
      var processes = [
        model.ProcessType.new({name: "Inflow Right Heart"}),
        model.ProcessType.new({name: "Outflow Right Heart"}),
        model.ProcessType.new({name: "Inflow Left Heart"}),
        model.ProcessType.new({name: "Outflow Left Heart"})];

      await Promise.all(processes.map(p => p.commit()));

      /*Causality type*/
     // var causality = model.CausalityType.new({name: "Causality relations", supertypes: [], subtypes: []});
     // await causality.commit();

      self.addResource(water);
      self.addResource(sodiumIon);

      self.addResource(vWater);
      self.addResource(vSodiumIon);

      self.addResources(processes);

      //self.addResources(causality);


    })();
  }
}
