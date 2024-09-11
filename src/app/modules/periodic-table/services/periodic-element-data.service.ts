import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { rxState } from '@rx-angular/state';

import { PeriodicElementApiService } from './api';
import { PeriodicDataElement } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PeriodicElementDataService {
  private periodicElementApi = inject(PeriodicElementApiService);

  private readonly state = rxState<{
    periodicElements: PeriodicDataElement[] | null;
  }>(({ set, connect }) => {
    set({ periodicElements: null });
    connect(
      'periodicElements',
      this.periodicElementApi
        .getPeriodicElements()
        .pipe(map((x) => x.map((element, id) => ({ ...element, id }))))
    );
  });

  readonly periodicElements = this.state.signal('periodicElements');

  editPeriodicElement(element: PeriodicDataElement) {
    this.state.set(({ periodicElements }) => {
      if (!periodicElements) return { periodicElements: null };

      return {
        periodicElements: periodicElements.map((x) => {
          if (element.id === x.id) return element;

          return x;
        }),
      };
    });
  }
}
