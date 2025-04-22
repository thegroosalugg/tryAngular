import { Component, inject, input, output, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

const url = 'http://localhost:3000/';

@Component({
     selector: 'app-places',
      imports: [],
  templateUrl: './places.component.html',
     styleUrl: './places.component.scss',
})
export class PlacesComponent {
  private httpClient = inject(HttpClient);
  isUser = input<boolean>(false);
  places = signal<Place[]>([]);

  ngOnInit() { // httpClient is an Observer object
    const endPoint = `${this.isUser() ? 'user-' : ''}places`
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    this.httpClient.get<Place[]>(url + endPoint).subscribe({
      // observed .get data is returned here
      next: (res) => this.places.set(res),
    });
  }

  onSelect(placeId: string) {
    if (this.isUser()) {
      // delete a place from user-places
      this.httpClient
        .delete<Place[]>(url + 'user-places/' + placeId) // as params
        .subscribe({
          next: (res) => this.places.set(res),
        });
    } else {
      // when all places - adds a place to user-places
      this.httpClient
        .put<Place[]>(url + 'user-places', { placeId }) // as body
        .subscribe({
          next: (res) => console.log(res),
        });
    }
  }
}
