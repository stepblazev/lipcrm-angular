import { BaseModel } from 'src/app/core/base-model';

export enum ERoleTypes {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  SUBADMIN = 'subadmin',
  LOGIST = 'logist',
  OPERATOR = 'operator',
  AGENT = 'agent',
  PERFORMER = 'performer',
}

export interface IRoleProps {
  id: number;
  name: ERoleTypes;
  display_name: string;
}

export class RoleModel extends BaseModel {
  public name: ERoleTypes;
  public display_name: string;

  constructor(props: IRoleProps) {
    super(props.id);

    this.name = props.name;
    this.display_name = props.display_name;
  }
}
