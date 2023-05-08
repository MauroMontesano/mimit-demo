import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export abstract class PermissionService {
  /**
   * Channel used to notify/subscribe to permissions changes
   */
  protected notify = new BehaviorSubject({});

  /**
   * Return an observable for permission changes:
   * every time the owned permissions change this will return a new boolean
   * that says if the owned permissions match with the permissions asked to be checked
   * @param permissions Permissions to be checked against the owned ones
   */
  public hasPermissionsAsObservable(permissions: string | Array<string>): Observable<boolean> {
    return this.notify.pipe(map(() => this.hasPermissions(permissions)));
  }

  /**
   * Change the owned permissions and notify of the change
   * @param newOwnedPermissions New permissions that are owned by the user
   */
  public changeOwnedPermissions(newOwnedPermissions: any): Observable<any> {
    let updatedPermissions = this.updateOwnedPermissions(newOwnedPermissions);

    if (!(updatedPermissions instanceof Observable)) {
      updatedPermissions = of(updatedPermissions);
    }

    return updatedPermissions.pipe(tap(() => this.notify.next({})));
  }

  /**
   * This will implement the logic of permissions' changes.
   * It has the function to update the current user (in any way it was implemented)
   * @param newOwnedPermissions User's new permissions
   */
  protected abstract updateOwnedPermissions(newOwnedPermissions: any): Observable<any> | any;

  /**
   * This has to check if the current user has the permissions asked to be checked
   * @param permissions Permissions to be checked against the owned ones
   */
  abstract hasPermissions(permissions: string | Array<string> | undefined): boolean;
}
