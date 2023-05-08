import { PermissionService } from './permission.service';

export class PermissionDummy extends PermissionService {
  hasPermissions(roles: any) {
    console.error(
      'You are using PermissionDummy! remember to overload with real one.\n {' +
        '\tprovide: PermissionService,' +
        '\tuseClass: PermissionXXXX,' +
        '}, '
    );
    return true;
  }

  updateOwnedPermissions(roles: any) {}
}
