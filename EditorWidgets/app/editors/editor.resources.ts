import {Component, ElementRef} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {HierarchyWidget} from '../widgets/widget.relations';
import {ResourceWidget} from '../widgets/widget.resource';
import {ResizeService} from '../services/service.resize';
import {Subscription}   from 'rxjs/Subscription';
import {SetToArray} from "../transformations/pipe.general";

import * as model from "open-physiology-model";

declare var GoldenLayout:any;
declare var $: any;

@Component({
  selector: 'app',
  providers: [
    ResizeService
  ],
  template: `
    <repo-general id="repo"
      [items]="items | setToArray" 
      [caption]="'All resources'" 
      (selected)="onItemSelected($event)"
      (added)="onItemAdded($event)"
      (removed)="onItemRemoved($event)"
      (updated)="onItemUpdated($event)">
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>          
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, HierarchyWidget, ResourceWidget],
  pipes: [SetToArray]
})
export class ResourceEditor {
  items:Array<any>;
  selectedItem:any;

  layoutConfig = {
    settings: {
      hasHeaders: false,
      constrainDragToContainer: true,
      reorderEnabled: true,
      showMaximiseIcon: true,
      showCloseIcon: true,
      selectionEnabled: false,
      popoutWholeStack: false,
      showPopoutIcon: false
    },
    dimensions: {
      borderWidth: 2
    },
    content: [{
      type: 'row',
      content: [
        {
          type: 'component',
          componentName: 'RepoPanel'
        },
        {
          type: 'column',
          content: [
            {
              type: 'component',
              componentName: 'HierarchyPanel'
            },
            {
              type: 'component',
              componentName: 'ResourcePanel'
            }
          ]
        }]
    }]
  };

  mainLayout:any;

  subscription: Subscription;

  constructor(private resizeService:ResizeService,
              public el:ElementRef) {
    this.subscription = model.Resource.p('all').subscribe(
      (data: any) => {this.items = data;});

    console.log("V.4");

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

      /*External resources*/
      let fma7203  = model.ExternalResource.new({name: "FMA:7203", uri: ""});
      let fma15610 = model.ExternalResource.new({name: "FMA:15610", uri: ""});
      let fma66610 = model.ExternalResource.new({name: "FMA:66610", uri: ""});
      let fma17881 = model.ExternalResource.new({name: "FMA:17881", uri: ""});

      var externals = [fma7203, fma15610, fma66610, fma17881];

      await Promise.all(externals.map(p => p.commit()));

      let borderType = model.BorderType.new({name: "GeneralBorder"});
      await borderType.commit();

      let minusBorder = model.BorderTemplate.new({name: "T: MinusBorder", type: borderType, cardinalityBase: 1});

      let plusBorder  = model.BorderTemplate.new({name: "T: PlusBorder",  type: borderType, cardinalityBase: 1});
      let innerBorder = model.BorderTemplate.new({name: "T: InnerBorder", type: borderType, cardinalityBase: 1});
      let outerBorder = model.BorderTemplate.new({name: "T: OuterBorder", type: borderType, cardinalityBase: 1});

      let borders = [minusBorder, plusBorder, innerBorder, outerBorder];
      await Promise.all(borders.map(p => p.commit()));

      /*Cylindrical lyphs*/
      let renalH = model.CylindricalLyphType.new({name: "Renal hilum", externals: [fma15610],
        minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder});
      let renalP = model.CylindricalLyphType.new({name: "Renal parenchyma",
        minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder});
      let renalC = model.CylindricalLyphType.new({name: "Renal capsule", externals: [fma66610],
        minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder});

      var cLyphs1 = [renalH, renalP, renalC];
      await Promise.all(cLyphs1.map(p => p.commit()));

      let kidney = model.CylindricalLyphType.new({name: "Kidney", externals: [fma7203],
        minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder});
      await kidney.commit();

      let kidneyLobus = model.CylindricalLyphType.new({name: "Kidney lobus", externals: [fma17881],
        minusBorder: minusBorder, plusBorder: plusBorder, innerBorder: innerBorder, outerBorder: outerBorder});
      await kidneyLobus.commit();

    })();

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onItemSelected(item:any) {
    setTimeout(() => {
      this.selectedItem = null;
    }, 0);
    setTimeout(() => {
      this.selectedItem = item;
    }, 0);
  }

  onItemAdded(item:any) {
  }

  onItemRemoved(item:any) {
  }

  onItemUpdated(item:any) {
  }

  ngOnInit() {
    let self = this;
    let main = $('app > #main');
    this.mainLayout = new GoldenLayout(this.layoutConfig, main);

    this.mainLayout.registerComponent('RepoPanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let content = $('app > #repo');
      content.detach().appendTo(panel);
    });

    this.mainLayout.registerComponent('HierarchyPanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #hierarchy');
      component.detach().appendTo(panel);
      //Notify components about window resize
      container.on('open', function() {
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "hierarchy-widget", size: size});
      });
      container.on('resize', function() {
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "hierarchy-widget", size: size});
      });
    });

    this.mainLayout.registerComponent('ResourcePanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #resource');
      component.detach().appendTo(panel);

      //Notify components about window resize
      container.on('open', function(){
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "resource-widget", size: size}) ;
      });
      container.on('resize', function(){
        let size = {width: container.width, height: container.height};
        self.resizeService.announceResize({target: "resource-widget", size: size}) ;
      });
    });
    this.mainLayout.init();
  }
}


