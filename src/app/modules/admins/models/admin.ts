import { IUserProps, UserModel } from '../../user/models/user';
import { CompanyModel, ICompanyProps } from './company';

export interface IAdminProps extends IUserProps {
  active: boolean;
  phone: string | null;
  employees_count: number;
  company: ICompanyProps;
}

export class AdminModel extends UserModel {
  public active: boolean;
  public phone: string | null;
  public employees_count: number;
  public company: CompanyModel;

  constructor(props: IAdminProps) {
    super(props);

    this.active = props.active;
    this.phone = props.phone;
    this.employees_count = props.employees_count;
    this.company = new CompanyModel(props.company);
  }
}
