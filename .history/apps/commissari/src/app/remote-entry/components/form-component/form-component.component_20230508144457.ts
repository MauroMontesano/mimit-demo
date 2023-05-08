import { Component, Injector, ViewEncapsulation } from '@angular/core';
import { UntypedFormGroup, Validators } from '@angular/forms';
import { ErrorMessage, Message, MessageType } from '@engular/base-models';
import { ErrorLabelsMaps, TooltipMaps } from '@engular/base-page';
import { ErrorLabelConstants } from '@engular/forms-errors';
import { TipologicaModel } from '@mimit/shared';
import { EafFormBasePageComponent } from '@webkit/base-pages';
import { CustomValidators } from '@webkit/form';
import { EafMessageService } from '@webkit/shared';
import { Observable } from 'rxjs';
import { CommissarioModel } from '../../models/commissario.model';
import { CommissarioService } from '../../services/commissario.service';

@Component({
  selector: 'mimit-form',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponentComponent extends EafFormBasePageComponent<CommissarioModel> {
  optionsOrdineProfessionale: TipologicaModel[] = [
    { id: '1', descrizione: 'AVVOCATI', _descrizioneSearch: 'AVVOCATI' },
    { id: '2', descrizione: 'COMMERICALISTI', _descrizioneSearch: 'COMMERICALISTI' },
  ];
  optionsLivelloEsperienza: TipologicaModel[] = [
    { id: '1', descrizione: 'A', _descrizioneSearch: 'A' },
    { id: '2', descrizione: 'B', _descrizioneSearch: 'B' },
    { id: '3', descrizione: 'C', _descrizioneSearch: 'C' },
  ];

  constructor(
    injector: Injector,
    private commissarioService: CommissarioService,
    private eafMessageService: EafMessageService
  ) {
    super(injector);
  }
  createForm(form: UntypedFormGroup): UntypedFormGroup {
    const appoForm = this.fb.group({
      nome: [undefined, Validators.required],
      cognome: [undefined, Validators.required],
      codiceFiscale: [undefined, Validators.required],
      PEC: [undefined, [Validators.required, CustomValidators.emailValidator]],
      domicilioProfessionale: [undefined, Validators.required],
      ordineProfessionale: [undefined, Validators.required],
      numeroIncarichi: [undefined, Validators.required],
      livelloEsperienza: [undefined, Validators.required],
    });
    for (const controlName in appoForm.controls) {
      const cdl = appoForm.get(controlName);
      if (cdl) {
        form.addControl(controlName, cdl);
      }
    }
    return form;
  }
  fillForm(form: UntypedFormGroup, model: CommissarioModel) {
    form.get('nome')?.setValue(model.nome);
    form.get('cognome')?.setValue(model.cognome);
    form.get('codiceFiscale')?.setValue(model.codiceFiscale);
    form.get('PEC')?.setValue(model.PEC);
    form.get('domicilioProfessionale')?.setValue(model.domicilioProfessionale);
    form.get('ordineProfessionale')?.setValue(model.ordineProfessionale);
    form.get('numeroIncarichi')?.setValue(model.numeroIncarichi);
    form.get('livelloEsperienza')?.setValue(model.livelloEsperienza);
    return form;
  }
  extractDataToSubmit(form: UntypedFormGroup): CommissarioModel {
    const formValue = form.value;
    const potatoreInteresse = new CommissarioModel();
    potatoreInteresse.nome = formValue.nome;
    potatoreInteresse.cognome = formValue.cognome;
    potatoreInteresse.codiceFiscale = formValue.codiceFiscale;
    potatoreInteresse.PEC = formValue.PEC;
    potatoreInteresse.domicilioProfessionale = formValue.domicilioProfessionale;
    potatoreInteresse.ordineProfessionale = formValue.ordineProfessionale;
    potatoreInteresse.numeroIncarichi = formValue.numeroIncarichi;
    potatoreInteresse.livelloEsperienza = formValue.livelloEsperienza;
    return potatoreInteresse;
  }
  rememberToCreateAndUseErrorLabels(errorLabel: ErrorLabelsMaps): ErrorLabelsMaps {
    this.errorLabels['nome'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['cognome'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['codiceFiscale'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['PEC'] = [ErrorLabelConstants.REQUIRED, ErrorLabelConstants.EMAIL_INVALID];
    this.errorLabels['domicilioProfessionale'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['ordineProfessionale'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['numeroIncarichi'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['livelloEsperienza'] = [ErrorLabelConstants.REQUIRED];
    return errorLabel;
  }
  rememberToCreateAndUseTooltips(tooltip: TooltipMaps): TooltipMaps {
    return tooltip;
  }
  protected loadModel(id: any): Observable<CommissarioModel> {
    return this.commissarioService.detail(id);
  }
  save(model: CommissarioModel): Observable<CommissarioModel> {
    return this.commissarioService.add(model);
  }
  update(model: CommissarioModel): Observable<CommissarioModel> {
    return this.commissarioService.get(model);
  }
  submitComplete(model: CommissarioModel): void {
    const successMessage = new Message('Commissario Inserito', undefined, MessageType.SUCCESS);
    this.eafMessageService.show(successMessage);
  }
  submitError(error: ErrorMessage): void {
    this.eafMessageService.error(error.message);
  }
  protected getPathKeyForTakeId(): string {
    return 'idCommissario';
  }
  pageName(): string {
    return 'eaf-form-component';
  }
  ngOnInitForChildren(): void {
    //non faccio nulla
  }
  ngOnDestroyForChildren(): void {
    //non faccio nulla
  }
}
