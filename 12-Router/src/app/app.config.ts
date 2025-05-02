import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      // allows binding of dynamic URL parameters with input() in components
      withComponentInputBinding(),
      // allows passing of said params automatically to child routes
      withRouterConfig({ paramsInheritanceStrategy: 'always' })
    ),
  ],
};
