import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account, StateStorageService } from 'app/core';
import { LoginService, User } from '../core';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketModel } from 'app/core/ticket.model';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { TicketAssignModule } from '../core/TicketAssign.module';
import { ProductModuleService } from '../core/create-ticket/ProductModule.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss'],
    providers: [DatePipe]
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    currentUser: User = new User();

    ticketListByUser: TicketModel[] = [];
    ticketAssignListByUser: TicketAssignModule[] = [];
    date = new Date();
    numberOpen: number = 0;
    numberProgress: number = 0;
    numberClosed: number = 0;

    myDate = new Date();
    currentDate: string;

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
    managerTicketList: TicketModel[] = [];
    newManagerTicketList: TicketModel[] = [];

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        private ticketService: CreateTicketService,
        private productService: ProductModuleService,
        private datePipe: DatePipe,
        private route: ActivatedRoute
    ) {
        this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    }

    ngOnInit() {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
                this.ngOnInit();
            });
        });
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.loginService
            .login({
                username: this.username,
                password: this.password,
                rememberMe: this.rememberMe
            })
            .then(() => {
                this.authenticationError = false;
                // this.activeModal.dismiss('login success');
                if (this.router.url === '/register' || /^\/activate\//.test(this.router.url) || /^\/reset\//.test(this.router.url)) {
                    this.router.navigate(['']);
                }

                this.eventManager.broadcast({
                    name: 'authenticationSuccess',
                    content: 'Sending Authentication Success'
                });

                // previousState was set in the authExpiredInterceptor before being redirected to login modal.
                // since login is successful, go to stored previousState and clear previousState
                const redirect = this.stateStorageService.getUrl();
                if (redirect) {
                    this.stateStorageService.storeUrl(null);
                    this.router.navigate([redirect]);
                }
                this.router.navigate(['/dashboard'], { relativeTo: this.route });
            })
            .catch(() => {
                this.authenticationError = true;
            });
    }

    requestResetPassword() {
        // this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}
