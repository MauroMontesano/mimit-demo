import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { EafMessageService } from '@webkit/shared';
import { filter, map, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class FunctionGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private messageService: EafMessageService) {}

  /**
   * Protects the children's routes of a module from unauthorized access.
   * @param route
   * @param state
   * @returns
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authService.getUser().pipe(
      filter((user) => {
        return !!user;
      }),
      map((user) => {
        if (!user) {
          return false;
        }
        const check = this.authService.hasPermissions(route.data['roles']);
        if (!check) {
          this.messageService.error('Utente non autorizzato');
        }
        return check;
      })
    );
  }
}
