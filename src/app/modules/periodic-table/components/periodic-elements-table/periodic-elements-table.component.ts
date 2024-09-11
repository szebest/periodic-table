import { Component, computed, effect, inject, input, output } from '@angular/core';
import { filter, tap } from 'rxjs';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';

import { EditCellDialogInput, PeriodicDataElement, PeriodicElement } from '../../models';
import { ModifyCellDialogComponent } from '../../dialogs';

@Component({
  selector: 'app-periodic-elements-table',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule],
  templateUrl: './periodic-elements-table.component.html',
  styleUrl: './periodic-elements-table.component.scss',
})
export class PeriodicElementsTableComponent {
  readonly dialog = inject(MatDialog);

  readonly data = input.required<PeriodicElement[] | null>();
  readonly filter = input<string | null>();

  readonly editPeriodicElement = output<PeriodicDataElement>();

  readonly columns: { header: string; propertyName: keyof PeriodicElement }[] = [
    {
      header: 'Number',
      propertyName: 'position',
    },
    {
      header: 'Name',
      propertyName: 'name',
    },
    {
      header: 'Weight',
      propertyName: 'weight',
    },
    {
      header: 'Symbol',
      propertyName: 'symbol',
    },
  ];

  readonly displayedColumns = this.columns.map((c) => c.propertyName);

  // Create new mat table data source when the data input changes
  readonly dataSource = computed(() => {
    const data = this.data();
    if (!data) return null;

    return new MatTableDataSource(data);
  });

  constructor() {
    // Update the filter of the data source when the data source or the filter changes
    effect(() => {
      const dataSource = this.dataSource();
      const filter = this.filter();

      if (!dataSource) return;

      dataSource.filter = filter ?? '';
    });
  }

  editCell(data: EditCellDialogInput) {
    const dialogRef = this.dialog.open(ModifyCellDialogComponent, {
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((x: PeriodicDataElement) => this.editPeriodicElement.emit({ ...x }))
      )
      .subscribe();
  }
}
