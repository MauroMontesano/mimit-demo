import { Injectable } from '@angular/core';
import { StorageService } from '@engular/core-services';

@Injectable({
  providedIn: 'root',
})
export class EafStorageService extends StorageService {
  protected static override PREFERENCES_PREFIX = 'eaf-';
}
