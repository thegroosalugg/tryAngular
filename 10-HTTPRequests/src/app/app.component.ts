import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { PlacesComponent } from './places/places.component';
@Component({
     selector: 'app-root',
      imports: [PlacesComponent],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '10-HTTPRequests';
}
