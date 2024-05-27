import { BaseModel } from "src/app/core/base-model";

export interface IUserProps {
  id: number;
  email: string;
  avatar: string | null;
  first_name: string;
  last_name: string;
}

export class UserModel extends BaseModel {
  public email: string;
  public avatar: string | null;
  public first_name: string;
  public last_name: string;

  constructor(props: IUserProps) {
    super(props.id);

    this.email = props.email;
    this.avatar = props.avatar;
    this.first_name = props.first_name;
    this.last_name = props.last_name;
  }
}
