// import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ErrorMessage } from '@engular/base-models';
// import { MessageService } from '@engular/core-services';
// // import { LoggerService } from '@engular/logger';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { EafConfigurationService } from './eaf-configuration.service';

// @Injectable()
// export class EafHttpInterceptor implements HttpInterceptor {
//   // log = LoggerService.getLogger('HeaderInjectInterceptor');
//   constructor(
//     private configurationService: EafConfigurationService,
//     private messageService: MessageService, // private caricaLogger: LoggerService,
//   ) {}

//   excludePath = ['i18n', 'menu'];

//   private isValidRequestForInterceptor(requestUrl: string): boolean {
//     for (const address of this.excludePath) {
//       if (requestUrl.indexOf(address) >= 0) {
//         return false;
//       }
//     }
//     return true;
//   }
//   /**
//    * Intercepts http requests from the application to add a JWT auth token to the Authorization header if the user is logged in
//    * @param request
//    * @param next
//    */

//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // this.log.debug('intercept', request.url);
//     // const newHeaders = request.headers;

//     if (!this.isValidRequestForInterceptor(request.url)) {
//       return next.handle(request);
//     }

//     // // add header: XSRFToken
//     // const sedeRuolo = this.authorizationService.getUserProfile();
//     // if (sedeRuolo) {
//     // 	newHeaders = newHeaders.delete('X-INAIL-DATA');
//     // 	newHeaders = newHeaders.set('X-INAIL-DATA', sedeRuolo.sede + '|' + sedeRuolo.role);
//     // }

//     // create new request with these new header
//     // if (this.authService.accessToken) {
//     //   request = request.clone({
//     //     headers: request.headers.set('Authorization', `Bearer ${this.authService.accessToken} `),
//     //   });
//     // }

//     console.log('*******', request);

//     return next.handle(request).pipe(
//       catchError((err: HttpErrorResponse) => {
//         return throwError(this.manageError(err));
//       })
//     );
//   }

//   manageError(httpError: HttpErrorResponse) {
//     const error = new ErrorMessage('error');
//     switch (httpError.status) {
//       case 0:
//         error.code = 0;
//         error.errorList = [];
//         error.title = 'Problema con la connessione!';
//         error.message =
//           "C'è un problema con la connessione verso i server. Riprova più tardi. Se il problema persiste contattare l'assistenza (url: " +
//           httpError.url +
//           ')';
//         error.url = httpError.url || '';
//         if (!this.configurationService.isDevelopMode()) {
//           this.messageService.throwMessage(error);
//         }

//         return;

//       case 401:
//       case 403:
//         // this.authService.logout();
//         break;
//       default:
//         if (httpError.error) {
//           error.code = httpError.error.statusCode;
//           error.errorList = httpError.error.errors;
//           error.title = httpError.error.message;
//           error.message = !httpError.error.errors || httpError.error.errors.length === 0 ? httpError.error.message : '';
//           error.url = httpError.error.url;
//         } else {
//           error.code = httpError.status;
//           error.title = httpError.statusText;
//           error.message = httpError.message;
//           error.url = httpError.url || '';
//         }
//     }
//     if (this.configurationService.get('developMode_errorAdvisor')) {
//       setTimeout(() => {
//         if (!error.isManaged()) {
//           // this.messageService.throwMessageSimple(
//           // 	"Hey!!! Remember to handle all errors!!! look at the console to find out which error you didn't manage!",
//           // 	MessageType.ERROR_BLOCK,
//           // 	undefined,
//           // 	'EHI! You are not a good developer!',
//           // );
//           this.messageService.throwMessage(error);
//         }
//       }, 2000);
//     }
//     return error;
//   }
// }
