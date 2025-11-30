import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';

export const appRoutes: Route[] = [
  {
    path: 'Architect_doc',
    loadChildren: () =>
      loadRemote<typeof import('Architect_doc/Routes')>(
        'Architect_doc/Routes'
      ).then((m) => m!.remoteRoutes),
  },
  {
    path: 'Radiologist',
    loadChildren: () =>
      loadRemote<typeof import('Radiologist/Routes')>(
        'Radiologist/Routes'
      ).then((m) => m!.remoteRoutes),
  },
  {
    path: 'Chat_AI',
    loadChildren: () =>
      loadRemote<typeof import('Chat_AI/Routes')>('Chat_AI/Routes').then(
        (m) => m!.remoteRoutes
      ),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
