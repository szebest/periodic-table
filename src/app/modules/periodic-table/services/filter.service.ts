import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  BehaviorSubject,
  debounce,
  distinctUntilChanged,
  filter,
  map,
  skip,
  startWith,
  tap,
  timer,
} from 'rxjs';

export const FILTER_QUERY_PARAMS_NAME = 'filter';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly filterValue = new BehaviorSubject<string | null>(
    this.activatedRoute.snapshot.queryParamMap.get(FILTER_QUERY_PARAMS_NAME) ?? ''
  );

  private readonly filterValue$ = this.filterValue.asObservable();

  readonly currentFilterValue = toSignal(this.filterValue$);

  readonly filter = toSignal(
    this.filterValue$.pipe(
      // If the value of the filter is null, then do not debounce the input, otherwise debounce it by 2000ms
      debounce((x) => (x === null ? timer(0) : timer(2000))),
      // When the filter changes, update the url
      tap(
        (filter) =>
          filter !== null &&
          this.router.navigate([], {
            queryParamsHandling: 'merge',
            relativeTo: this.activatedRoute,
            queryParams: {
              [FILTER_QUERY_PARAMS_NAME]: filter.length > 0 ? filter : null,
            },
          })
      ),
      startWith(this.filterValue.value),
      distinctUntilChanged()
    )
  );

  constructor() {
    // If the url changes and it is different from the current filter then proceed to update the filter
    this.activatedRoute.queryParamMap
      .pipe(
        map((x) => x.get(FILTER_QUERY_PARAMS_NAME)),
        skip(1),
        filter((x) => x !== this.filterValue.value),
        tap((x) => this.filterValue.next(x)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  updateFilter(filter: string) {
    this.filterValue.next(filter);
  }
}
