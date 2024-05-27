import { GlobalConfig } from 'ngx-toastr';

// конфигурация для всплывающих уведомлений
// https://www.npmjs.com/package/ngx-toastr#readme
export const TOASTR_CONFIG: Partial<GlobalConfig> = {
  timeOut: 3000,
  positionClass: 'toast-bottom-left',
  closeButton: true,
  newestOnTop: false,
  progressBar: true,
  progressAnimation: 'increasing',
};
