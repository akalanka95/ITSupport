import { Component, OnInit } from '@angular/core';
import { TicketModel } from 'app/core/ticket.model';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { NbToastrService } from '@nebular/theme';
import { User } from 'app/core';
import { TicketCommentModel } from '../core/TicketComment.model';
import * as moment from 'moment';
moment;

@Component({
    selector: 'ngx-epic-new-dev-accept-ticket',
    templateUrl: './epic-new-dev-accept-ticket.component.html',
    styleUrls: ['./epic-new-dev-accept-ticket.component.scss']
})
export class EpicNewDevAcceptTicketComponent implements OnInit {
    ticketAssignListByUser: TicketAssignModule[] = [];
    newTicketAssign: TicketAssignModule = new TicketAssignModule();
    ticketRejectedReason: string;
    currentLoggedUser: User = new User();
    private index: number = 0;
    reason: string;
    newTicketCommentTeam: TicketCommentModel = new TicketCommentModel();

    date1 = new Date('3-20-2010');
    date2 = new Date('3-30-2010');
    timeDiff = Math.abs(this.date2.getTime() - this.date1.getTime());
    diffDays = Math.ceil(this.timeDiff / (1000 * 3600 * 24));
    newDate: string;
    newDate2: string;
    newTime: string;
    newTime2: string;
    newStatusDate: string;
    newStatusDate2: string;
    newStatusTime: string;
    newStatusTime2: string;

    users: any[] = [];
    userFilter: any = { accepted: '' };

    constructor(
        private ticketService: CreateTicketService,
        private productModuleService: ProductModuleService,
        private toastrService: NbToastrService
    ) {}

    ngOnInit() {
        this.ticketService.getListOfTicketAssignsByUser().subscribe((ticket: TicketAssignModule[]) => {
            for (const list of ticket) {
                this.ticketAssignListByUser.push(list);
                this.ticketAssignListByUser.reverse();

                for (const list of this.ticketAssignListByUser) {
                }

                for (const list of this.ticketAssignListByUser) {
                    this.newDate = list.ticket.ticketDate.replace('-', '');
                    this.newDate2 = this.newDate.replace('-', '');

                    this.newStatusDate = list.statusDate.replace('-', '');
                    this.newStatusDate2 = this.newStatusDate.replace('-', '');

                    this.newTime = list.ticket.ticketTime;
                    this.newTime2 = this.newTime.slice(0, 11);

                    this.newStatusTime = list.statusTime;
                    this.newStatusTime2 = this.newStatusTime.slice(0, 11);

                    list.ticket.ticketAge = moment(this.newDate2 + ' , ' + this.newTime2, 'YYYYMMDD, h:mm:ss a').fromNow();
                    list.ticket.currentStatusAge = moment(
                        this.newStatusDate2 + ' , ' + this.newStatusTime2,
                        'YYYYMMDD, h:mm:ss a'
                    ).fromNow();
                }

                this.users = this.ticketAssignListByUser;
            }
        });

        this.productModuleService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentLoggedUser = user;
        });
    }

    acceptTicket(ticketAssign: TicketAssignModule) {
        this.newTicketAssign = ticketAssign;
        this.newTicketAssign.id = ticketAssign.id;
        this.newTicketCommentTeam.ticket = ticketAssign.ticket;
    }

    acceptTicketModelQA() {
        this.newTicketCommentTeam.type = 'team';
        if (this.currentLoggedUser.department.id === 6) {
            if (this.newTicketAssign.accepted === 'DEVELOPMENT DONE - QA INPROGRESS REASSIGN') {
                this.newTicketAssign.accepted = 'DEVELOPMENT DONE - QA ACCEPTED';
                this.newTicketAssign.ticket.teamStatus = 'DEVELOPMENT DONE - QA ACCEPTED';
            } else if (this.newTicketAssign.accepted === 'DEVELOPMENT DONE - QA PENDING REASSIGN') {
                this.newTicketAssign.accepted = 'DEVELOPMENT DONE - QA PENDING';
                this.newTicketAssign.ticket.teamStatus = 'DEVELOPMENT DONE';
            } else if (this.newTicketAssign.accepted === 'DEVELOPMENT DONE - QA ACCEPTED REASSIGN') {
                this.newTicketAssign.accepted = 'DEVELOPMENT DONE - QA ACCEPTED';
                this.newTicketAssign.ticket.teamStatus = 'DEVELOPMENT DONE - QA ACCEPTED';
            } else {
                this.newTicketAssign.accepted = 'QA ACCEPTED';
                this.newTicketAssign.ticket.teamStatus = 'QA ACCEPTED';
                this.newTicketCommentTeam.comment = 'QA ACCEPTED';
            }
        } else if (this.currentLoggedUser.department.id === 7) {
            this.newTicketAssign.accepted = 'DEV ACCEPTED';
            this.newTicketAssign.ticket.teamStatus = 'DEV ACCEPTED';
            this.newTicketCommentTeam.comment = 'DEV ACCEPTED';
        }

        this.ticketService.postNewTicket(this.newTicketAssign.ticket).subscribe((ticket: TicketModel) => {
            console.log('post upddate ticket');
            console.log(ticket);
        });
        this.productModuleService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
    }

    rejectTicket(ticketAssign: TicketAssignModule) {
        this.newTicketAssign = ticketAssign;
        this.newTicketAssign.id = ticketAssign.id;
        this.newTicketCommentTeam.ticket = ticketAssign.ticket;
    }

    rejectTicketModelQA() {
        this.newTicketCommentTeam.type = 'team';
        this.newTicketAssign.reason = this.ticketRejectedReason;
        if (this.currentLoggedUser.department.id === 6) {
            if (this.newTicketAssign.accepted === 'DEVELOPMENT DONE - QA INPROGRESS REASSIGN') {
                this.newTicketAssign.accepted = 'DEVELOPMENT DONE - QA REASSIGN REJECTED';
                this.newTicketAssign.ticket.teamStatus = 'DEVELOPMENT DONE - QA REASSIGN REJECTED';
            } else if (this.newTicketAssign.accepted === 'DEVELOPMENT DONE - QA PENDING REASSIGN') {
                this.newTicketAssign.accepted = 'DEVELOPMENT DONE - QA REASSIGN PENDING REJECTED';
                this.newTicketAssign.ticket.teamStatus = 'DEVELOPMENT DONE - QA REASSIGN PENDING REJECTED';
            } else if (this.newTicketAssign.accepted === 'DEVELOPMENT DONE - QA ACCEPTED REASSIGN') {
                this.newTicketAssign.accepted = 'DEVELOPMENT DONE - QA REASSIGN REJECTED';
                this.newTicketAssign.ticket.teamStatus = 'DEVELOPMENT DONE - QA REASSIGN REJECTED';
            } else {
                this.newTicketAssign.accepted = 'QA REJECTED';
                this.newTicketAssign.ticket.teamStatus = 'QA REJECTED';
                this.newTicketCommentTeam.comment = 'QA REJECTED';
            }
        } else if (this.currentLoggedUser.department.id === 7) {
            this.newTicketAssign.accepted = 'DEV REJECTED';
            this.newTicketAssign.ticket.teamStatus = 'DEV REJECTED';
            this.newTicketCommentTeam.comment = 'DEV REJECTED';
        }

        this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});

        this.ticketService.postNewTicket(this.newTicketAssign.ticket).subscribe((ticket: TicketModel) => {});
        this.productModuleService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
    }
}
