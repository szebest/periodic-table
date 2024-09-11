export type PeriodicElement = {
  name: string;
  position: number;
  weight: number;
  symbol: string;
};

export type PeriodicDataElement = PeriodicElement & { id: number };
