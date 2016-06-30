/**
 * Created by Natallia on 6/8/2016.
 */
import {Component, Directive, Input, ElementRef} from '@angular/core';
import {RepoGeneral} from '../components/repos/repo.general'
import {
  ResourceProvider,
  TypeProvider,
  MaterialTypeProvider,
  LyphTypeProvider,
  CylindricalLyphTypeProvider, MeasurableTypeProvider
} from '../providers/service.apinatomy2'

declare var GoldenLayout:any;

@Directive({
  selector: '[lyphType-widget]'
})
export class LyphTypeWidget{
  @Input() inputConfig: any;

  config = {
    content: [{
      type: 'row',
      content:[{
        type: 'component',
        componentName: 'LyphTypeRepo',
        title: "Lyph types",
        showPopoutIcon: false,
        width: 60,
        componentState: {
          content: '<div id="lyphTypeRepo"><ng-content select="lyphTypeRepoComponent"></ng-content></div>'
        }
      },
        {
          type: 'stack',
          content: [
            {
              type: 'component',
              componentName: 'LyphType',
              title: "Lyph type",
              showPopoutIcon: false,
              width: 40,
              componentState: {
                content: '<div id="lyphType"><ng-content select="lyphTypeWidget"></ng-content></div>'
              }
            },
            {
              type: 'component',
              componentName: 'LyphTypePartonomy',
              title: "Lyph type partonomy",
              showPopoutIcon: false,
              width: 40,
              componentState: {
                content: '<div id="lyphTypePartonomy"><ng-content select="lyphTypePartonomyWidget"></ng-content></div>'
              }
            }
          ]
        }]
    }]
  };

  myLayout: any;

  constructor(public elementRef: ElementRef) {
    this.myLayout = new GoldenLayout(this.inputConfig || this.config, this.elementRef.nativeElement);

    this.myLayout.registerComponent('LyphTypeRepo', function(container:any, componentState:any) {
      container.getElement().html(componentState.content);
      container.on('open', function () {
      })
    });

    this.myLayout.registerComponent('LyphType', function (container:any, componentState:any) {
      container.getElement().html(componentState.content);
      container.on('open', function () {});
      container.on('resize', function () {
      });
    });

    this.myLayout.registerComponent('LyphTypePartonomy', function (container:any, componentState:any) {
      container.getElement().html(componentState.content);
      container.on('open', function () {});
      container.on('resize', function () {
      });
    });
    this.myLayout.init();
  }
}

@Component({
  selector: 'lyphType-editor',
  providers: [
    MeasurableTypeProvider,
    ResourceProvider,
    TypeProvider,
    MaterialTypeProvider,
    LyphTypeProvider,
    CylindricalLyphTypeProvider],
  template: `
    <repo-general [items]="items" caption="Materials" [dependencies]="dependency"></repo-general>
  `,
  directives: [RepoGeneral]
})
export class LyphTypeEditor {
  items: Array<any>;
  dependency: any;

  constructor(
    resourceP: ResourceProvider,
    typeP: TypeProvider,
    materialP: MaterialTypeProvider,
    lyphP: LyphTypeProvider,
    cLyphP: CylindricalLyphTypeProvider,
    measurableP: MeasurableTypeProvider
  ) {

    let allLyphs = lyphP.items.concat(cLyphP.items);
    let allMaterials = materialP.items.concat(allLyphs);
    let allTypes = typeP.items.concat(allMaterials, measurableP.items);
    let allResources = resourceP.items.concat(allTypes);

    this.dependency = {
      equivalences: [],
      weakEquivalences: [],
      resources: allResources,
      types: allTypes,
      materials: allMaterials,
      lyphs: allLyphs,
      cylindricalLyphs: cLyphP.items,
      measurables: measurableP.items
    };
    this.items = allMaterials;
  }
}

