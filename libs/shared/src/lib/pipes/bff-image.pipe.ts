import { HttpClient, HttpHeaders } from '@angular/common/http';

import { bffBuilder, EafStorageService } from '@webkit/shared';
import { map, Observable, of, tap } from 'rxjs';

import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { Unsubscribable } from 'rxjs';

@Pipe({
  name: 'bffimage',
})
export class BffImagePipe implements PipeTransform {
  private _ref: ChangeDetectorRef | null;
  private _latestValue: any = null;
  private id: string | undefined;
  private _subscription: Unsubscribable | null = null;
  private AUTH_USER: string | null;
  private AUTH_SERVICE: string | null;

  constructor(private http: HttpClient, ref: ChangeDetectorRef, private storage: EafStorageService) {
    this._ref = ref;
    this.AUTH_USER = localStorage.getItem('dev_auth_user');
    this.AUTH_SERVICE = localStorage.getItem('dev_auth_service');
  }

  transform(bffkey: string, ...args: string[]): Observable<any> {
    const url = bffkey;
    const id = args[0] || 'ID_NON_PASSATO_NEL_HTML';
    const bff = new bffBuilder(url, 'GET', this.http).addPathParams('idFoto', id);

    const extra: any = { responseType: 'blob' };
    if (this.AUTH_USER && this.AUTH_SERVICE) {
      let httpHeaders = new HttpHeaders();
      httpHeaders = httpHeaders.set('AUTH_USER', this.AUTH_USER).set('AUTH_SERVICE', this.AUTH_SERVICE);
      extra.headers = httpHeaders;
    }
    const buffer = this.storage.getTempItem(`bffImage-${id}`);
    if (buffer) {
      return of(buffer);
    }
    const obs = bff.call(extra).pipe(
      map((response) => {
        const urlImage = URL.createObjectURL(response);
        this.storage.setTempItem(`bffImage-${id}`, urlImage);
        return urlImage;
      }),
      tap(() => {
        // console.log('img', response);
      })
    );
    return obs;
    /* console.log('bff', bffkey, args, bff);
    if (!this.id) {
      if (id) {
        this._subscribe(id, obs);
        this.id = id;
      }
      return this._latestValue;
    }

    if (id !== this.id) {
      this._dispose();
      return this.transform(bffkey, ...args);
    }

    return this._latestValue;*/
  }

  ngOnDestroy(): void {
    if (this._subscription) {
      this._dispose();
    }

    this._ref = null;
  }

  private _subscribe(id: string, obs: Observable<any>): void {
    this._subscription = obs.subscribe((value: any) => {
      this._updateLatestValue(id, value);
    });
  }

  private _dispose(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
    this._latestValue = null;
    this._subscription = null;
    this.id = undefined;
  }

  private _updateLatestValue(id: any, value: any): void {
    if (id === this.id) {
      // console.log('update bff',value)
      if (typeof value != 'string') {
        //    console.log('non è una stringa')
        this._latestValue = URL.createObjectURL(value);
      } else {
        this._latestValue = value;
      }
      if (this._ref) {
        this._ref.markForCheck();
        //  console.log('si ci passa')
      }
    }
  }
}
