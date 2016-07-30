import {bootstrap} from '@angular/platform-browser-dynamic';
import {ResourceEditor} from './editors/editor.resources';
import {DND_PROVIDERS} from 'ng2-dnd/ng2-dnd';

bootstrap(ResourceEditor, [DND_PROVIDERS]
).catch(err => console.error(err));

