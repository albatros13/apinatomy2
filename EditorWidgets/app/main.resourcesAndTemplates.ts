import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ResourceAndTemplateEditor} from './editors/editor.resourcesAndTemplates';
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
  OmegaTreeTypeProvider} from './services/service.apinatomy2';

import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(ResourceAndTemplateEditor,
  [ DND_PROVIDERS,
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
  ]
).catch(err => console.error(err));
