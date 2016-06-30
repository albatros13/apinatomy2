import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LyphTypeEditor} from './editors/editor.lyphType';
import {
  ResourceProvider,
  MaterialTypeProvider,
  LyphTypeProvider,
  CylindricalLyphTypeProvider,
  MeasurableTypeProvider} from './providers/service.apinatomy2';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(LyphTypeEditor, [
  ResourceProvider,
  MaterialTypeProvider,
  LyphTypeProvider,
  CylindricalLyphTypeProvider,
  MeasurableTypeProvider, DND_PROVIDERS])
  .catch(err => console.error(err));
