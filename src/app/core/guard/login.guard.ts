import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route, state) => {
  let loginService =  inject(LoginService);
  let router = inject(Router);

  if (loginService.loggedIn) {
    // giriş yapılmış ise istenen sayfanın gösterilmesine izin ver
    return true;
  } else {
    // giriş yapılmamış, izin verme ve login sayfasına yönlendir.
    router.navigate(['/']);
    return false;
  }
};