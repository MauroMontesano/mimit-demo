import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PermissionService } from '@engular/security';
import { bffBuilder, EafConfigurationService } from '@webkit/shared';
import { BehaviorSubject, filter, map, Observable } from 'rxjs';
import { SensibiliUtenteConverter } from '../converters/sensibili-utente.converter';
import { UtenteConverter } from '../converters/utente.converter';
import { SensibiliUtenteDTO } from '../dto/sensibili-utente.dto';
import { UtenteDTO } from '../dto/utente.dto';
import { UtenteModel } from '../models/utente.model';
import { SensibiliUtenteModel } from './../models/sensibili-utente.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends PermissionService {
  public permissions: string[] = [];
  public userObservable: BehaviorSubject<UtenteModel | null>;
  public datiUtenteObservable: BehaviorSubject<SensibiliUtenteModel | null>;

  constructor(private http: HttpClient, private config: EafConfigurationService) {
    super();
    this.userObservable = new BehaviorSubject<UtenteModel | null>(null);
    this.datiUtenteObservable = new BehaviorSubject<SensibiliUtenteModel | null>(null);
  }

  getLoggedUser() {
    const bff = new bffBuilder(this.config.getApi(`pa.utente.getLoggedUser`).urlComplete, 'GET', this.http);
    return bff.call<UtenteDTO>({ observe: 'response' }).pipe(
      map((dto) => {
        if (!dto.body || dto.status > 300) {
          throw new Error('Unauthorized');
        }
        const user = new UtenteConverter().convertToModel(dto.body);
        console.log('UTENTE LOGGATO', user);
        if (dto.status === 200) {
          this.changeOwnedPermissions(user.role.functionalities);
          this.userObservable.next(user);
        } else if (dto.status === 206) {
          this.userObservable.next(user);
        } else if (dto.status === 204) {
          this.userObservable.next(user || new UtenteModel());
        }
        return user;
      })
    );
  }

  getClearDatiUtente() {
    const bff = new bffBuilder(this.config.getApi(`pa.utente.getDatiUtente`).urlComplete, 'GET', this.http);
    return bff.call<SensibiliUtenteDTO>().pipe(
      map((dto) => {
        const datiUtente = new SensibiliUtenteConverter().convertToModel(dto);
        this.datiUtenteObservable.next(datiUtente);
        return datiUtente;
      })
    );
  }

  getUser(): Observable<UtenteModel | null> {
    return this.userObservable.asObservable().pipe(filter((user) => !!user));
  }

  getdatiUtente(): Observable<SensibiliUtenteModel | null> {
    return this.datiUtenteObservable.asObservable().pipe(filter((nick) => !!nick));
  }

  hasPermissions(abilitazioni: string | string[]): boolean {
    if (!Array.isArray(abilitazioni)) {
      abilitazioni = [abilitazioni];
    }
    return abilitazioni.some((a) => !!this.permissions.find((p) => p === a));
  }

  logout() {
    const exitUrl = this.config.get('exitUrl');
    window.location.href = exitUrl;
  }

  protected updateOwnedPermissions(newPermissions: string[]) {
    this.permissions = newPermissions;
    this.notify.next({});
  }
}
