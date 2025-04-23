import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  HttpEventType,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { tap } from 'rxjs';

// can transform all requests with an interceptor
const reqInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const intercepted = req.clone({ // clone expects config {} of req.props to be updated
    body: { ...(req.body as Object), message: 'request updated!' },
  }); // use clone when mofifying a request
  console.log('*INTERCEPTED REQUEST', intercepted);
  // allow request to continue
  return next(intercepted).pipe( // can pipe responses, but not subscribe
    tap({ // event is received as response, and is checked for response type
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('**INTERCEPTED RESPONSE', event);
        }
      },
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient( // provides HttpClient as injectable service
      withInterceptors([reqInterceptor]) // optional: can add req/res interceptor functions
    ),
  ],
};
