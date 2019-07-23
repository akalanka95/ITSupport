import { ProductModuleModel } from 'app/core/ProductModule.model';
import { User } from 'app/core/user/user.model';
import { TicketModel } from 'app/core/ticket.model';

export class TicketCommentModel {
    id: number;
    comment: string;
    user: User;
    ticket: TicketModel;
    ticketDate: string;
    ticketTime: string;
    type: string;

    constructor() {}
}
