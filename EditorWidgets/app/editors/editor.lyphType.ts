import {Component, Inject, ElementRef, Renderer, Output, EventEmitter} from '@angular/core';
import {RepoGeneral} from '../repos/repo.general';
import {
  ExternalResourceProvider,
  TypeProvider, MaterialTypeProvider, LyphTypeProvider, CylindricalLyphTypeProvider,
  MeasurableTypeProvider, ProcessTypeProvider, BorderTypeProvider,
  GroupTypeProvider, OmegaTreeTypeProvider
} from '../providers/service.apinatomy2'
import {HierarchyWidget} from '../widgets/widget.hierarchy';
import {ResourceWidget} from '../widgets/widget.resource';
import * as model from "open-physiology-model";

declare var GoldenLayout:any;
declare var $: any;

@Component({
  selector: 'app',
  providers: [
    ExternalResourceProvider,
    MeasurableTypeProvider,
    ProcessTypeProvider,
    BorderTypeProvider,
    TypeProvider,
    MaterialTypeProvider,
    LyphTypeProvider,
    CylindricalLyphTypeProvider,
    GroupTypeProvider,
    OmegaTreeTypeProvider
  ],
  template: `
    <repo-general id="repo"
      [items]="items" 
      [caption]="'All resources'" 
      [dependencies]="dependency" 
      (selected)="onItemSelect($event)">
    </repo-general>
    <hierarchy-widget id = "hierarchy" [item]="selectedItem" [relation]="materials"></hierarchy-widget>
    <resource-widget id = "resource" [item]="selectedItem"></resource-widget>          
    <div id="main"></div>
  `,
  styles: [`#main {width: 100%; height: 100%; border: 0; margin: 0; padding: 0}`],
  directives: [RepoGeneral, HierarchyWidget, ResourceWidget]
})
export class LyphTypeEditor {
  items: Array<any>;
  selectedItem: any;
  dependency: any;
  @Output() resized: EventEmitter;

  layoutConfig = {
    settings:{
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
      content:[
        {
          type: 'column',
          width: 50,
          content: [{
            type: 'component',
            componentName: 'RepoPanel'
          }]
        },
        {
          type: 'column',
          width: 50,
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

  mainLayout: any;

  constructor(

    public renderer: Renderer,
    public el: ElementRef,
    @Inject(ExternalResourceProvider) eResourceP: ExternalResourceProvider,
    @Inject(TypeProvider) typeP: TypeProvider,
    @Inject(MaterialTypeProvider) materialP: MaterialTypeProvider,
    @Inject(LyphTypeProvider) lyphP: LyphTypeProvider,
    @Inject(CylindricalLyphTypeProvider) cLyphP: CylindricalLyphTypeProvider,
    @Inject(MeasurableTypeProvider) measurableP: MeasurableTypeProvider,
    @Inject(ProcessTypeProvider) processP: ProcessTypeProvider,
    @Inject(BorderTypeProvider) borderP: BorderTypeProvider,
    @Inject(GroupTypeProvider) groupP: GroupTypeProvider,
    @Inject(OmegaTreeTypeProvider) omegaTreeP: OmegaTreeTypeProvider
  ) {

   let allLyphs = lyphP.items.concat(cLyphP.items);
   let allMaterials = materialP.items.concat(allLyphs);
   let allGroups = groupP.items.concat(omegaTreeP.items);
   let allTypes = typeP.items.concat(allMaterials, measurableP.items, allGroups);

   let allLyphTemplates =  lyphP.templates.concat(cLyphP.templates);
   let allGroupTemplates = groupP.templates.concat(omegaTreeP.templates);
   let otherTemplates = processP.templates.concat(borderP.templates, measurableP.templates);
   let allTemplates = materialP.templates.concat(allLyphTemplates, allGroupTemplates, otherTemplates);

    this.dependency = {
      externals: eResourceP.items,
      types: allTypes,
      materials: allMaterials,
      lyphs: allLyphs,
      cylindricalLyphs: cLyphP.items,
      measurables: measurableP.items,
      processes: processP.items,
      borders: borderP.items,
      groups: allGroups,
      omegaTrees: omegaTreeP.items,
      templates: allTemplates
    };
    this.items = allTypes;

    var sodiumIonP = model.MaterialType.new({name: "Sodium ion"});
    sodiumIonP.then(
      (w: any) => {
        this.items.push(w);
        setTimeout(() => {}, 0);
      }
    );
  }

  onItemSelect(item: any){
    setTimeout(() => {this.selectedItem = null;}, 0);
    setTimeout(() => {this.selectedItem = item;}, 0);
  }

  ngOnInit(){
    let main = $('app > #main');
    this.mainLayout = new GoldenLayout(this.layoutConfig, main);

    this.mainLayout.registerComponent('RepoPanel', function(container:any, componentState:any) {
      let panel = container.getElement();
      let content = $('app > #repo');
      content.detach().appendTo(panel);
    });

    this.mainLayout.registerComponent('ResourcePanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #resource');
      component.detach().appendTo(panel);
      container.on('resize', function () {
        //emit event
        //this.emit.resized();
      });
    });

    this.mainLayout.registerComponent('HierarchyPanel', function (container:any, componentState:any) {
      let panel = container.getElement();
      let component = $('app > #hierarchy');
      component.detach().appendTo(panel);
      container.on('resize', function () {
        //emit event
      });
    });
    this.mainLayout.init();
  }
}



