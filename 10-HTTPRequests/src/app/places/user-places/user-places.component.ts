import { Component, inject, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { HttpClient } from '@angular/common/http';

@Component({
     selector: 'app-user-places',
  templateUrl: './user-places.component.html',
     styleUrl: './user-places.component.scss',
      imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent {
  private httpClient = inject(HttpClient);
  places = signal<Place[]>([]);

  ngOnInit() {
    // httpClient is an Observer object
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    this.httpClient.get<Place[]>('http://localhost:3000/user-places').subscribe({
      // observed .get data is returned here
      next: (res) => this.places.set(res),
    });
  }
}
