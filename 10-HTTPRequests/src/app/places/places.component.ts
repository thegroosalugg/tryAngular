import { Component, input, output } from '@angular/core';
import { Place } from './place.model';

@Component({
     selector: 'app-places',
      imports: [],
  templateUrl: './places.component.html',
     styleUrl: './places.component.scss',
})
export class PlacesComponent {
       places = input.required<Place[]>();
  selectPlace = output<Place>();

  onSelectPlace(place: Place) {
    this.selectPlace.emit(place);
  }
}
