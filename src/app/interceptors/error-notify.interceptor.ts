import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { ObservableInput, catchError } from 'rxjs';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GloaderService } from '../shared/services/gloader.service';

// REVIEW проверить
export const ErrorNotifyInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const gloader = inject(GloaderService);

  return next(req).pipe(
    catchError<HttpEvent<unknown>, ObservableInput<HttpEvent<unknown>>>(
      (selector) => {
        const status = selector.status;

        if (![0].includes(status) && selector.error.error?.message) {
          toastr.error(selector.error.error.message); // в случае ошибки выводим уведомление (сообщение приходит от сервера)
          gloader.isLoading = false; // выключаем глобальный лоадер
        } else {
          toastr.error(req.urlWithParams); // если нет сообщения, выводим url запроса в ошибку
          gloader.isLoading = false; // выключаем глобальный лоадер
        }

        return selector;
      }
    )
  );
};
