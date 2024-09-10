import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

import { ELEMENT_DATA } from '../../mock';

@Injectable({ providedIn: 'root' })
export class PeriodicElementApiService {
  getPeriodicElements() {
    // Simulate call to backend with 2000ms delay
    return of(ELEMENT_DATA).pipe(delay(2000));
  }
}
