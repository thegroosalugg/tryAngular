import { DatePipe, DecimalPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

const historic = [25, 37, 19, -4, 28, 21, 19, 28, 33, 31, 9, 11, 5, -12, -5];
const current = {
   berlin: 4.2749812,
  newYork: 18.1214,
    paris: 72.1209001,
  chicago: 65.0775238,
};

@Component({
     selector: 'app-root',
      imports: [DatePipe, DecimalPipe],
  templateUrl: './app.component.html',
     styleUrl: './app.component.scss',
})
export class AppComponent {
         title = '06-Pipes';
   currentDate = signal(new Date());
  temperatures = signal({ current, historic });
  tempsCurrent = computed(() => Object.entries(this.temperatures().current));

  onReset(index: number) {
    this.temperatures().historic[index] = 18;
  }
}
