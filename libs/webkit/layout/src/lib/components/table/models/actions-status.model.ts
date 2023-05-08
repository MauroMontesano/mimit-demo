import { ActionItem } from '@engular/base-models';

export interface EafActionsStatus {
  visible: ActionItem[];
  drop: ActionItem[];
  hidden: ActionItem[];
}
