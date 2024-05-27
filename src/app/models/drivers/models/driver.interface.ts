export interface IDriver {
  id: number;
  login: string;
  first_name: string;
  last_name: string;
  birth_date: Date;
  phone: string;
  email: string;
  license_type: string;
  license_number: string;
  license_expire_date: Date;
}
