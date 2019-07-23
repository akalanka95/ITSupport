import { ProductModuleModel } from 'app/core/ProductModule.model';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { User } from 'app/core/user/user.model';

export class TicketModel {
    id: number;
    ticketNo: number;
    type: string;
    status: string;
    priority: string;
    subject: string;
    currentStatusAge: string;
    currentStatusAgeDate: string;
    currentStatusAgeTime: string;
    ticketAge: string;
    description: string;
    ticketDate: string;
    ticketTime: string;
    teamStatus: string;
    productModule: ProductModuleModel;
    ticketAssign: TicketAssignModule;
    productName: string;
    user1: User;

    constructor() {}
}
