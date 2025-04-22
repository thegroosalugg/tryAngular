import { Component, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
     selector: 'app-available-places',
  templateUrl: './available-places.component.html',
     styleUrl: './available-places.component.scss',
      imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private httpClient = inject(HttpClient);
  places = signal<Place[]>([]);

  ngOnInit() { // httpClient is an Observer object
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    this.httpClient.get<Place[]>('http://localhost:3000/places').subscribe({
      // observed .get data is returned here
      next: (res) => this.places.set(res)
    });
  }
}
