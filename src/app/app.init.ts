import { lastValueFrom } from 'rxjs';
import { CsrfRepository } from './shared/repositories/csrf.repository';
import { ToastrService } from 'ngx-toastr';

export function initializeApp(
  csrfRepository: CsrfRepository,
  toastrService: ToastrService
) {
  return async () => {
    try {
      // получаем CSRF токен в куки (далее обрабатываем в интерцепторе)
      await lastValueFrom(csrfRepository.getCSRF());
      console.log(
        '%cCSRF токен получен!',
        'color: green; font-weight: bold; font-size: 14px;'
      );
    } catch (error) {
      console.log(
        '%cОшибка получения CSRF токена...',
        'color: red; font-weight: bold; font-size: 14px;'
      );
      toastrService.error('Ошибка получения CSRF токена...', undefined, {
        timeOut: 10000,
      });
    }
  };
}
