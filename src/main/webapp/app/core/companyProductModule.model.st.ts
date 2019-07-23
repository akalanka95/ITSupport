import { User } from 'app/core/user/user.model';
import { ProductModuleModel } from 'app/core/ProductModule.model';

export class CompanyProductModuleModel {
    id: number;
    brand: string;
    model: string;
    serialNo: string;
    modelNo: string;
    description: string;
    version: string;
    user: User;
    product_module: ProductModuleModel;
    select: boolean;
    alreadyInCompany: string;
    productName: string;
    constructor() {}
}
