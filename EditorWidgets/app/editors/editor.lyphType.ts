/**
 * Created by Natallia on 6/8/2016.
 */
import {Component, Directive, Input, ViewChild, ComponentFactory, ElementRef, ComponentResolver, ViewContainerRef} from '@angular/core';
import {RepoLyphType} from '../components/repo.lyphType'
import {RepoPublication} from '../components/repo.publication'
import {ILyphType, IPublication, LyphTypeProvider, PublicationProvider} from '../providers/service.apinatomy2'
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
  providers: [LyphTypeProvider],
  template: `
    <repo-lyphType [items]="items"></repo-lyphType>
    <repo-publication [items]="publications"></repo-publication>
  `,
  directives: [LyphTypeWidget, RepoLyphType, RepoPublication]
})
export class LyphTypeEditor {
  items: Array<ILyphType>;
  publications: Array<IPublication>;
  constructor(lyphTypeProvider: LyphTypeProvider, publicationProvider: PublicationProvider) {
    this.items = lyphTypeProvider.items;
    this.publications = publicationProvider.items;
  }
}

