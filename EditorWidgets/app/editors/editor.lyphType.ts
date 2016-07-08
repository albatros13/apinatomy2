/**
 * Created by Natallia on 6/8/2016.
 */
import {Component, Inject} from '@angular/core';
import {RepoGeneral} from '../components/repos/repo.general';
import {
  ExternalResourceProvider,
  TypeProvider,
  MaterialTypeProvider,
  LyphTypeProvider,
  CylindricalLyphTypeProvider, MeasurableTypeProvider,
  ProcessTypeProvider
} from '../providers/service.apinatomy2'
import {TreeWidget} from '../widgets/widget.tree';
import {EditorLayout} from '../components/component.test';

//declare var Split: any;

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
    <div class="row">
        <div class="col-sm-6">
            <repo-general 
              [items]="items" 
              caption="Materials" 
              [dependencies]="dependency" 
              (selected)="onItemSelect($event)">
            </repo-general>
        </div>
        <div class="col-sm-6">
          <tree [item]="selectedItem" [options]="{transform: true, property: 'materials', depth: -1}"></tree>
        </div>
    </div>
  `,
  directives: [RepoGeneral, TreeWidget]
})
export class LyphTypeEditor {
  items: Array<any>;
  selectedItem: any;
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

  onItemSelect(item: any){
    this.selectedItem = item;
  }

  // height: number = 600;
  // ngOnInit(){
  //   this.setPanelSize(window.innerWidth, window.innerHeight);
  // }
  //
  // onResize(event: any){
  //   this.setPanelSize(window.innerWidth, window.innerHeight);
  // }
  //
  // setPanelSize(innerWidth: number, innerHeight: number){
  //   if (innerHeight > 300) this.height = innerHeight - 40;
  // }

}



