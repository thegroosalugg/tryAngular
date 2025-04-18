import { AfterContentInit, Component, computed, ContentChild, contentChild, input } from '@angular/core';

type Config = 'server' | 'traffic' | 'support';

const configMap = {
  server: {
      src: 'status.png',
      alt: 'A signal symbol',
    title: 'Server Status',
  },
  traffic: {
      src: 'globe.png',
      alt: 'A globe',
    title: 'Traffic',
  },
  support: {
      src: 'list.png',
      alt: 'A list of items',
    title: 'Support Tickets',
  },
};

@Component({
     selector: 'app-article',
      imports: [],
  templateUrl: './article.component.html',
     styleUrl: './article.component.scss',
})

export class ArticleComponent implements AfterContentInit {
     type = input.required<Config>();
   config = computed(() => configMap[this.type()]);
  // contenChild(#templateVar) to get elements rendered with <ng-content />
  content = contentChild.required('dashItem');
  // @ContentChild('dashItem') content!: Component; // @Decorator approach

  ngAfterContentInit() {
    console.log('[ARTICLE]: contentChild', this.content());
  }
}
