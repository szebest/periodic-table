import { Component, computed, effect, input } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PeriodicElement } from '../../models';

@Component({
  selector: 'app-periodic-elements-table',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './periodic-elements-table.component.html',
  styleUrl: './periodic-elements-table.component.scss',
})
export class PeriodicElementsTableComponent {
  readonly data = input.required<PeriodicElement[] | null>();
  readonly filter = input<string>();

  readonly displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  readonly dataSource = computed(() => {
    const data = this.data();
    if (!data) return null;

    return new MatTableDataSource(data);
  });

  constructor() {
    effect(() => {
      const dataSource = this.dataSource();
      const filter = this.filter();

      if (!dataSource || filter === undefined) return;

      dataSource.filter = filter;
    });
  }
}
