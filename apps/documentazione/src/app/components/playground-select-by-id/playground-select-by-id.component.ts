/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActionItem, ErrorMessage, TooltipModel } from '@engular/base-models';
import { FormBasePageComponent } from '@engular/base-page';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';
import { Observable } from 'rxjs';

@Component({
  selector: 'eaf-playground-select-by-id',
  templateUrl: './playground-select-by-id.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundSelectByIdComponent extends FormBasePageComponent<any> {
  optionsList: any[] = [];
  optionsLong: any[] = [];
  groupOptionsList: any = { gruppo1: [], gruppo2: [] };
  myWrappedForm: EafForm;

  actions = [
    new ActionItem(
      'Preview',
      () => {
        alert('eye');
      },
      'eye'
    ),
    new ActionItem(
      'Delete',
      () => {
        alert('delete');
      },
      'times'
    ),
  ];

  constructor(injector: Injector) {
    super(injector);
  }

  createForm(form: any): UntypedFormGroup {
    const f = this.fb.group({
      select: [undefined, []],
      normale: [undefined, []],
      selectJust: [[2], []],
    });
    for (const controlName in f.controls) {
      // eslint-disable-next-line no-prototype-builtins
      if (f.controls.hasOwnProperty(controlName)) {
        form.addControl(controlName, f.get(controlName));
      }
    }

    form.addControl('groupOptions', new UntypedFormControl());
    form.addControl('simple', new UntypedFormControl(undefined));
    form.addControl('required', new UntypedFormControl(undefined, [Validators.required]));
    form.addControl('selectById', new UntypedFormControl([1]));
    form.addControl('multiFilterable', new UntypedFormControl([3]));
    form.valueChanges.subscribe((data: any) => {
      this.log.info('>>> NEW FORM', data);
    });
    this.myWrappedForm = new EafForm(form);
    return form;
  }

  fillForm(form: UntypedFormGroup, model: any) {
    return null;
  }

  extractDataToSubmit(form: UntypedFormGroup) {
    return form.value;
  }

  printSomething() {
    console.error('Callback function has been successfully passed...');
  }

  //end of modal part
  save(model: any): Observable<any> {
    return new Observable((observer) => {
      observer.next(model);
      observer.complete();
    });
  }

  update(model: any): Observable<any> {
    return new Observable((observer) => {
      observer.next(model);
      observer.complete();
    });
  }

  submitComplete(model: any) {
    alert('Tutto okay');
  }

  submitError(error: ErrorMessage) {
    alert('Errore');
  }

  protected loadModel(id: any): Observable<any> {
    return new Observable((observer) => {
      observer.next({ name: 'Mario', surname: 'Rossi' });
      observer.complete();
    });
  }

  protected getPathKeyForTakeId(): string {
    return '';
  }

  pageName(): string {
    return 'MultiselectPlayground';
  }

  rememberToCreateAndUseErrorLabels(err: any): any {
    return {
      name: [ErrorLabelConstants.REQUIRED],
      surname: [ErrorLabelConstants.REQUIRED],
      required: [ErrorLabelConstants.REQUIRED],
    };
  }

  rememberToCreateAndUseTooltips(tooltip: any) {
    return {
      surname: new TooltipModel(`Senza l'uso dell'18n. bla bla`, undefined, 'ma con titolo'),
      prova: new TooltipModel('TOOLTIP.PROVA.DESCRIPTION', undefined, 'TOOLTIP.PROVA.TITLE'),
    };
  }

  ngOnInitForChildren() {
    setTimeout(() => {
      this.groupOptionsList = { ...this.groupOptionsList };
      this.groupOptionsList.gruppo1.push({ id: 1, descrizione: 'uno uno' });
      this.groupOptionsList.gruppo1.push({ id: 2, descrizione: 'uno due' });
      this.groupOptionsList.gruppo2.push({ id: 3, descrizione: 'due uno' });
      this.groupOptionsList.gruppo2.push({ id: 4, descrizione: 'due due' });
      this.optionsLong = [];
      for (let index = 0; index < 2000; index++) {
        this.optionsLong.push({ id: index, descrizione: '' + index });
      }
      this.optionsList = [];
      this.optionsList.push({ id: 1, descrizione: 'uno' });
      this.optionsList.push({ id: 2, descrizione: 'due' });
      this.optionsList.push({ id: 3, descrizione: 'tre' });
      this.optionsList.push({ id: 4, descrizione: 'quattro' });
      // 		this.optionsList.push(...[
      // 			{ id: '12', descrizione: 'TEATRO' },
      // { id: '15', descrizione: 'VIDEOGRAMMI' },
      // { id: '18', descrizione: 'NOLEGGIO' },
      // { id: '19', descrizione: 'ESTERO' },
      // { id: '13', descrizione: 'TELEVISIONE' },
      // { id: '4', descrizione: 'RADIO' },
      // { id: '1', descrizione: 'EMIT.PRIVATE' },
      // { id: 'G', descrizione: 'GENERALE' },
      // { id: '7', descrizione: 'D.R.M' },
      // { id: '0', descrizione: 'FSI - MAGGIOR. RAI RF SEZ. MUSICA' }]);
    }, 2000);
    this.myWrappedForm.getFormControl('simple')?.setValue(2);
  }

  ngOnDestroyForChildren() {
    // non faccio nulla
  }

  clickOnButton = () => {
    alert('click');
  };

  reset = () => {
    this.form.reset();
  };
}
