import { Component } from '@angular/core';
import { OfferPreviewComponent } from "../offer-preview/offer-preview.component";

@Component({
     selector: 'app-footer',
  templateUrl: './footer.component.html',
     styleUrl: './footer.component.scss',
      imports: [OfferPreviewComponent],
})

export class FooterComponent {}
