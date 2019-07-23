import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { TicketModel } from 'app/core/ticket.model';
import { User, UserService } from 'app/core';
import { CompanyProductDetailModel } from 'app/core/CompanyProductDetail.module';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { UserProductDetailsModule } from 'app/core/userProductDetails.module';
import { ProductModel } from 'app/core/product.model';
import { UserProductModule } from 'app/core/UserProduct.model';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { TicketUserTrackerModel } from '../core/TicketUserTracker.model';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TicketProductModel } from 'app/core/TicketProduct.model';
import { TicketStatusModel } from 'app/core/ticketStatus.model';
import { TicketLogModel } from '../core/TicketLog.model';
import { PMProductModel } from 'app/core/PMProduct.model';

@Component({
    selector: 'ngx-epic-new-createticket',
    templateUrl: './epic-new-createticket.component.html',
    styleUrls: ['./epic-new-createticket.component.scss']
})
export class EpicNewCreateticketComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;

    html = ``;
    newTicket: TicketModel = new TicketModel();
    companyProductDetailsList: CompanyProductDetailModel[] = [];
    companyProductDetail: CompanyProductDetailModel[] = [];
    newCompanyProductDetail: CompanyProductDetailModel[] = [];
    newTicketAssign: TicketAssignModule = new TicketAssignModule();

    companyProductDetailsInfoList: CompanyProductDetailModel[] = [];
    nameArrayList: Array<string> = [];
    productType: ProductModel = new ProductModel();
    bProductInfo: boolean = true;

    ticketPriorityArray: string[] = ['HIGHEST', 'HIGH', 'MEDIUM', 'LOW'];
    ticketTypeArray: string[] = ['BUG', 'OTHER'];

    private index: number = 0;

    ticketId: number = 50;
    newTicketUserTracker: TicketUserTrackerModel = new TicketUserTrackerModel();

    productTypeArray: Array<string> = [];
    hardware: boolean = true;
    software: boolean = true;

    uploadForm: FormGroup;
    formCreateTicket = true;
    companyProduct = false;
    productTypeHS = false;

    ticketProduct: TicketProductModel = new TicketProductModel();

    selectCompanyProductName: string = 'Select Product';
    selectProductTypeName: string = 'Select Type';
    selectTicketPriorityName: string = 'Select Priority';
    selectTypeName: string = 'Select Type';

    userTeleNo: string;

    SUPPORTPENDING: string;
    SUPPORTACCEPTED: string;
    SUPPORTINPROGRESS: string;
    SUPPORTASSIGNEDTOQA: string;
    QAASSIGNEDBYMANAGER: string;
    QAACCEPTED: string;
    QAINPROGRESS: string;
    QAASSIGNEDTODEVELOPMENT: string;
    DEVASSIGNEDBYMANAGER: string;
    DEVACCEPTED: string;
    DEVINPROGRESS: string;
    DEVELOPMENTDONE: string;
    DEVELOPMENTDONEQAACCEPTED: string;
    DEVELOPMENTDONEQAINPROGRESS: string;
    QADONE: string;
    QADONESUPPORTACCEPTED: string;
    QADONESUPPORTINPROGRESS: string;
    SUPPORTDONE: string;
    TICKETCLOSED: string;
    CLOSE: string;
    TiCKETCLOSED_: string;
    DEVELOPMENTDONEQAPENDING: string;
    QADONESUPPORTPENDING: string;

    ticketLog: TicketLogModel = new TicketLogModel();
    pmProductList: PMProductModel[] = [];

    public uploader: FileUploader = new FileUploader({
        isHTML5: true
    });

    constructor(
        private productModuleService: ProductModuleService,
        private createTicketService: CreateTicketService,
        private userService: UserService,
        private toastrService: NbToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private ticketService: CreateTicketService,
        private fb: FormBuilder,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.productModuleService.getallTicketStatus().subscribe((ticketStatus: TicketStatusModel[]) => {
            this.SUPPORTPENDING = ticketStatus[0].status;
            this.SUPPORTACCEPTED = ticketStatus[1].status;
            this.SUPPORTINPROGRESS = ticketStatus[2].status;
            this.SUPPORTASSIGNEDTOQA = ticketStatus[3].status;
            this.QAASSIGNEDBYMANAGER = ticketStatus[4].status;
            this.QAACCEPTED = ticketStatus[5].status;
            this.QAINPROGRESS = ticketStatus[6].status;
            this.QAASSIGNEDTODEVELOPMENT = ticketStatus[7].status;
            this.DEVASSIGNEDBYMANAGER = ticketStatus[8].status;
            this.DEVACCEPTED = ticketStatus[9].status;
            this.DEVINPROGRESS = ticketStatus[10].status;
            this.DEVELOPMENTDONE = ticketStatus[11].status;
            this.DEVELOPMENTDONEQAACCEPTED = ticketStatus[12].status;
            this.DEVELOPMENTDONEQAINPROGRESS = ticketStatus[13].status;
            this.QADONE = ticketStatus[14].status;
            this.QADONESUPPORTACCEPTED = ticketStatus[15].status;
            this.QADONESUPPORTINPROGRESS = ticketStatus[16].status;
            this.SUPPORTDONE = ticketStatus[17].status;
            this.TICKETCLOSED = ticketStatus[18].status;
            this.CLOSE = ticketStatus[19].status;
            this.TiCKETCLOSED_ = ticketStatus[20].status;
            this.DEVELOPMENTDONEQAPENDING = ticketStatus[21].status;
            this.QADONESUPPORTPENDING = ticketStatus[22].status;
        });

        this.uploadForm = this.fb.group({
            document: [null, null],
            type: [null, Validators.compose([Validators.required])]
        });

        this.productTypeArray.push('HARDWARE');
        this.productTypeArray.push('SOFTWARE');
        this.productModuleService.getListOfProductModulesForCompany().subscribe((companyProductDetails: CompanyProductDetailModel[]) => {
            this.companyProductDetailsList = [];
            this.companyProductDetailsInfoList = companyProductDetails;

            this.nameArrayList = [];
            for (const list of companyProductDetails) {
                const name = list.companyProductModule.product_module.product.productName;

                if (!this.nameArrayList.includes(name)) {
                    this.nameArrayList.push(name);
                    this.companyProductDetailsList.push(list);
                }
            }
        });
    }

    uploadSubmit(ticketId: number) {
        for (let j = 0; j < this.uploader.queue.length; j++) {
            let data = new FormData();
            let fileItem = this.uploader.queue[j]._file;
            console.log(fileItem.name);
            data.append('file', fileItem);
            data.append('fileSeq', ticketId.toLocaleString().replace(',', ''));
            console.log(ticketId.toLocaleString().replace(',', ''));
            data.append('dataType', '27');
            this.uploadFile(data).subscribe();
        }
        this.uploader.clearQueue();
    }

    uploadSubmitTestFileSize(): boolean {
        //this.uploadSubmitError = false;
        for (let i = 0; i < this.uploader.queue.length; i++) {
            let fileItem = this.uploader.queue[i]._file;
            if (fileItem.size > 10000000) {
                alert('Each File should be less than 10 MB of size.');
                return true;
            }
        }
    }

    uploadFile(data: FormData) {
        return this.http.post('api/files', data);
    }

    ticketPriority(list: string) {
        this.selectTicketPriorityName = list;
        this.newTicket.priority = list;
    }

    selectType(list: string) {
        this.selectTypeName = list;
        this.newTicket.type = list;
    }

    createNewTicket(duration) {
        if (this.uploadSubmitTestFileSize()) {
        } else {
            this.newTicket.teamStatus = this.SUPPORTPENDING;
            this.createTicketService.postNewTicket(this.newTicket).subscribe((ticket: TicketModel) => {
                this.ticketProduct.ticket = ticket;
                for (const list of this.newCompanyProductDetail) {
                    this.ticketProduct.companyProductDetails = list;
                    this.productModuleService
                        .saveTicketProductModule(this.ticketProduct)
                        .subscribe((userProduct: UserProductModule[]) => {});
                }

                this.newTicketAssign.ticket = ticket;
                this.ticketId = ticket.id;

                this.newTicketUserTracker.ticket = ticket;

                this.productModuleService
                    .getListOfUserProductByProductID(this.productType.id)
                    .subscribe((userProduct: UserProductModule[]) => {
                        for (const list of userProduct) {
                            this.newTicketAssign.userProduct = list;
                            this.newTicketAssign.accepted = this.SUPPORTPENDING;
                            this.newTicketAssign.user = list.user;

                            this.userTeleNo = list.user.telno;

                            this.productModuleService
                                .sendMessagesByApi(
                                    list.user.telno,
                                    'Ticket Raised Ticket No - ' +
                                        ticket.ticketNo +
                                        ' by ' +
                                        ticket.user1.firstName +
                                        ' Company - ' +
                                        ticket.user1.company.companyName +
                                        ' Ticket Subject -  ' +
                                        ticket.subject +
                                        ' Priority - ' +
                                        ticket.priority
                                )
                                .subscribe((userProduct: UserProductModule[]) => {});
                            this.productModuleService
                                .sendMessagesByEmail(
                                    list.user.email,
                                    'IT SUPPORT TICKET SYSTEM',
                                    'Ticket Raised Ticket No - ' +
                                        ticket.ticketNo +
                                        ' by ' +
                                        ticket.user1.firstName +
                                        ' Company - ' +
                                        ticket.user1.company.companyName +
                                        ' Ticket Subject -  ' +
                                        ticket.subject +
                                        ' Priority - ' +
                                        ticket.priority
                                )
                                .subscribe((userProduct: UserProductModule[]) => {});

                            this.productModuleService
                                .saveTicketassignToTeam(this.newTicketAssign)
                                .subscribe((ticketAssign: TicketAssignModule) => {
                                    this.newTicketUserTracker.ticketAssign = ticketAssign;
                                    this.newTicketUserTracker.user = ticketAssign.userProduct.user;
                                    this.ticketService
                                        .postNewTicketUserTracker2(this.newTicketUserTracker)
                                        .subscribe((ticketUserTracker: TicketUserTrackerModel) => {});
                                });
                        }
                    });

                this.productModuleService.getUserByUserRoleAndDepartment(5).subscribe((user: User[]) => {
                    for (const list of user) {
                        this.productModuleService
                            .sendMessagesByApi(
                                list.telno,
                                'Ticket Raised Ticket No - ' +
                                    ticket.ticketNo +
                                    ' by ' +
                                    ticket.user1.firstName +
                                    ' Company - ' +
                                    ticket.user1.company.companyName +
                                    ' Ticket Subject -  ' +
                                    ticket.subject +
                                    ' Priority - ' +
                                    ticket.priority
                            )
                            .subscribe((userProduct: UserProductModule[]) => {});
                        this.productModuleService
                            .sendMessagesByEmail(
                                list.email,
                                'IT SUPPORT TICKET SYSTEM',
                                'Ticket Raised Ticket No - ' +
                                    ticket.ticketNo +
                                    ' by ' +
                                    ticket.user1.firstName +
                                    ' Company - ' +
                                    ticket.user1.company.companyName +
                                    ' Ticket Subject -  ' +
                                    ticket.subject +
                                    ' Priority - ' +
                                    ticket.priority
                            )
                            .subscribe((userProduct: UserProductModule[]) => {});
                    }
                });

                this.ticketLog.action = 'New Ticket Created';
                this.ticketLog.ticket = ticket;

                this.createTicketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

                this.uploadSubmit(this.ticketId);

                this.router.navigate(['../ticket/process/' + this.ticketId], { relativeTo: this.route });
            });

            // const config = {
            //     duration: duration,
            //     position: NbGlobalPhysicalPosition.BOTTOM_LEFT,
            //     status: NbToastStatus.INFO
            // };
            // // this.toastrService.show('Successfully Created the Ticket', `Ticket Created: ${++this.index}`, config);
            // //
            // this.toastrService.show('Successfully Created the Ticket','',  config);
        }
    }

    selectCompanyProduct(list: CompanyProductDetailModel) {
        this.productModuleService
            .getListOfPMProductsByproductIdAndBankId(list.companyProductModule.product_module.product.id, list.company.id)
            .subscribe((pmProductList: PMProductModel[]) => {
                this.pmProductList = pmProductList;
            });

        this.formCreateTicket = true;
        this.selectCompanyProductName = list.companyProductModule.product_module.product.productName;
        this.selectProductTypeName = 'Select Type';
        this.selectTicketPriorityName = 'Select Priority';
        this.selectTypeName = 'Select Type';

        this.bProductInfo = false;
        this.companyProductDetail = [];

        this.newTicket.productName = list.companyProductModule.product_module.product.productName;

        for (const li of this.companyProductDetailsInfoList) {
            if (
                li.companyProductModule.product_module.product.productName === list.companyProductModule.product_module.product.productName
            ) {
                this.companyProductDetail.push(li);
            }
        }

        this.newTicket.productModule = list.companyProductModule.product_module;
        this.productType = list.companyProductModule.product_module.product;

        this.companyProduct = true;
        if (this.productTypeHS === true) {
            if (this.selectProductTypeName != 'Select Type') {
                this.formCreateTicket = false;
            }
        }
    }

    selectProductTypeHardwareOrSoftware(list: string) {
        this.ticketProduct.type = list;
        this.selectProductTypeName = list;

        this.newCompanyProductDetail = [];

        if (list === 'HARDWARE') {
            this.hardware = false;
            this.software = true;
        } else {
            this.hardware = true;
            this.software = false;
        }

        for (const lists of this.companyProductDetail) {
            if (list === 'HARDWARE') {
                if (lists.companyProductModule.product_module.product.type === 'HARDWARE') {
                    this.productType = lists.companyProductModule.product_module.product;
                    this.newCompanyProductDetail.push(lists);
                }
            } else {
                if (lists.companyProductModule.product_module.product.type === 'SOFTWARE') {
                    this.productType = lists.companyProductModule.product_module.product;
                    this.newCompanyProductDetail.push(lists);
                }
            }
        }

        this.productTypeHS = true;
        if (this.companyProduct === true) {
            if (this.newCompanyProductDetail.length !== 0) {
                this.formCreateTicket = false;
            }
        }
    }
}
