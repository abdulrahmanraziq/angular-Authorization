import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { authInterceptor } from './auth.interceptor';

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useFactory: () => authInterceptor, // Use factory instead of useValue
  multi: true,
};
