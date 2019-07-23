import { User } from 'app/core/user/user.model';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { CompanyModule } from 'app/core/company.module';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';

export class CompanyProductDetailModel {
    id: number;
    company: CompanyModule;
    companyProductModule: CompanyProductModuleModel;
    // below variable for disebling multiple assigning same product to companies
    contain: string;

    constructor() {}
}
