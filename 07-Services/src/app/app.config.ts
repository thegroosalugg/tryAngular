import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TasksService } from 'app/tasks/tasks.service';

import { routes } from './app.routes';

// *4 How injection providers work under the hood: a token is
export const TaskInjectorTkn = new InjectionToken<TasksService>('TasksServiceToken');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // TasksService // *3 services can also be injected into bootstrapApplication(config)
    // however not recommended as it bootstraps them before they're needed

    // { provide: TaskInjectorTkn, useClass: TasksService }, // #INJECTOR
    // *4 this is the equivalent of adding TaskService to the provider
  ]
};
