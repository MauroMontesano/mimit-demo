import { FilterBase } from '@engular/base-models';

export interface FilterPrefences {
  id?: number;
  name: string;
  filterStatus: FilterBase[];
  preset?: boolean;
}
