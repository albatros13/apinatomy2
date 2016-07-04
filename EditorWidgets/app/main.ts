import {bootstrap}    from '@angular/platform-browser-dynamic';
import {LyphTypeEditor} from './editors/editor.lyphType';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(LyphTypeEditor, [DND_PROVIDERS])
  .catch(err => console.error(err));
