import { Injectable } from '@angular/core';
import { FilterBase } from '@engular/base-models';
import { FilterPrefences } from '@webkit/layout';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EafFilterManagerService {
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
    const tmp: FilterPrefences = { name: name, filterStatus: filter, preset: isPreset };
    localStorage.setItem('EAF_SEARCH_' + searchName + '_' + name, JSON.stringify(tmp));

    return of(tmp).pipe(delay(2000));
  }

  deletePreference(searchName: string, preferenceToDelete: FilterPrefences): Observable<boolean> {
    localStorage.removeItem('EAF_SEARCH_' + searchName + '_' + preferenceToDelete.name);
    return of(true).pipe(delay(500));
  }

  loadPreferences(searchName: string): Observable<FilterPrefences[]> {
    const preferences: FilterPrefences[] = [];

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
}
