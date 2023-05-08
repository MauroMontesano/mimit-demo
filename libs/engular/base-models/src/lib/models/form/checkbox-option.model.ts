import { RadioOption } from './radio-option.model';
export class CheckboxOption extends RadioOption {
  private _checked: boolean = false;

  static override fromIdValueArray(array: { id: number; value: string }[]) {
    const final: any[] = [];
    array.forEach((e) => {
      final.push(new CheckboxOption(e.value, e.id));
    });
    return final;
  }

  public get checked(): boolean {
    return this._checked;
  }

  public set checked(value: boolean) {
    this._checked = value;
  }
}
