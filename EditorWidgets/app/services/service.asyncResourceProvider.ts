"use strict";
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ResourceName} from './service.apinatomy2';

import * as model from "open-physiology-model";


@Injectable()
export class AsyncResourceProvider {
  private _data$: Subject<any> = <Subject<any>>new Subject();
  private dataStore: any = {};

  get data$() {
    return this._data$.asObservable();
  }

  constructor(){
  }

  ngOnInit(){}

  loadAll(dataStore: any) {
    this.dataStore = dataStore;
    this._data$.next(this.dataStore);
  }

  updateSubSets(Class: any){
      if (Class == ResourceName.Resource) return;

      if (Class && (Class.indexOf("Type") > 0)){
        this.dataStore.cylindricalLyphs = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.CylindricalLyphType));

        this.dataStore.lyphs = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.LyphType ||
        x.class == ResourceName.CylindricalLyphType));

        this.dataStore.materials = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.MaterialType ||
        x.class == ResourceName.LyphType ||
        x.class == ResourceName.CylindricalLyphType));

        this.dataStore.types = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.MeasurableType ||
        x.class == ResourceName.ProcessType ||
        x.class == ResourceName.CausalityType ||
        x.class == ResourceName.NodeType ||
        x.class == ResourceName.BorderType ||
        x.class == ResourceName.GroupType ||
        x.class == ResourceName.OmegaTreeType ||
        x.class == ResourceName.MaterialType ||
        x.class == ResourceName.LyphType ||
        x.class == ResourceName.CylindricalLyphType));
      }

      if (Class && (Class.indexOf("Measurable") > 0)) {
        this.dataStore.measuarbles = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.MeasurableType));
      }

      if (Class && (Class == ResourceName.OmegaTreeType || Class == ResourceName.GroupType)) {
        this.dataStore.groups = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.GroupType ||
        x.class == ResourceName.OmegaTreeType));
      }

      if (Class && (Class == ResourceName.OmegaTreeType)) {
        this.dataStore.omegaTrees = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.OmegaTreeType));
      }

      this.dataStore.borders = this.dataStore.resources.filter((x:any) => (
      x.class == ResourceName.BorderType));

      this.dataStore.processes = this.dataStore.resources.filter((x:any) => (
      x.class == ResourceName.ProcessType));

      this.dataStore.nodes = this.dataStore.resources.filter((x:any) => (
      x.class == ResourceName.NodeType));

      this.dataStore.causalities = this.dataStore.resources.filter((x:any) => (
      x.class == ResourceName.CausalityType));

      if (Class && (Class == ResourceName.Coalescence)) {
        this.dataStore.coalescences = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.Coalescence));
      }

      if (Class && (Class == ResourceName.Publication) ) {
        this.dataStore.publications = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.Publication));
      }

      if (Class && (Class == ResourceName.ClinicalIndex) ) {
        this.dataStore.clinicalIndices = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.ClinicalIndex));
      }

      if (Class && (Class == ResourceName.Correlation) ) {
        this.dataStore.correlations = this.dataStore.resources.filter((x:any) => (
        x.class == ResourceName.Correlation));
      }

      //All templates
      this.dataStore.templates = this.dataStore.resources.filter((x:any) => (
        x.class && (x.class.indexOf("Template") > 0)));
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
      this.updateSubSets(dataItems[0].class);
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
        this.updateSubSets(dataItem.class);
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
        this.updateSubSets(dataItem.class);
      }
    }
    this._data$.next(this.dataStore);
  }

  loadExtra(){
    let self = this;

    (async function() {
      var water = model.MaterialType.new({name: "Water"});
      var vWater = model.MeasurableType.new({name: "Concentration of water", quality: "concentration",
        materials: [water]});

      var sodiumIon = model.MaterialType.new({name: "Sodium ion"});
      var vSodiumIon = model.MeasurableType.new({name: "Concentration of sodium ion", quality: "concentration",
        materials: [sodiumIon]});

      var processes = [
        model.ProcessType.new({name: "Inflow Right Heart"}),
        model.ProcessType.new({name: "Outflow Right Heart"}),
        model.ProcessType.new({name: "Inflow Left Heart"}),
        model.ProcessType.new({name: "Outflow Left Heart"})];

      console.log("Material", water);
      console.log("Measurable", vWater);
      console.log("Process", processes[0]);

      self.addResource(water);
      self.addResource(sodiumIon);

      self.addResource(vWater);
      self.addResource(vSodiumIon);

      self.addResources(processes);

    })();
  }
}
