import { ProductModel } from 'app/core/product.model';
import { ModuleModel } from 'app/core/module.model';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';

export class ProductModuleModel {
    id: number;
    product: ProductModel;
    module: ModuleModel;
    companyproductModule: CompanyProductModuleModel;

    constructor() {}
}
