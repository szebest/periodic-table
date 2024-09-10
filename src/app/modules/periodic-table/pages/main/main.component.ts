import { Component, inject } from '@angular/core';

import { PeriodicElementDataService } from '../../services';
import { PeriodicElementsTableComponent } from '../../components';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PeriodicElementsTableComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  private readonly periodicElementsData = inject(PeriodicElementDataService);

  periodicElements = this.periodicElementsData.periodicElements;
}
