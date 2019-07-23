import { CompanyModule } from 'app/core/company.module';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { User } from 'app/core/user/user.model';

export class UserProductDetailsModule {
    id: number;
    user: User;
    companyProductModule: CompanyProductModuleModel;

    constructor() {}
}
