import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { TOASTR_CONFIG } from './toastr.config';
import { CSRFInterceptor } from './interceptors/csrf-interceptor.interceptor';
import { initializeApp } from './app.init';
import { CsrfRepository } from './shared/repositories/csrf.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([CSRFInterceptor])),
    provideAnimations(),
    provideToastr(TOASTR_CONFIG), 
    { provide: MAT_DATE_LOCALE, useValue: 'ru' },
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [CsrfRepository], multi: true },
  ],
};
