import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { inject } from '@angular/core';
import { catchError, tap, finalize} from 'rxjs';
import { NotificationService } from '../services/notification/notification.service';
import { LoadingService } from '../services/loading/loading.service';

const urlIgnore = ['/api/PatientSignUp/SignUp', '/api/Authentication/Login'];

type ApiError = {
  Data: null,
  HttpStatus: number,
  Messages: string,
}

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(LoginService);
  const notification = inject(NotificationService);
  const loading = inject(LoadingService);

  const token = tokenService.getToken();
  loading.show();

  const newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (urlIgnore.includes(req.url)){
    return next(req).pipe(
      tap((value) => {
        if(value instanceof HttpResponse) {
          const apiError = value.body as ApiError;
          if (apiError.HttpStatus && apiError.HttpStatus !== 200){
            throw apiError;
          }
        }
      }),
      catchError((error) => {
        if ('HttpStatus' in error) {
          notification.showNotification(error.Messages);
        }
        else if (error.error)  {
          const messages = Object.values(error.error.errors).flat().join('\n');
          notification.showNotification(messages);
        }    
        else {
          notification.showNotification('Please fill the fields correctly');
        }
        throw 'Error';
      }),
      finalize(() => loading.hide())
    );
  }

  return next(newRequest).pipe(
    tap((value) => {
      if (value instanceof HttpResponse) {
        const apiError = value.body as ApiError;
        if (apiError.HttpStatus && apiError.HttpStatus !== 200) {
          throw apiError;
        }
      }
    }),
    catchError((error) => {
      if ('HttpStatus' in error) {
        notification.showNotification(error.Messages);
      }
      else if ('status' in error && 'errors' in error)  {
        const messages = Object.values(error.type.errors).flat().join('\n');
        notification.showNotification(messages);
      }
      else if (error.status === 401) {
        tokenService.logout();
      }  
      throw 'Error';
    }),
    finalize(() => loading.hide())
  );
};
