import { IUserProps, UserModel } from '../../user/models/user';
import { CompanyModel, ICompanyProps } from '../../user/models/company';

export interface IAdminProps extends IUserProps {
  active: boolean;
  phone: string | null;
  company: ICompanyProps;
}

export class AdminModel extends UserModel {
  public active: boolean;
  public phone: string | null;
  public override company: CompanyModel;

  constructor(props: IAdminProps) {
    super(props);

    this.active = props.active;
    this.phone = props.phone;
    this.company = new CompanyModel(props.company);
  }
}
