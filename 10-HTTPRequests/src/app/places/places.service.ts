import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
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
      tap({
        // tap allows running of functions with received data without subscribing
        next: (res) => {
          if (shouldLoadUser) {
            this.userPlaces.set(res); // separate state for user component instance
          } else {
            this.allPlaces.set(res); // main component instance state - won't update after init
          }
        },
      })
    );
  }

  add(place: Place) {
    return this.httpClient
      .put<Place[]>(this.url + 'user-places', { placeId: place.id }) // as body
      .pipe( // delayed: instant updates cause FS hosted images to fail on load
        tap({ next: (res) => setTimeout(() => this.userPlaces.set(res), 100) })
      );
  }
  
  remove(place: Place) {
    return this.httpClient
      .delete<Place[]>(this.url + 'user-places/' + place.id) // as params
      .pipe(tap({ next: (res) => this.userPlaces.set(res) }));
  }
}
