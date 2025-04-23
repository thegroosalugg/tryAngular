import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { Place } from './place.model';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  url = 'http://localhost:3000/';
  private httpClient = inject(HttpClient); // httpClient is an Observer object
  private  allPlaces = signal<Place[]>([]);
  private userPlaces = signal<Place[]>([]);
   all = this.allPlaces.asReadonly();
  user = this.userPlaces.asReadonly();

  load(shouldLoadUser: boolean) {
    const endPoint = `${shouldLoadUser ? 'user-' : ''}places`;
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    return this.httpClient.get<Place[]>(this.url + endPoint).pipe(
      // return functions so .pipe etc. can be chained
      tap({ // tap allows running of functions with received data without subscribing
        next: (res) => {
          if (shouldLoadUser) {
            this.userPlaces.set(res); // separate state for user component instance
          } else {
            this.allPlaces.set(res); // main component instance state - won't update after init
          }
        },
      }), // pipe() can accept multiple functions as arguments
      catchError((err) => {
        // catchError/throwError (imported): intercepts errors before the stream is terminated
        console.log('catchError Function', err); // can be used to rollback optimistic updates etc.
        return throwError(() => 'Transformed Error');
        // can handle errors before the component finds out there was an error
      })
    );
  }

  add(place: Place) {
    const prevData = this.userPlaces(); // make a copy of existing data
    if (!this.userPlaces().some(({ id }) => id === place.id)) {
      this.userPlaces.set([place, ...prevData]); // optimistic updating
    } // no early return, function expects an Observable returned
    return this.httpClient
      .put<Place[]>(this.url + 'user-places', { placeId: place.id }) // as req.body
      .pipe( // using tap/subscribe({ next() }) to update data causes FS hosted images to fail...
        catchError((err) => { // ...only optimistic updating outside Observable loads them correctly
          this.userPlaces.set(prevData); // Rollback optimism on error
          return throwError(() => err); // Pass error to subscribe({ error })
        })
      );
  }

  remove(place: Place) {
    return this.httpClient
      .delete<Place[]>(this.url + 'user-places/' + place.id) // as req.params
      .pipe(tap({ next: (res) => this.userPlaces.set(res) }));
  }
}
