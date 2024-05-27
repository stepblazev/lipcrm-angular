import { lastValueFrom } from 'rxjs';
import { CsrfRepository } from './shared/repositories/csrf.repository';

export function initializeApp(csrfRepository: CsrfRepository) {
  return async () => {
    // получаем CSRF токен в куки (далее обрабатываем в интерцепторе)
    await lastValueFrom(csrfRepository.getCSRF());
    console.log('CSRF токен получен!');
  };
}
