import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../service/login.service';
import { APP_CONFIG } from '../../app.config';
import { catchError, switchMap, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let url = req.url;
  let headers = req.headers;
  let loginService = inject(LoginService);
  let toastrService = inject(ToastrService);
  let router = inject(Router);
  let appConfig: any = inject(APP_CONFIG);
  
  if (!url.startsWith('/assets/')) {
    url = appConfig.serverURL + url;
    headers = headers.append('Authorization', 'Bearer ' + loginService.token);
  }
  
  let newReq = req.clone({
    url,
    headers,
  });

  console.log(appConfig.serverURL);
  return next(newReq).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.url != appConfig.serverURL+ '/login'
           && error.url != appConfig.serverURL+ '/user/signup' && error.status == 403) {
        return loginService.relogin().pipe(
          switchMap((token: any) => {
            toastrService.info("Re-login successfully done !");
            headers = headers.set('Authorization', 'Bearer ' + loginService.token);
            newReq = newReq.clone({
              headers,
            });
            return next(newReq);
          }),
          catchError(error => {
            toastrService.error("Re-login failed !");
            loginService.logout();
            router.navigateByUrl('/');
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};