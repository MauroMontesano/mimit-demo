import { Injectable } from '@angular/core';
import { FilterBase } from '@engular/base-models';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FilterPrefences } from '../model/filter-preferences';
@Injectable({
  providedIn: 'root',
})
export class FilterMangerService {
  constructor() {
    //non faccio nulla
  }

  addPreference(
    searchName: string,
    name: string,
    filter: FilterBase[],
    isPreset: boolean,
    isRewrite: boolean = false,
    idFilter?: number
  ): Observable<FilterPrefences> {
    this.notifyUseOfDummySevice();

    const tmp: FilterPrefences = { name: name, filterStatus: filter, preset: isPreset };
    localStorage.setItem('EAF_SEARCH_' + searchName + '_' + name, JSON.stringify(tmp));

    return of(tmp).pipe(delay(2000));
  }

  deletePreference(searchName: string, preferenceToDelete: FilterPrefences): Observable<boolean> {
    this.notifyUseOfDummySevice();
    localStorage.removeItem('EAF_SEARCH_' + searchName + '_' + preferenceToDelete.name);
    return of(true).pipe(delay(500));
  }

  loadPreferences(searchName: string): Observable<FilterPrefences[]> {
    const preferences: FilterPrefences[] = [];
    this.notifyUseOfDummySevice();
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        if (key.startsWith('EAF_SEARCH_' + searchName)) {
          const stringKey = JSON.parse(localStorage.getItem(key) as string);
          preferences.push(stringKey);
        }
      }
    }
    return of(preferences).pipe(delay(2000));
  }

  private notifyUseOfDummySevice() {
    console.log(
      '%cEhi!',
      'color:red;font-family:system-ui;font-size:1.5rem;-webkit-text-stroke: 1px black;font-weight:bold'
    );
    console.log(
      `%c!
    In your lazy loading module or app module You have to implement your version of FilterMangerService. So create a service that extend that, override loadPreference and addPreference methods and
    in the module provide section write:

    {
      provide: FilterMangerService,
      useClass: MYFilterMangerService,
    }

    or
    {
      provide: FilterMangerService,
      useExisting: MYFilterMangerService,
    }


    `,
      'color:red;font-family:system-ui;font-size:0.7rem;'
    );
  }
}
