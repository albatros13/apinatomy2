import {bootstrap} from '@angular/platform-browser-dynamic';
import {ResourceEditor} from './editors/editor.resources';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';
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

bootstrap(ResourceEditor,
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

