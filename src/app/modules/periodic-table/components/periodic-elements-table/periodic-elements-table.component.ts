import { Component, input } from '@angular/core';

import { MatTableModule } from '@angular/material/table';
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

  readonly displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
}
