import { ActionItem } from '@engular/base-models';

export class MultiModalOptions {
  title?: string;
  headerActions?: ActionItem[];
  buttons?: ActionItem[];
  size?: string;
  staticBackdrop?: boolean;
  customTemplate?: boolean;
  confirmation?: boolean;
  onClose?: (id?: string) => any;
  onCancel?: () => any;
  onConfirm?: () => any;
}
