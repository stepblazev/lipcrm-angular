import { HttpInterceptorFn } from '@angular/common/http';

export const CSRFInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.withCredentials) {
    const name = 'XSRF-TOKEN=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        const csrfToken = c.substring(name.length, c.length);
        const cloned = req.clone({
          headers: req.headers.set('X-XSRF-TOKEN', csrfToken),
        });
        return next(cloned);
      }
    }
  }

  return next(req);
};
