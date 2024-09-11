import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import { EditCellDialogInput } from '../../models';

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './edit-cell-dialog.component.html',
  styleUrl: './edit-cell-dialog.component.scss',
})
export class ModifyCellDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ModifyCellDialogComponent>);
  readonly data = inject<EditCellDialogInput>(MAT_DIALOG_DATA);
  readonly value = model(this.property);

  get property() {
    return this.data.periodicElement[this.data.propertyName];
  }

  get inputType() {
    return typeof this.property === 'number' ? 'number' : 'text';
  }

  get stepAmount() {
    if (this.inputType === 'number')
      // Get the number of decimal places and convert it into the step property
      // Ex. 1.1 would result in pow(0.1, 1) => 0.1
      return Math.pow(
        0.1,
        (this.property as number).toString().split('.')[1]?.length ?? 0
      );

    return null;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    // Parse the input value as float if the type is number
    const value =
      this.inputType === 'number' ? parseFloat(this.value().toString()) : this.value();

    this.dialogRef.close({
      ...this.data.periodicElement,
      [this.data.propertyName]: value,
    });
  }
}
