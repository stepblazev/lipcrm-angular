import { BaseModel } from 'src/app/core/base-model';

export interface IPermissionProps {
  id: number;
  name: string;
  display_name: string;
}

export interface ICompanyProps {
  id: number;
  name: string;
  logo: string | null;
  employees_count: number;
  storage_limit: number;
  permissions: IPermissionProps[];
}

export class CompanyModel extends BaseModel {
  public name: string;
  public logo: string | null;
  public employees_count: number;
  public storage_limit: number;
  public permissions: IPermissionProps[];

  constructor(props: ICompanyProps) {
    super(props.id);

    this.name = props.name;
    this.logo = props.logo;
    this.employees_count = props.employees_count;
    this.storage_limit = props.storage_limit;
    this.permissions = props.permissions;
  }
  
  public getLogoUrl(): string {
    return `http://lipcrm.local/public/storage/${this.logo}`;
  }
}
