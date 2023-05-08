import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, RouterStateSnapshot } from '@angular/router';
import { MessageType } from '@engular/base-models';
import { MessageService } from '@engular/core-services';
import { PermissionService } from './permission.service';

@Injectable({ providedIn: 'root' })
export class PermissionGuard implements CanActivateChild {
  constructor(private permissionService: PermissionService, private messageService: MessageService) {}

  /**
   * Protects the children's routes of a module from unauthorized access.
   * @param route
   * @param state
   * @returns
   */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const check = this.permissionService.hasPermissions(route.data['roles']);
    if (!check) {
      this.messageService.throwMessageSimple('MESSAGES.NO_AUTHORIZED', MessageType.ERROR_BLOCK);
    }
    return check;
  }
}
