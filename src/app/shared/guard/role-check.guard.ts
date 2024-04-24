import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../../core/service/login.service';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';

export function roleCheckGuard(...roles: string[]): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let loginService = inject(LoginService);
    let toastr = inject(ToastrService);

    let result = loginService.roles.find(role => roles.find(otherRole => otherRole === role) != undefined) != undefined;
    if (!result) {
      toastr.error('Your roles are not available for this page.');
    }
    return result;
  }
};
