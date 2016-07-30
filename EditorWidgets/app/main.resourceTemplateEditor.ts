import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ResourceAndTemplateEditor} from './editors/editor.resourcesAndTemplates';

import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(ResourceAndTemplateEditor,
  [ DND_PROVIDERS]
).catch(err => console.error(err));
