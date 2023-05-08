import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicBreadcrumbService implements Resolve<string | undefined> {
  private breadcrumb: string | undefined;

  constructor() {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string | undefined> {
    const breadcrumbOld = this.breadcrumb;
    this.breadcrumb = undefined;
    return of(breadcrumbOld);
  }

  setBreadcrumb(value: string) {
    this.breadcrumb = value;
  }
}
