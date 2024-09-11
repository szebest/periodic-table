import { Component, input, output } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  value = input<string>();

  filterChange = output<string>();

  onFilterChange(event: Event) {
    if (!event.target) return;

    const target = event.target as HTMLInputElement;
    this.filterChange.emit(target.value);
  }
}
