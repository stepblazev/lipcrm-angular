import { BaseModel } from 'src/app/core/base-model';
import { IRoleProps, RoleModel } from './role';
import { CompanyModel, ICompanyProps } from './company';
import { BASE_URL } from 'src/constants';

export interface IUserProps {
  id: number;
  email: string;
  name: string;
  short_name: string | null;
  birth_date: string | null;
  avatar: string | null;
  created_at: string;
  role: IRoleProps;
  company: ICompanyProps | null;
}

export class UserModel extends BaseModel {
  public email: string;
  public name: string;
  public short_name: string | null = null;
  public avatar: string | null = null;
  public birth_date: Date | null = null;
  public created_at: Date;

  public role: RoleModel;
  public company: CompanyModel | null = null;

  constructor(props: IUserProps) {
    super(props.id);

    this.email = props.email;
    this.name = props.name;
    this.short_name = props.short_name;
    this.avatar = props.avatar;
    this.created_at = new Date(props.created_at);

    if (props.birth_date) {
      this.birth_date = new Date(props.birth_date);
    }
    if (props.company) {
      this.company = new CompanyModel(props.company);
    }

    this.role = new RoleModel(props.role);
  }

  public getAvatarUrl(): string {
    const avatar = this.avatar ? this.avatar : 'users/default.png';
    return `${BASE_URL}/storage/${avatar}`;
  }
}
