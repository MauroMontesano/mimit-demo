import { Injectable } from '@angular/core';
import { LoggerService } from '@engular/logger';

const log = LoggerService.getLogger('Storage Service');
/*				________________________
				| |"""""""""""""""""""| |
				|.|___________________|H|
				| |___________________| |
				| |___________________| |
				| |___________________| |
				| |___________________| |
				| |___________________| |
				|                       |
				|    ____________       |
				|   |   |  _     |      |
				|   |   | | |    |      |
				|   |   | |_|    |   V  |
				|___|___|________|______|
*/
/**
 *
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  protected static PREFERENCES_PREFIX = 'engular-';

  /**
   * Variable where the data will stored temporarily
   *
   */
  private tempStorage: any;

  /**
   * Variable where the preference will stored permanent
   *
   */
  private preferences: any;

  private popMemory: any;

  constructor() {
    log.info('Initialize the service');
    this.tempStorage = {};
    this.preferences = {};

    const preferencesKeys: string[] = [];
    let key: string;
    // Look for keys from this application (they have our prefix)
    for (let i = 0; i < localStorage.length; i++) {
      key = localStorage.key(i)!;
      if (key.startsWith(StorageService.PREFERENCES_PREFIX)) {
        preferencesKeys.push(key);
      }
    }
    log.info(`Loaded ${preferencesKeys.length} preferences`);
    // Load existing preferences
    for (const pref of preferencesKeys) {
      this.preferences[pref] = JSON.parse(localStorage.getItem(pref)!);
      log.debug(`Load`, pref, this.preferences[pref]);
    }
  }
  private static customizeKey(key: string): string {
    return StorageService.PREFERENCES_PREFIX + key;
  }

  /**
   * Save the value in a temporarily storage
   * @param  key   key.
   * @param     value Object to store
   */
  public setTempItem(key: string, value: any): void {
    this.tempStorage[key] = value;
  }

  /**
   * Get the value of previous stored object
   * @param   key key
   * @return         Object
   */
  public getTempItem(key: string): any {
    return this.tempStorage[key];
  }

  /**
   * Delete temporarily object
   * @param   key
   * @return
   */
  public deleteTempItem(key: string): boolean {
    return delete this.tempStorage[key];
  }

  public setPreference(key: string, value: any): void {
    if (!key) {
      throw Error('You passed an invalid key to set!');
    }
    if (!value) {
      return;
    }
    key = StorageService.customizeKey(key);
    this.preferences[key] = value;
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getPreference(key: string): any {
    key = StorageService.customizeKey(key);
    return this.preferences[key];
  }

  public deletePreference(key: string): boolean {
    if (!key) {
      throw Error('You passed an invalid key to delete!');
    }
    key = StorageService.customizeKey(key);
    if (key in this.preferences) {
      delete this.preferences[key];
      localStorage.removeItem(key);
      return true;
    } else {
      return false;
    }
  }

  public push(obj: any) {
    this.popMemory = obj;
  }

  public pop(): any {
    const final = this.popMemory;
    this.popMemory = undefined;
    return final;
  }
}
