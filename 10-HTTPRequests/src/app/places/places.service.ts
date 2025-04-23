import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PlacesService {
  url = 'http://localhost:3000/';
  private httpClient = inject(HttpClient);
  userPlaces = signal<Place[]>([]);
  // loadedUserPlaces = this.userPlaces.asReadonly();

  load(endPoint: 'places' | 'user-places') {
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    return this.httpClient.get<Place[]>(this.url + endPoint);
  } // return functions so .pipe etc. can be chained

  add(place: Place) {
    return this.httpClient.put<Place[]>(this.url + 'user-places', {
      placeId: place.id, // as body
    });
  }

  remove(place: Place) {
    return this.httpClient.delete<Place[]>(
      this.url + 'user-places/' + place.id // as params
    );
  }
}
