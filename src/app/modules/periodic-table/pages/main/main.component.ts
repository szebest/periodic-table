import { Component, inject } from '@angular/core';

import { FilterService, PeriodicElementDataService } from '../../services';
import { PeriodicElementsTableComponent, FilterComponent } from '../../components';
import { PeriodicDataElement } from '../../models';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PeriodicElementsTableComponent, FilterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly periodicElementsData = inject(PeriodicElementDataService);
  private readonly filterService = inject(FilterService);

  readonly periodicElements = this.periodicElementsData.periodicElements;
  readonly filter = this.filterService.filter;
  readonly currentFilterValue = this.filterService.currentFilterValue;

  onFilterChange(filter: string) {
    this.filterService.updateFilter(filter);
  }

  onEditPeriodicElement(element: PeriodicDataElement) {
    this.periodicElementsData.editPeriodicElement(element);
  }
}
