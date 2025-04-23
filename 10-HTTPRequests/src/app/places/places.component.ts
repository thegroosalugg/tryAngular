import { Component, inject, input, output, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { PlacesService } from './places.service';

@Component({
     selector: 'app-places',
      imports: [],
  templateUrl: './places.component.html',
     styleUrl: './places.component.scss',
})
export class PlacesComponent {
  private httpClient = inject(HttpClient);
     url = 'http://localhost:3000/';
  isUser = input<boolean>(false);
  places = signal<Place[]>([]);
  placesService = inject(PlacesService);

  ngOnInit() {
    // httpClient is an Observer object
    const endPoint = `${this.isUser() ? 'user-' : ''}places`;
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    this.httpClient.get<Place[]>(this.url + endPoint).subscribe({
      // observed .get data is returned here
      next: (res) => {
        if (this.isUser()) {
          // separate state for user component instance
          this.placesService.userPlaces.set(res);
        } else {
          this.places.set(res); // main component instance state - won't update after init
        }
      },
    });
  }

  onSelect(place: Place) {
    if (this.isUser()) {
      // when user-places component instance - delete a place from user-places
      this.httpClient
        .delete<Place[]>(this.url + 'user-places/' + place.id) // as params
        .subscribe({
          next: (res) => this.placesService.userPlaces.set(res),
        });
    } else {
      // when main component instance for all places - adds a place to user-places
      this.httpClient
        .put<Place[]>(this.url + 'user-places', { placeId: place.id }) // as body
        .subscribe({
          next: (res) => // delayed: instant updates cause FS hosted images to fail to load
            setTimeout(() => this.placesService.userPlaces.set(res), 100),
        });
    }
  }
}
