export abstract class LayoutSize {
  public abstract fromString(value: string): LayoutSize;
  public abstract toClass(): string;
}
