import { Component, computed, inject, input } from '@angular/core';
import { Place } from './place.model';
import { PlacesService } from './places.service';

@Component({
     selector: 'app-places',
      imports: [],
  templateUrl: './places.component.html',
     styleUrl: './places.component.scss',
})
export class PlacesComponent {
      isUser = input<boolean>(false);
  placesServ = inject(PlacesService);
      places = computed(() =>
    this.isUser() ? this.placesServ.user() : this.placesServ.all()
  );

  ngOnInit() {
    this.placesServ.load(this.isUser()).subscribe();
  }

  onSelect(place: Place) {
    if (this.isUser()) {
      // when user-places component instance - delete a place from user-places
      this.placesServ.remove(place).subscribe();
    } else {
      // when main component instance for all places - adds a place to user-places
      this.placesServ.add(place).subscribe();
    }
  }
}
