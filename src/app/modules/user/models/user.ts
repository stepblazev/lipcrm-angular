import { BaseModel } from 'src/app/core/base-model';
import { IRoleProps, RoleModel } from './role';

export interface IUserProps {
  id: number;
  email: string;
  name: string;
  short_name: string | null;
  birth_date: string | null;
  avatar: string | null;
  created_at: string;
  role: IRoleProps;
}

export class UserModel extends BaseModel {
  public email: string;
  public name: string;
  public short_name: string | null = null;
  public avatar: string | null = null;
  public birth_date: Date | null = null;
  public created_at: Date;

  public role: RoleModel;

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

    this.role = new RoleModel(props.role);
  }

  public getAvatarUrl(): string {
    return `http://lipcrm.local/public/storage/${this.avatar}`;
  }
}
