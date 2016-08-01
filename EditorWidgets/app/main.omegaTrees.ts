import {bootstrap}    from '@angular/platform-browser-dynamic';
import {OmegaTreeEditor} from './editors/editor.omegaTrees';

import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(OmegaTreeEditor,
  [ DND_PROVIDERS]
).catch(err => console.error(err));
