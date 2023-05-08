import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorMessage, MessageType } from '@engular/base-models';
import { EafConfigurationService, EafMessageService } from '@webkit/shared';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class EafHttpInterceptor implements HttpInterceptor {
  private AUTH_USER: string | null;
  private AUTH_SERVICE: string | null;
  constructor(
    private configurationService: EafConfigurationService,
    private messageService: EafMessageService,
    private authService: AuthenticationService
  ) {
    this.AUTH_USER = localStorage.getItem('dev_auth_user');
    this.AUTH_SERVICE = localStorage.getItem('dev_auth_service');
  }

  excludePath = ['i18n', 'menu', 'https://geocode.search.hereapi.com/v1/geocode'];

  private isValidRequestForInterceptor(requestUrl: string): boolean {
    for (const address of this.excludePath) {
      if (requestUrl.indexOf(address) >= 0) {
        return false;
      }
    }
    return true;
  }
  /**
   * Intercepts http requests from the application to add a JWT auth token to the Authorization header if the user is logged in
   * @param request
   * @param next
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.log.debug('intercept', request.url);

    if (!this.isValidRequestForInterceptor(request.url)) {
      return next.handle(request);
    }

    // ADD HEADERS IF TESTING
    if (this.AUTH_USER && this.AUTH_SERVICE && this.configurationService.isDevelopMode()) {
      request = request.clone({
        headers: request.headers.set('AUTH_USER', this.AUTH_USER).set('AUTH_SERVICE', this.AUTH_SERVICE),
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(this.manageError(err));
      })
    );
  }

  manageError(httpError: HttpErrorResponse) {
    const error = new ErrorMessage('error');
    switch (httpError.status) {
      case 0:
        error.code = 0;
        error.type = MessageType.ERROR_BLOCK;
        error.errorList = [];
        error.title = 'Problema con la connessione!';
        error.message =
          "C'è un problema con la connessione verso i server. Riprova più tardi. Se il problema persiste contattare l'assistenza (url chiamata: " +
          httpError.url +
          ')';
        error.url = httpError.url || '';
        this.messageService.throwMessage(error);
        break;
      case 500:
        error.message = "C'è un problema con la connessione verso i server. Riprova più tardi.";
        error.type = MessageType.ERROR_BLOCK;
        this.messageService.throwMessage(error);
        break;
      case 401:
        error.code = 0;
        error.type = MessageType.ERROR_BLOCK;
        error.errorList = [];
        error.title = httpError.error.error;
        error.message = httpError.error.message;
        this.messageService.throwMessage(error);
        setTimeout(() => {
          this.authService.logout();
        }, 6000);
        break;
      case 403:
        error.code = 0;
        error.type = MessageType.ERROR_BLOCK;
        error.errorList = [];
        error.title = httpError.error.error;
        error.message = httpError.error.message;
        this.messageService.throwMessage(error);
        setTimeout(() => {
          this.authService.logout();
        }, 6000);
        break;
      default:
        if (httpError.error) {
          error.code = httpError.error.statusCode;
          error.errorList = httpError.error.errors;
          error.title = httpError.error.message;
          error.message = !httpError.error.errors || httpError.error.errors.length === 0 ? httpError.error.message : '';
          error.url = httpError.error.url;
        } else {
          error.code = httpError.status;
          error.title = httpError.statusText;
          error.message = httpError.message;
          error.url = httpError.url || '';
        }
    }
    if (this.configurationService.get('developMode_errorAdvisor')) {
      setTimeout(() => {
        if (!error.isManaged()) {
          // this.messageService.throwMessageSimple(
          // 	"Hey!!! Remember to handle all errors!!! look at the console to find out which error you didn't manage!",
          // 	MessageType.ERROR_BLOCK,
          // 	undefined,
          // 	'EHI! You are not a good developer!',
          // );
          this.messageService.throwMessage(error);
        }
      }, 2000);
    }
    return error;
  }
}
