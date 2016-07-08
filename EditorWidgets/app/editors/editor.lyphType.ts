/**
 * Created by Natallia on 6/8/2016.
 */
import {Component, Inject} from '@angular/core';
import {RepoGeneral} from '../components/repos/repo.general';
import {
  ExternalResourceProvider,
  TypeProvider, MaterialTypeProvider, LyphTypeProvider, CylindricalLyphTypeProvider,
  MeasurableTypeProvider, ProcessTypeProvider, BorderTypeProvider,
  GroupTypeProvider, OmegaTreeTypeProvider
} from '../providers/service.apinatomy2'
import {TreeWidget} from '../widgets/widget.tree';

@Component({
  selector: 'lyphType-editor',
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
          <tree [item]="selectedItem" [options]="{transform: true, property: 'materials', depth: 2}"></tree>
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



