import { TableFieldOptions, TooltipModel } from '@engular/base-models';

export interface EafTableFieldOptions extends TableFieldOptions {
  sortable?: any;
  filterable?: any;
  tooltip?: TooltipModel;
}
