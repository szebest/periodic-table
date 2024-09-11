import { PeriodicDataElement, PeriodicElement } from './periodic-element.model';

export type EditCellDialogInput = {
  periodicElement: PeriodicDataElement;
  propertyName: keyof PeriodicElement;
  header: string;
};
