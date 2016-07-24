import {Injectable} from '@angular/core';
import {
  ExternalResourceProvider,
  TypeProvider,
  MaterialTypeProvider,
  LyphTypeProvider,
  CylindricalLyphTypeProvider,
  MeasurableTypeProvider,
  ProcessTypeProvider,
  BorderTypeProvider,
  GroupTypeProvider,
  OmegaTreeTypeProvider} from "./service.apinatomy2";
import * as model from "open-physiology-model";

@Injectable()
export class ResourceProvider {
  data: any = {};

  constructor(eResourceP:ExternalResourceProvider,
              typeP:TypeProvider,
              materialP:MaterialTypeProvider,
              lyphP:LyphTypeProvider,
              cLyphP:CylindricalLyphTypeProvider,
              measurableP:MeasurableTypeProvider,
              processP:ProcessTypeProvider,
              borderP:BorderTypeProvider,
              groupP:GroupTypeProvider,
              omegaTreeP:OmegaTreeTypeProvider) {

    let allLyphs = lyphP.items.concat(cLyphP.items);
    let allMaterials = materialP.items.concat(allLyphs);
    let allGroups = groupP.items.concat(omegaTreeP.items);
    let allTypes = typeP.items.concat(allMaterials, measurableP.items, allGroups);

    let allLyphTemplates = lyphP.templates.concat(cLyphP.templates);
    let allGroupTemplates = groupP.templates.concat(omegaTreeP.templates);
    let otherTemplates = processP.templates.concat(borderP.templates, measurableP.templates);
    let allTemplates = materialP.templates.concat(allLyphTemplates, allGroupTemplates, otherTemplates);

    this.data = {
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

    var sodiumIonP = model.MaterialType.new({name: "Sodium ion"});
    sodiumIonP.then(
      (w:any) => {
        this.data.materials.push(w);
        setTimeout(() => {
        }, 0);
      }
    );
  }
}



