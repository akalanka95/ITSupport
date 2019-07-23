import { TicketModel } from './ticket.model';
import { User } from './user/user.model';

export class TicketFileModel {
    id: number;
    ticket: TicketModel;
    file_name: string;
    fileSize: number;
    user: User;
    constructor() {}
}
