import { User } from 'app/core/user/user.model';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { ProductModel } from 'app/core/product.model';

export class UserProductModule {
    id: number;
    user: User;
    product: ProductModel;
    userRole: string;

    constructor() {}
}
