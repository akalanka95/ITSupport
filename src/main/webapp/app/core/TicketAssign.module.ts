import { ProductModel } from 'app/core/product.model';
import { ModuleModel } from 'app/core/module.model';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { TicketModel } from 'app/core/ticket.model';
import { UserProductDetailsModule } from 'app/core/userProductDetails.module';
import { UserProductModule } from 'app/core/UserProduct.model';
import { User } from 'app/core/user/user.model';

export class TicketAssignModule {
    id: number;
    ticket: TicketModel;
    userProduct: UserProductModule;
    reason: string;
    accepted: string;
    user: User;
    statusTime: string;
    statusDate: string;
    constructor() {}
}
