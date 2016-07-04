/**
 * Created by Natallia on 6/8/2016.
 */
import {Component, Directive, Input, ElementRef, Inject} from '@angular/core';
import {RepoGeneral} from '../components/repos/repo.general'
import {
  ExternalResourceProvider,
  TypeProvider,
  MaterialTypeProvider,
  LyphTypeProvider,
  CylindricalLyphTypeProvider, MeasurableTypeProvider,
  ProcessTypeProvider
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
    ExternalResourceProvider,
    TypeProvider,
    MaterialTypeProvider,
    LyphTypeProvider,
    CylindricalLyphTypeProvider,
    ProcessTypeProvider],
  template: `
    <repo-general [items]="items" caption="Materials" [dependencies]="dependency"></repo-general>
  `,
  directives: [RepoGeneral]
})
export class LyphTypeEditor {
  items: Array<any>;
  dependency: any;

  constructor(
    @Inject(ExternalResourceProvider) eResourceP: ExternalResourceProvider,
    @Inject(TypeProvider) typeP: TypeProvider,
    @Inject(MaterialTypeProvider) materialP: MaterialTypeProvider,
    @Inject(LyphTypeProvider) lyphP: LyphTypeProvider,
    @Inject(CylindricalLyphTypeProvider) cLyphP: CylindricalLyphTypeProvider,
    @Inject(MeasurableTypeProvider) measurableP: MeasurableTypeProvider,
    @Inject(ProcessTypeProvider) processP: ProcessTypeProvider
  ) {

    let allLyphs = lyphP.items.concat(cLyphP.items);
    let allMaterials = materialP.items.concat(allLyphs);
    let allTypes = typeP.items.concat(allMaterials, measurableP.items);

    let allLyphTemplates =  lyphP.templates.concat(cLyphP.templates);
    let allTemplates = materialP.templates.concat(allLyphTemplates);

    this.dependency = {
      externals: eResourceP.items,
      types: allTypes,
      materials: allMaterials,
      lyphs: allLyphs,
      cylindricalLyphs: cLyphP.items,
      measurables: measurableP.items,
      processes: processP.items,
      templates: allTemplates
    };
    this.items = allMaterials;
  }
}

