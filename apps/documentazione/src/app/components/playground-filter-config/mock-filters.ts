import { FilterText } from '@engular/base-models';

export const MOCK_FILTERS = [
  new FilterText('firstId', 'firstDto', { advancedFilter: true }),
  new FilterText('secondId', 'secondDto', { advancedFilter: true }),
  new FilterText('thirdId', 'thirdDto', { advancedFilter: true }),
  new FilterText('fourthId', 'fourthDto', { advancedFilter: false }),
  new FilterText('fifthId', 'fifthDto', { advancedFilter: false }),
  new FilterText('sixthId', 'sixthDto', { advancedFilter: true }),
  new FilterText('seventh', 'firstDto', { advancedFilter: true }),
  new FilterText('eighth', 'secondDto', { advancedFilter: true }),
  new FilterText('nineth', 'thirdDto', { advancedFilter: true }),
  new FilterText('tenth', 'fourthDto', { advancedFilter: false }),
  new FilterText('eleventh', 'fifthDto', { advancedFilter: false }),
  new FilterText('twelveth', 'sixthDto', { advancedFilter: true }),
  new FilterText('thirteenth', 'firstDto', { advancedFilter: true }),
  new FilterText('fourteenth', 'secondDto', { advancedFilter: true }),
  new FilterText('fifteenth', 'thirdDto', { advancedFilter: true }),
  new FilterText('sixteenth', 'fourthDto', { advancedFilter: false }),
  new FilterText('seventeenth', 'fifthDto', { advancedFilter: false }),
  new FilterText('eighteenth', 'sixthDto', { advancedFilter: true }),
];
