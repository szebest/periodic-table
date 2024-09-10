import { inject, Injectable } from '@angular/core';
import { rxState } from '@rx-angular/state';

import { PeriodicElementApiService } from './api';
import { PeriodicElement } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PeriodicElementDataService {
  private periodicElementApi = inject(PeriodicElementApiService);

  private readonly state = rxState<{
    periodicElements: PeriodicElement[] | null;
  }>(({ set, connect }) => {
    set({ periodicElements: null });
    connect('periodicElements', this.periodicElementApi.getPeriodicElements());
  });

  readonly periodicElements = this.state.signal('periodicElements');
}
