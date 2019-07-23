import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { Jhipstersupport3SharedModule } from 'app/shared';
import { Jhipstersupport3CoreModule } from 'app/core';
import { Jhipstersupport3AppRoutingModule } from './app-routing.module';
import { Jhipstersupport3HomeModule } from './home/home.module';
import { Jhipstersupport3AccountModule } from './account/account.module';
import { Jhipstersupport3EntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';
import {
    NbCalendarModule,
    NbCalendarRangeModule,
    NbCardModule,
    NbLayoutModule,
    NbStepperModule,
    NbTabsetModule,
    NbThemeModule,
    NbToastrModule
} from '@nebular/theme';
import { EpicNewCreateticketComponent } from 'app/epic-new-createticket/epic-new-createticket.component';
import { EpicNewDevProcessTicketComponent } from 'app/epic-new-dev-process-ticket/epic-new-dev-process-ticket.component';
import { EpicNewDevAcceptTicketComponent } from 'app/epic-new-dev-accept-ticket/epic-new-dev-accept-ticket.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EpicNewViewTicketComponent } from './epic-new-view-ticket/epic-new-view-ticket.component';
import { EpicUserProductsComponent } from 'app/epic-user-products/epic-user-products.component';
import { EpicNewAssignProductComponent } from './epic-new-assign-product/epic-new-assign-product.component';
import { EpicNewTeamViewTicketComponent } from './epic-new-team-view-ticket/epic-new-team-view-ticket.component';
import { MatBadgeModule, MatButtonModule, MatDatepickerModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTinymceEditorModule } from 'ngx-tinymce-editor';
import { EpicNewManagerTicketsComponent } from './epic-new-manager-tickets/epic-new-manager-tickets.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TestComponent } from './test/test.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarModule } from 'ng-sidebar';
import { EpicNewDevProcessTicketViewComponent } from './epic-new-dev-process-ticket-view/epic-new-dev-process-ticket-view.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { QaSupervisorUserManagementComponent } from './qa-supervisor-user-management/qa-supervisor-user-management.component';
import { UserManagementSupervisorComponent } from './user-management-supervisor/user-management-supervisor.component';
import { CommonModule } from '@angular/common';
import { EpicAssignProductPmComponent } from './epic-assign-product-pm/epic-assign-product-pm.component';
import { EpicPmTicketListComponent } from './epic-pm-ticket-list/epic-pm-ticket-list.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { UpBarComponent } from './up-bar/up-bar.component';
import { EpicAssignCompanyUserProductComponent } from 'app/epic-assign-company-user-product/epic-assign-company-user-product.component';
import { SobreComponent } from 'app/lazy/sobre/sobre.component';
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        Jhipstersupport3SharedModule.forRoot(),
        Jhipstersupport3CoreModule,
        Jhipstersupport3HomeModule,
        Jhipstersupport3AccountModule,
        Jhipstersupport3EntityModule,
        Jhipstersupport3AppRoutingModule,
        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbCardModule,
        NbStepperModule,
        NbTabsetModule,
        EditorModule,
        MatBadgeModule,
        MatIconModule,
        MatButtonModule,
        NbCalendarModule,
        NbCalendarRangeModule,
        MatDatepickerModule,
        NbToastrModule.forRoot({ duration: 100 }),
        //NgxTinymceEditorModule.forRoot(),
        SidebarModule.forRoot(),
        FilterPipeModule,
        CommonModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent,
        EpicNewCreateticketComponent,
        EpicNewDevProcessTicketComponent,
        EpicNewDevAcceptTicketComponent,
        EpicNewViewTicketComponent,
        EpicUserProductsComponent,
        EpicNewAssignProductComponent,
        EpicNewTeamViewTicketComponent,
        EpicNewManagerTicketsComponent,
        TestComponent,
        DashboardComponent,
        EpicNewDevProcessTicketViewComponent,
        QaSupervisorUserManagementComponent,
        UserManagementSupervisorComponent,
        EpicAssignProductPmComponent,
        EpicPmTicketListComponent,
        FileUploaderComponent,
        UpBarComponent,
        EpicAssignCompanyUserProductComponent,
        SobreComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class Jhipstersupport3AppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
