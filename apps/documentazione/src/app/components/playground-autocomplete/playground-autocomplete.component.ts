import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { ActionItem, TooltipModel } from '@engular/base-models';
import { EafForm } from '@engular/forms-base';
import { ErrorLabelConstants } from '@engular/forms-errors';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'eaf-playground-autocomplete',
  templateUrl: './playground-autocomplete.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PlaygroundAutocompleteComponent implements OnInit {
  form: EafForm;
  errorLabels = {};

  tooltip = new TooltipModel('Test content', undefined, 'Test title');
  options: any[];
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
  @ViewChild('prova') templProva: any;
  item: { label: string; value: string };

  /**
   * @description Create a new Template for redesign list of Autocomplete
   * @param item:string
   * @return a templeate for redisign "li" of list
   */
  myRender = (item: any) => {
    return (
      '<a style="display: block">' +
      'Label: ' +
      item.label +
      ' Value: ' +
      item.value +
      '<br>' +
      ' ' +
      ' Numero Doc: ' +
      item.option.value.numeroDoc +
      '</a>'
    );
  };

  constructor(private fb: UntypedFormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.options = [
      { label: 'First label', value: { label: 'First label', value: 1 } },
      { label: 'Second label', value: { label: 'Second label', value: 2 } },
      { label: 'Third label', value: { label: 'Third label', value: 3 } },
      { label: 'Fourth label', value: { label: 'Fourth label', value: 4 } },
      { label: 'Fifth label', value: { label: 'Fifth label', value: 5 } },
      { label: 'Sixth label', value: { label: 'Sixth label', value: 6 } },
      { label: 'Seventh label', value: { label: 'Seventh label', value: 7 } },
    ];
    this.errorLabels['required'] = [ErrorLabelConstants.REQUIRED];
    this.errorLabels['local'] = [ErrorLabelConstants.REQUIRED];
    this.tooltip = new TooltipModel('TOOLTIP.TEST.DESCRIPTION', undefined, 'TOOLTIP.TEST.TITLE');
    this.form = new EafForm(
      this.fb.group({
        actions: [''],
        local: [this.options[0], Validators.required],
        required: ['', Validators.required],
        tooltip: [''],
      })
    );
  }

  remoteCallRequired = (key: any): Observable<any[]> => {
    let url = 'http://localhost:3000/tipologia?size=10';
    if (key) {
      url += '&descrizione=' + key;
    }
    return this.http.post(url, undefined).pipe(
      delay(1000),
      map((response) => {
        console.error('response', response);
        return response['content'].map((res: any) => {
          return {
            label: res['descrizione'],
            value: res,
          };
        });
      })
    );
  };

  remoteCallTooltip = (key: any): Observable<any[]> => {
    let url = 'http://localhost:3000/tipologia?size=10';
    if (key) {
      url += '&descrizione=' + key;
    }
    return this.http.post(url, undefined).pipe(
      delay(1000),
      map((response) => {
        console.error('response', response);
        return response['content'].map((res: any) => {
          return {
            label: res['descrizione'],
            value: res,
          };
        });
      })
    );
  };

  remoteCallActions = (key: any): Observable<any[]> => {
    let url = 'http://localhost:3000/tipologia?size=10';
    if (key) {
      url += '&descrizione=' + key;
    }
    return this.http.post(url, undefined).pipe(
      delay(1000),
      map((response) => {
        console.error('response', response);
        return response['content'].map((res: any) => {
          return {
            label: res['descrizione'],
            value: res,
          };
        });
      })
    );
  };
}
