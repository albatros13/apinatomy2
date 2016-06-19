import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LyphTypeEditor} from './editors/editor.lyphType';
import {LyphTypeProvider, PublicationProvider} from './providers/service.apinatomy2';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(LyphTypeEditor, [LyphTypeProvider, PublicationProvider, DND_PROVIDERS])
  .catch(err => console.error(err));
