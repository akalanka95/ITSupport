import { Component, OnInit } from '@angular/core';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { ProductModel } from 'app/core/product.model';
import { ModuleModel } from 'app/core/module.model';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { User } from 'app/core';

@Component({
    selector: 'ngx-epic-user-products',
    templateUrl: './epic-user-products.component.html',
    styleUrls: ['./epic-user-products.component.scss']
})
export class EpicUserProductsComponent implements OnInit {
    test: boolean = true;
    type: boolean = true;
    hardType: boolean = true;
    softType: boolean = true;

    productList: ProductModel[] = [];
    moduleModelList: ProductModuleModel[] = [];

    companyProductModuleModel: CompanyProductModuleModel = new CompanyProductModuleModel();
    companyProductModuleList: CompanyProductModuleModel[] = [];

    newProduct: ProductModel = new ProductModel();
    productTypeArray: Array<string> = [];
    moduleInputNumberArray: ModuleModel[] = [];
    module1: ModuleModel = new ModuleModel();
    module2: ModuleModel = new ModuleModel();
    module3: ModuleModel = new ModuleModel();
    module4: ModuleModel = new ModuleModel();
    module5: ModuleModel = new ModuleModel();
    productType: string;
    newProductModuleArray: ProductModuleModel[] = [];
    newProductModule: ProductModuleModel = new ProductModuleModel();
    currentUser: User = new User();
    selectProductName: string = 'Select Product';
    selectModuleName: string = 'Select Module';
    selectHardwareTypeName: string = 'Select Type';

    constructor(private productModuleService: ProductModuleService) {}

    ngOnInit() {
        this.productTypeArray.push('HARDWARE');
        this.productTypeArray.push('SOFTWARE');

        this.productModuleService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentUser = user;
        });

        this.productModuleService.getListOfProductsOnly().subscribe(
            (list: ProductModel[]) => {
                this.productList = list;
            },
            error => console.log(error)
        );

        this.productModuleService.getListOfCompanyProductModules().subscribe(
            (list: CompanyProductModuleModel[]) => {
                this.companyProductModuleList = list;
            },
            error => console.log(error)
        );
    }

    selectProductType(list: ProductModel) {
        this.selectProductName = list.productName;
        this.selectModuleName = 'Select Module';

        this.companyProductModuleModel = new CompanyProductModuleModel();
        this.moduleModelList = [];

        if (list.type === 'HARDWARE') {
            this.type = false;
            this.hardType = false;
            this.softType = true;
        } else {
            this.type = false;
            this.hardType = true;
            this.softType = false;
        }

        this.productModuleService.getListOfProductsModulesByProductId(list.id).subscribe(
            (lists: ProductModuleModel[]) => {
                if (list.type === 'HARDWARE') {
                    for (const l of lists) {
                        if (l.module.type === 'HARDWARE') {
                            this.moduleModelList.push(l);
                        }
                    }
                }
                if (list.type === 'SOFTWARE') {
                    for (const l of lists) {
                        if (l.module.type === 'SOFTWARE') {
                            this.moduleModelList.push(l);
                        }
                    }
                }
            },
            error => console.log(error)
        );
    }

    selectProductModule(list: ProductModuleModel) {
        this.selectModuleName = list.module.moduleName;
        this.companyProductModuleModel.product_module = list;
    }

    createProductModule() {
        this.productModuleService.saveCompanyProductModule(this.companyProductModuleModel).subscribe(
            response => {
                this.productModuleService.getListOfCompanyProductModules().subscribe(
                    (list: CompanyProductModuleModel[]) => {
                        this.companyProductModuleList = list;
                    },
                    error => console.log(error)
                );

                alert('Succesfully product created');
            },
            error => console.log(error)
        );
    }

    selectNewProductType(list: string) {
        this.selectHardwareTypeName = list;
        this.newProduct.type = list;
        this.productType = list;
    }

    addNewProduct() {
        this.newProductModuleArray = [];
        this.moduleInputNumberArray = [];

        this.moduleInputNumberArray.push(this.module1);
        this.moduleInputNumberArray.push(this.module2);
        this.moduleInputNumberArray.push(this.module3);
        this.moduleInputNumberArray.push(this.module4);
        this.moduleInputNumberArray.push(this.module5);

        for (const list of this.moduleInputNumberArray) {
            if (list !== undefined) {
                this.newProductModule = new ProductModuleModel();
                this.newProductModule.product = this.newProduct;
                this.newProductModule.module = list;
                this.newProductModule.module.type = this.productType;
                this.newProductModuleArray.push(this.newProductModule);
            }
        }

        this.productModuleService.saveProductModule(this.newProductModuleArray).subscribe((productModule: ProductModuleModel) => {
            this.productModuleService.getListOfProductsOnly().subscribe(
                (list: ProductModel[]) => {
                    this.productList = list;
                },
                error => console.log(error)
            );
        });
    }
}
