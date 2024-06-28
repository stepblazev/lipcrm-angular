import { BaseModel } from 'src/app/core/base-model';
import { IRoleProps, RoleModel } from '../../user/models/role';

export interface INewsCreatorProps {
  id: number;
  name: string;
  short_name: string;
  email: string;
  avatar: string;
  role: IRoleProps;
}

export class NewsCreator extends BaseModel {
  public name: string;
  public short_name: string;
  public email: string;
  public avatar: string;
  public role: RoleModel;

  constructor(props: INewsCreatorProps) {
    super(props.id);
    this.name = props.name;
    this.short_name = props.short_name;
    this.email = props.email;
    this.avatar = props.avatar;
    this.role = new RoleModel(props.role);
  }
}
