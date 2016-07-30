import {bootstrap}    from '@angular/platform-browser-dynamic';
import {ResourceAndTemplateViewer} from './editors/viewer.resourcesAndTemplates';

import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(ResourceAndTemplateViewer, [DND_PROVIDERS]
).catch(err => console.error(err));
