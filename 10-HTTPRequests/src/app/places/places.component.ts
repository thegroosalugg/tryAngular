import { Component, inject, input, output, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

@Component({
     selector: 'app-places',
      imports: [],
  templateUrl: './places.component.html',
     styleUrl: './places.component.scss',
})
export class PlacesComponent {
  private httpClient = inject(HttpClient);
  isUser = input<boolean>(false);
  select = signal<Place | null>(null);
  places = signal<Place[]>([]);

  ngOnInit() { // httpClient is an Observer object
    const endPoint = `${this.isUser() ? 'user-' : ''}places`
    // .get can receive 2nd config arg => { observe: 'response' | 'event }
    this.httpClient.get<Place[]>('http://localhost:3000/' + endPoint).subscribe({
      // observed .get data is returned here
      next: (res) => this.places.set(res)
    });
  }

  onSelect(place: Place) {
    this.select.set(place);
    console.log(place);
  }
}
