export const BASE_URL: string = '';
export const API_URL: string = '/api/v1';

export const LOCAL_STORAGE_KEYS = {
  MENU: '@MENU_SIZE',
  USER: '@CURRENT_USER',
  AUTHORIZED: '@AUTHORIZED',

  // FIXME будет удалено в дальнейшем
  VEHICLES: '@VEHICLES',
  DRIVERS: '@DRIVERS',
  ASSETS: '@ASSETS',
};

export const AUTH_CONFIG = {
  PASSWORD: { MIN_LENGTH: 8, MIN_PATTERN: /[a-zA-Z0-9]{8}/ },
};
