import { Route } from '@angular/router';
import { loadRemote } from '@module-federation/enhanced/runtime';

export const appRoutes: Route[] = [
  {
    // path: 'radiologist',
    // loadChildren: () =>
    //   loadRemote<typeof import('Radiologist/Routes')>(
    //     'Radiologist/Routes'
    //   ).then(m => m!.remoteRoutes),
  }
];
