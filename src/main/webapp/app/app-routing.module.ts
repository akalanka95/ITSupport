import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute, navbarRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { EpicNewCreateticketComponent } from 'app/epic-new-createticket/epic-new-createticket.component';
import { EpicNewDevProcessTicketComponent } from 'app/epic-new-dev-process-ticket/epic-new-dev-process-ticket.component';
import { EpicNewDevAcceptTicketComponent } from 'app/epic-new-dev-accept-ticket/epic-new-dev-accept-ticket.component';
import { EpicNewViewTicketComponent } from 'app/epic-new-view-ticket/epic-new-view-ticket.component';
import { EpicUserProductsComponent } from 'app/epic-user-products/epic-user-products.component';
import { EpicNewAssignProductComponent } from 'app/epic-new-assign-product/epic-new-assign-product.component';
import { EpicNewManagerTicketsComponent } from 'app/epic-new-manager-tickets/epic-new-manager-tickets.component';
import { UserRouteAccessService } from './core';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { EpicNewDevProcessTicketViewComponent } from 'app/epic-new-dev-process-ticket-view/epic-new-dev-process-ticket-view.component';
import { QaSupervisorUserManagementComponent } from 'app/qa-supervisor-user-management/qa-supervisor-user-management.component';
import { UserManagementSupervisorComponent } from 'app/user-management-supervisor/user-management-supervisor.component';
import { EpicAssignProductPmComponent } from 'app/epic-assign-product-pm/epic-assign-product-pm.component';
import { EpicPmTicketListComponent } from 'app/epic-pm-ticket-list/epic-pm-ticket-list.component';

const LAYOUT_ROUTES = [navbarRoute, ...errorRoute];

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'admin',
                    loadChildren: './admin/admin.module#Jhipstersupport3AdminModule'
                },
                {
                    path: 'user/createTicket',
                    component: EpicNewCreateticketComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'CreateNewTicket'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'user/viewTicket',
                    component: EpicNewViewTicketComponent,
                    data: {
                        authorities: ['ROLE_USER'],
                        pageTitle: 'ViewTicket'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'team/processTicket',
                    component: EpicNewDevProcessTicketComponent
                },
                {
                    path: 'team/ticketAction',
                    component: EpicNewDevAcceptTicketComponent,
                    data: {
                        authorities: ['ROLE_TEAM'],
                        pageTitle: 'TicketAction'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'user/ticket/process',
                    component: EpicNewDevProcessTicketComponent
                },
                {
                    path: 'user/ticket/process/:id',
                    component: EpicNewDevProcessTicketComponent,
                    data: {
                        authorities: ['ROLE_TEAM_SUPERVISOR', 'ROLE_USER', 'ROLE_MANAGER', 'ROLE_PROJECT_MANAGER'],
                        pageTitle: 'ProcessTicket'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'user/ticket/process/:id/:assignId',
                    component: EpicNewDevProcessTicketComponent,
                    data: {
                        authorities: ['ROLE_TEAM'],
                        pageTitle: 'ProcessTicket'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'user/ticket/process/view/:id/:assignId',
                    component: EpicNewDevProcessTicketViewComponent,
                    data: {
                        authorities: ['ROLE_TEAM'],
                        pageTitle: 'ProcessTicket'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'admin/addProducts',
                    component: EpicUserProductsComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'Products'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'manager/ticketDetails',
                    component: EpicNewManagerTicketsComponent,
                    data: {
                        authorities: ['ROLE_TEAM_SUPERVISOR', 'ROLE_MANAGER', 'ROLE_PROJECT_MANAGER'],
                        pageTitle: 'Manager'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'assign/products/QA',
                    component: QaSupervisorUserManagementComponent,
                    data: {
                        authorities: ['ROLE_TEAM_SUPERVISOR', 'ROLE_MANAGER'],
                        pageTitle: 'Products'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'dashboard',
                    component: DashboardComponent,
                    data: {
                        authorities: [
                            'ROLE_TEAM_SUPERVISOR',
                            'ROLE_MANAGER',
                            'ROLE_TEAM',
                            'ROLE_USER',
                            'ROLE_ADMIN',
                            'ROLE_PROJECT_MANAGER'
                        ],
                        pageTitle: 'Dashboard'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'admin/assignProducts',
                    component: EpicNewAssignProductComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'AssignProducts'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'products/assignProducts',
                    component: EpicNewAssignProductComponent,
                    data: {
                        authorities: ['ROLE_TEAM_SUPERVISOR'],
                        pageTitle: 'AssignProducts'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'epic/user-management',
                    component: UserManagementSupervisorComponent,
                    data: {
                        authorities: ['ROLE_TEAM_SUPERVISOR', 'ROLE_MANAGER'],
                        pageTitle: 'Manager'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'admin/assignProductsPM',
                    component: EpicAssignProductPmComponent,
                    data: {
                        authorities: ['ROLE_ADMIN'],
                        pageTitle: 'AssignProductsPM'
                    },
                    canActivate: [UserRouteAccessService]
                },
                {
                    path: 'list/ticketList',
                    component: EpicPmTicketListComponent,
                    data: {
                        authorities: ['ROLE_PROJECT_MANAGER'],
                        pageTitle: 'Manager'
                    },
                    canActivate: [UserRouteAccessService]
                },
                ...LAYOUT_ROUTES
            ],
            { useHash: true, enableTracing: DEBUG_INFO_ENABLED }
        )
    ],
    exports: [RouterModule]
})
export class Jhipstersupport3AppRoutingModule {}
