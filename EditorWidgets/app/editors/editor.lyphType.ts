/**
 * Created by Natallia on 6/8/2016.
 */
import {Component, Inject} from '@angular/core';
import {RepoGeneral} from '../components/repos/repo.general';
import {
  ExternalResourceProvider,
  TypeProvider, MaterialTypeProvider, LyphTypeProvider, CylindricalLyphTypeProvider,
  MeasurableTypeProvider, ProcessTypeProvider, BorderTypeProvider,
  GroupTypeProvider, OmegaTreeTypeProvider, ResourceName
} from '../providers/service.apinatomy2'
import {HierarchyWidget} from '../widgets/widget.hierarchy';
import {OmegaTreeWidget} from '../widgets/widget.omegaTree';

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
              caption="All resources" 
              [dependencies]="dependency" 
              (selected)="onItemSelect($event)">
            </repo-general>
        </div>
        <div class="col-sm-6">
          <hierarchy [item]="selectedItem" [relation]="materials"></hierarchy>
          <omega-tree *ngIf="selectedItem && (selectedItem.class == resourceName.OmegaTreeType)" 
            [item]="selectedItem"></omega-tree>          
        </div>
    </div>
  `,
  directives: [RepoGeneral, HierarchyWidget, OmegaTreeWidget]
})
export class LyphTypeEditor {
  items: Array<any>;
  selectedItem: any;
  dependency: any;
  resourceName = ResourceName;

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
    setTimeout(() => {this.selectedItem = null;}, 0);
    //this.selectedItem = item;
    setTimeout(() => {this.selectedItem = item;}, 0);

  }
}



