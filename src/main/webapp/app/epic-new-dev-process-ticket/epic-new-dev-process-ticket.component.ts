import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateTicketService } from 'app/core/create-ticket/CreateTicket.service';
import { TicketModel } from 'app/core/ticket.model';
import { TicketCommentModel } from 'app/core/TicketComment.model';
import { JhiTrackerService, User } from '../core';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { TicketUserTrackerModel } from 'app/core/TicketUserTracker.model';
import { FileUploader } from 'ng2-file-upload';
import * as moment from 'moment';
moment;
import { TicketFileModel } from '../core/TicketFile.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TicketProductModel } from '../core/TicketProduct.model';
import { UserProductModule } from 'app/core/UserProduct.model';
import { TicketStatusModel } from 'app/core/ticketStatus.model';
import { TicketLogModel } from '../core/TicketLog.model';
import { ProductModel } from 'app/core/product.model';
import { UserProductQAModel } from 'app/core/UserProductQA.model';
import { UserProductDevModel } from 'app/core/UserProductDev,model';

@Component({
    selector: 'ngx-epic-new-dev-process-ticket',
    templateUrl: './epic-new-dev-process-ticket.component.html',
    styleUrls: ['./epic-new-dev-process-ticket.component.scss']
})
export class EpicNewDevProcessTicketComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;

    html = ``;
    vietTicketInfo = true;
    ticket: TicketModel = new TicketModel();
    ticketId: number;
    commentRelatedTicketId: number = 0;
    assignId: number;
    newTicketComment: TicketCommentModel = new TicketCommentModel();
    ticketCommentArrya: TicketCommentModel[] = [];
    currentLoggedUser: User = new User();
    assignStatusArray: string[] = [];
    assignStatusUserArray: User[] = [];
    activities: any;
    ticketCommentWebSocket: TicketCommentModel = new TicketCommentModel();
    index: number;
    ticketAssign: TicketAssignModule[] = [];
    openTicketStatus: boolean = true;
    openTicketStatusButton: boolean = false;
    openTicketDoneButton: boolean = true;
    newTicketAssign: TicketAssignModule = new TicketAssignModule();
    newTicketUserTracker: TicketUserTrackerModel = new TicketUserTrackerModel();
    ticketuserTrackerArray: TicketUserTrackerModel[] = [];
    reassignTicketAssignModel: TicketAssignModule = new TicketAssignModule();
    reassignNewUserTracker: TicketUserTrackerModel = new TicketUserTrackerModel();
    newTicketCommentTeam: TicketCommentModel = new TicketCommentModel();
    ticketRejectedReason: string;
    ticketClosed: boolean = true;
    getHelpTicketUserTracker: TicketUserTrackerModel = new TicketUserTrackerModel();
    teamAcceptReject: boolean = true;
    deleteTicketComment: TicketCommentModel = new TicketCommentModel();
    editTicketComment: TicketCommentModel = new TicketCommentModel();
    editCommentString: string;

    //newpartadding
    ticketAssignListByUser: TicketAssignModule[] = [];
    newTicketAssign1: TicketAssignModule = new TicketAssignModule();
    ticketRejectedReason1: string;
    currentLoggedUser1: User = new User();
    currentLoggedUser2: User = new User();
    private index1: number = 0;
    reason1: string;
    newTicketCommentTeam1: TicketCommentModel = new TicketCommentModel();

    newDate: string;
    newDate2: string;
    newTime: string;
    newTime2: string;

    ticketFileArray: TicketFileModel[] = [];

    uploadForm: FormGroup;

    rejectedTicketAssignModel: TicketAssignModule = new TicketAssignModule();

    newCompanyProductDetails: TicketProductModel[] = [];

    webSocketComment: TicketCommentModel = new TicketCommentModel();
    displayHardware = true;

    checkTicketProduct: TicketProductModel = new TicketProductModel();

    selectAssignToName: string = 'Select Assign To';

    ticketMessageContent: string;
    ticketMessageDepartmentId: number;

    testcomment: string = '';

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
    READYFORTESTING: string;
    READY_FOR_TESTING: string;
    SUPPORTWAITINGFORFEEDBACK: string;

    listOfTicketLog: TicketLogModel[] = [];
    ticketLog: TicketLogModel = new TicketLogModel();

    ticketHistoryDisplay = true;
    ticketDisplay = false;

    newTicketId: number = 0;
    newAssignId: number = 0;

    ticketCloseFeedback: string;

    type: string;

    userProductQAList: UserProductQAModel[] = [];
    userProductQATicketAssign: TicketAssignModule = new TicketAssignModule();
    userProductQAUserList: User[] = [];

    userProductDevList: UserProductDevModel[] = [];
    userProductDevTicketAssign: TicketAssignModule = new TicketAssignModule();
    userProductDevUserList: User[] = [];

    isLoaded = false;

    ticketTeamList: User[] = [];
    currentLoggedQALeader = false;
    currentLoggedDevLeader = false;

    reminderEmailTo: string;
    reminderSubject: string;
    reminderEmailBody: string;

    clientImagePath: string;

    public uploader: FileUploader = new FileUploader({
        isHTML5: true
    });

    constructor(
        private route: ActivatedRoute,
        private ticketService: CreateTicketService,
        private trackerService: JhiTrackerService,
        private productService: ProductModuleService,
        private router: Router,
        private fb: FormBuilder,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.productService.getallTicketStatus().subscribe((ticketStatus: TicketStatusModel[]) => {
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
            this.READYFORTESTING = ticketStatus[23].status;
            this.READY_FOR_TESTING = ticketStatus[24].status;
            this.SUPPORTWAITINGFORFEEDBACK = ticketStatus[25].status;
        });

        this.uploadForm = this.fb.group({
            document: [null, null],
            type: [null, Validators.compose([Validators.required])]
        });

        this.route.params.subscribe(params => {
            if (this.newTicketId !== 0 || this.newAssignId !== 0) {
                if (this.newTicketId !== +params.id || this.assignId !== +params.assignId) {
                    this.router.navigate(['../../../../../dashboard'], { relativeTo: this.route });
                }
            }

            this.ticketId = +params.id;
            this.assignId = +params.assignId;
            this.ticketService.getTicketById(this.ticketId).subscribe((ticket: TicketModel) => {
                this.ticket = ticket;

                this.clientImagePath = '../../content/uploades/' + this.ticket.user1.imageUrl;

                this.ticketTeamList.push(this.ticket.user1);

                this.ticketService.getTicketProductsByTicketId(this.ticketId).subscribe((ticketProduct: TicketProductModel[]) => {
                    this.productService.getCurrentLoggedUser().subscribe((user: User) => {
                        this.currentLoggedUser2 = user;
                    });

                    for (const list of ticketProduct) {
                        this.type = list.type;
                    }

                    this.productService
                        .getListOfProductsByProductNameAndType(this.ticket.productName, this.type)
                        .subscribe((product: ProductModel) => {
                            this.productService
                                .getListOfUserProductsQAByProductIdAndRole(product.id, 'Team Leader')
                                .subscribe((userProductQA: UserProductQAModel[]) => {
                                    this.userProductQAList = userProductQA;

                                    for (const list of userProductQA) {
                                        this.userProductQAUserList.push(list.user);
                                        this.ticketTeamList.push(list.user);

                                        if (this.currentLoggedUser2.id === list.user.id) {
                                            this.currentLoggedQALeader = true;
                                            this.QATeamLeaderDisplayMethod(this.currentLoggedQALeader);
                                        } else {
                                            this.QATeamLeaderDisplayMethod(this.currentLoggedQALeader);
                                        }
                                    }
                                });
                            this.productService
                                .getListOfUserProductsQAByProductIdAndRole(product.id, ' Team')
                                .subscribe((userProductQA: UserProductQAModel[]) => {
                                    for (const list of userProductQA) {
                                        this.userProductQAUserList.push(list.user);
                                    }
                                });

                            this.productService
                                .getListOfUserProductsDevByProductIdAndRole(product.id, 'Team Leader')
                                .subscribe((userProductDev: UserProductDevModel[]) => {
                                    this.userProductDevList = userProductDev;

                                    for (const list of userProductDev) {
                                        this.userProductDevUserList.push(list.user);
                                        this.ticketTeamList.push(list.user);

                                        if (this.currentLoggedUser2.id === list.user.id) {
                                            this.currentLoggedDevLeader = true;
                                            this.DevTeamLeaderDisplayMethod(this.currentLoggedDevLeader);
                                        } else {
                                            this.DevTeamLeaderDisplayMethod(this.currentLoggedDevLeader);
                                        }
                                    }
                                });
                            this.productService
                                .getListOfUserProductsDevByProductIdAndRole(product.id, ' Team')
                                .subscribe((userProductDev: UserProductDevModel[]) => {
                                    for (const list of userProductDev) {
                                        this.userProductDevUserList.push(list.user);
                                    }
                                });
                        });
                });

                this.newDate = ticket.ticketDate.replace('-', '');
                this.newDate2 = this.newDate.replace('-', '');

                this.newTime = ticket.ticketTime;
                this.newTime2 = this.newTime.slice(0, 11);

                ticket.ticketAge = moment(this.newDate2 + ' , ' + this.newTime2, 'YYYYMMDD, h:mm:ss a').fromNow();

                if (this.ticket.teamStatus === this.CLOSE) {
                    this.ticketClosed = false;
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                    this.teamAcceptReject = true;
                }
                if (this.ticket.teamStatus === this.TiCKETCLOSED_) {
                    this.ticketClosed = false;
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                    this.teamAcceptReject = true;
                }

                this.newTicketUserTracker.ticket = ticket;
                if (this.ticket.teamStatus === this.SUPPORTINPROGRESS) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === this.SUPPORTWAITINGFORFEEDBACK) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === 'READY_FOR_TESTING') {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === 'READY FOR TESTING') {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === this.QAINPROGRESS) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === this.DEVINPROGRESS) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === this.DEVELOPMENTDONE) {
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = false;
                }
                if (this.ticket.teamStatus === this.DEVELOPMENTDONEQAINPROGRESS) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === this.QADONESUPPORTINPROGRESS) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                }
                if (this.ticket.teamStatus === this.SUPPORTPENDING) {
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                    this.teamAcceptReject = false;
                }
                // if (this.ticket.teamStatus === this.DEVASSIGNEDBYMANAGER) {
                //     this.openTicketStatus = true;
                //     this.openTicketStatusButton = true;
                //     this.openTicketDoneButton = true;
                //     this.teamAcceptReject = false;
                // }
                if (this.ticket.teamStatus === this.SUPPORTASSIGNEDTOQA) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
                if (this.ticket.teamStatus === this.QAASSIGNEDTODEVELOPMENT) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
            });
            this.GetFileArray();
        });

        this.newTicketId = this.ticketId;
        this.newAssignId = this.assignId;

        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            this.newTicketUserTracker.ticketAssign = ticketAssign;
            if (ticketAssign.accepted === 'SUPPORT ASSIGNED TO QA - HELP') {
                this.openTicketStatus = false;
                this.openTicketStatusButton = true;
                this.openTicketDoneButton = true;
            }
        });

        this.GetTicketCommentByTicketId();

        this.productService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentLoggedUser = user;
            if (this.currentLoggedUser.department.id === 5) {
                this.productService.getListOfUsers(5).subscribe((lists: User[]) => {
                    this.assignStatusUserArray = [];
                    this.assignStatusUserArray = lists;
                });
                this.assignStatusArray = [];
                if (this.ticket.teamStatus === this.QADONESUPPORTINPROGRESS) {
                    // this.assignStatusArray.push(this.SUPPORTDONE);
                    this.assignStatusArray.push(this.READYFORTESTING);
                } else if (this.ticket.teamStatus === this.QADONE) {
                    // this.assignStatusArray.push(this.SUPPORTDONE);
                    this.assignStatusArray.push(this.READYFORTESTING);
                } else if (this.ticket.teamStatus === 'READY_FOR_TESTING') {
                    this.assignStatusArray.push('SUPPORT-DONE');
                } else if (this.ticket.teamStatus === 'READY FOR TESTING') {
                    this.assignStatusArray.push('SUPPORT DONE');
                } else {
                    this.assignStatusArray.push(this.SUPPORTASSIGNEDTOQA);
                    // this.assignStatusArray.push("SUPPORT-DONE");
                    this.assignStatusArray.push(this.READY_FOR_TESTING);
                    this.assignStatusArray.push(this.SUPPORTWAITINGFORFEEDBACK);
                }
            }
            if (this.currentLoggedUser.department.id === 6) {
                this.productService.getListOfUsers(6).subscribe((lists: User[]) => {
                    this.assignStatusUserArray = [];
                    this.assignStatusUserArray = lists;

                    if (this.ticket.teamStatus === this.SUPPORTASSIGNEDTOQA) {
                        this.assignStatusUserArray = [];
                        this.assignStatusUserArray = this.userProductQAUserList;
                    }
                });
                this.assignStatusArray = [];
                if (this.ticket.teamStatus === this.DEVELOPMENTDONEQAINPROGRESS) {
                    this.assignStatusArray.push(this.QADONE);
                } else if (this.ticket.teamStatus === this.DEVELOPMENTDONE) {
                    this.assignStatusArray.push(this.QADONE);
                } else {
                    this.assignStatusArray.push(this.QAASSIGNEDTODEVELOPMENT);
                    this.assignStatusArray.push(this.QADONE);
                }
            }

            if (this.currentLoggedUser.department.id === 7) {
                this.productService.getListOfUsers(7).subscribe((lists: User[]) => {
                    this.assignStatusUserArray = [];
                    this.assignStatusUserArray = lists;
                });
                this.assignStatusArray = [];
                this.assignStatusArray.push(this.DEVELOPMENTDONE);
            }
        });

        this.trackerService.subscribe2();

        this.trackerService.receive().subscribe(activity => {
            this.ticketCommentArrya = [];
            this.GetTicketCommentByTicketId();
            this.GetFileArray();
            this.index = 1;
        });

        this.ticketService.getTicketUserTrackerByTicketId(this.ticketId).subscribe((ticketuserTracker: TicketUserTrackerModel[]) => {
            this.ticketuserTrackerArray = ticketuserTracker;

            for (const list of ticketuserTracker) {
                this.ticketTeamList.push(list.user);
            }

            for (let list of this.ticketuserTrackerArray) {
                if (this.currentLoggedUser.department.departmentName === 'Support') {
                    if (list.user.department.departmentName === 'Support') {
                        this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                            this.rejectedTicketAssignModel = ticketAssign;
                        });
                    }
                } else if (this.currentLoggedUser.department.departmentName === 'QA') {
                    if (list.user.department.departmentName === 'QA') {
                        this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                            this.rejectedTicketAssignModel = ticketAssign;
                        });
                    }
                } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                    if (list.user.department.departmentName === 'Dev') {
                        this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                            this.rejectedTicketAssignModel = ticketAssign;
                        });
                    }
                }
            }
        });

        this.productService.getAllTheTicketProductsByTicketId(this.ticketId).subscribe((ticketProduct: TicketProductModel[]) => {
            this.newCompanyProductDetails = ticketProduct;

            this.checkTicketProduct = this.newCompanyProductDetails[0];

            if (this.checkTicketProduct.type === 'HARDWARE') {
                this.displayHardware = false;
            } else {
                this.displayHardware = true;
            }
        });

        this.ticketService.getTicketLogsByTicketId(this.ticketId).subscribe((ticketLog: TicketLogModel[]) => {
            this.listOfTicketLog = ticketLog;
        });

        this.isLoaded = true;
    }

    async delay(ms: number) {
        await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
    }

    QATeamLeaderDisplayMethod(value: boolean) {
        if (this.currentLoggedUser.department.departmentName === 'QA') {
            if (this.ticket.teamStatus === this.QAASSIGNEDBYMANAGER) {
                if (value === true) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                } else {
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = true;
                    this.teamAcceptReject = false;
                }
            }
            if (this.ticket.teamStatus === this.QAASSIGNEDTODEVELOPMENT || this.ticket.teamStatus === 'QA MANAGER REJECTED') {
                this.openTicketStatus = true;
                this.openTicketStatusButton = true;
            }
            if (this.ticket.teamStatus === 'QA REJECTED' || this.ticket.teamStatus === 'DEVELOPMENT DONE - QA ACCEPTED') {
                if (value === true) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
            }

            if (this.ticket.teamStatus === 'DEVELOPMENT DONE - QA ACCEPTED') {
                if (value === true) {
                    this.openTicketStatus = false;
                    this.openTicketStatusButton = true;
                }
            }

            if (this.ticket.teamStatus === 'QA DONE') {
                if (value === true) {
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                } else {
                    this.openTicketStatus = true;
                    this.openTicketStatusButton = true;
                    this.openTicketDoneButton = false;
                }
            }
        }
    }

    DevTeamLeaderDisplayMethod(value: boolean) {
        if (this.ticket.teamStatus === this.DEVASSIGNEDBYMANAGER) {
            if (value === true) {
                this.openTicketStatus = false;
                this.openTicketStatusButton = true;
            } else {
                this.openTicketStatus = true;
                this.openTicketStatusButton = true;
                this.openTicketDoneButton = true;
                this.teamAcceptReject = false;
            }
        }
        if (this.ticket.teamStatus === 'DEVELOPMENT DONE' || this.ticket.teamStatus === 'DEV MANAGER REJECTED') {
            this.openTicketStatus = true;
            this.openTicketStatusButton = true;
        }
        if (this.ticket.teamStatus === 'DEV REJECTED' || this.ticket.teamStatus === 'DEVELOPMENT DONE - QA ACCEPTED') {
            if (value === true) {
                this.openTicketStatus = false;
                this.openTicketStatusButton = true;
            }
        }

        if (this.ticket.teamStatus === 'DEVELOPMENT DONE - QA ACCEPTED') {
            if (value === true) {
                this.openTicketStatus = false;
                this.openTicketStatusButton = true;
            }
        }

        if (this.ticket.teamStatus === 'DEVELOPMENT DONE') {
            if (value === true) {
                this.openTicketStatus = true;
                this.openTicketStatusButton = true;
            } else {
                this.openTicketStatus = true;
                this.openTicketStatusButton = true;
                this.openTicketDoneButton = false;
            }
        }

        if (this.ticket.teamStatus === this.QAASSIGNEDTODEVELOPMENT) {
            if (value === true) {
                this.openTicketStatus = false;
                this.openTicketStatusButton = true;
            }
        }
    }

    GetTicketUSERTRackers(): any {
        this.ticketService.getTicketUserTrackerByTicketId(this.ticketId).subscribe((ticketuserTracker: TicketUserTrackerModel[]) => {
            if (ticketuserTracker.length === 3) {
                return 3;
            } else if (ticketuserTracker.length === 2) {
                return 2;
            }
        });
    }

    GetTicketCommentByTicketId() {
        this.ticketService.getTicketCommentByTicketId(this.ticketId).subscribe((ticketComment: TicketCommentModel[]) => {
            this.ticketCommentArrya = ticketComment;
        });
    }

    GetFileArray() {
        this.ticketFileArray = [];
        this.ticketService.getTicketFilesByTicketId(this.ticketId).subscribe((ticketFile: TicketFileModel[]) => {
            this.ticketFileArray = ticketFile;
        });
    }

    uploadSubmit(ticketId: number) {
        for (let j = 0; j < this.uploader.queue.length; j++) {
            let data = new FormData();
            let fileItem = this.uploader.queue[j]._file;
            console.log(fileItem.name);
            data.append('file', fileItem);
            data.append('fileSeq', ticketId.toLocaleString());
            data.append('dataType', '27');
            //data.append('ticketId', '27');
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
                // this.uploadSubmitError = true;
                return true;
            }
        }
    }

    uploadFile(data: FormData) {
        return this.http.post('api/files', data);
    }

    viewTicketInfo() {
        if (this.vietTicketInfo) {
            this.vietTicketInfo = false;
        } else {
            this.vietTicketInfo = true;
        }
    }

    saveTicketComment(el: HTMLElement) {
        el.scrollTop = el.scrollHeight;
        this.commentRelatedTicketId = this.ticketId;

        if (this.uploadSubmitTestFileSize()) {
        } else {
            this.index = 0;
            if (this.testcomment !== '') {
                this.newTicketComment.comment = this.testcomment;
            }
            this.newTicketComment.ticket = this.ticket;
            this.ticketService.postNewTicketComment(this.newTicketComment).subscribe((ticketComment: TicketCommentModel) => {
                this.trackerService.sendActivity2(this.newTicketComment);
                this.newTicketComment.comment = null;
            });

            this.ticketLog.action = 'New Comment Posted';
            this.ticketLog.ticket = this.ticket;

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

            this.testcomment = '';
            this.uploadSubmit(this.ticketId);
            this.GetFileArray();
        }
    }

    selectStatus(list: string) {
        this.selectAssignToName = list;
        this.ticket.teamStatus = list;
    }

    selectTeamMember(list: User) {
        this.selectAssignToName = list.firstName;
        this.newTicketAssign.user = list;
        this.reassignTicketAssignModel.user = list;
        this.reassignNewUserTracker.user = list;
        this.newTicketUserTracker.user = list;
    }

    assignTicket() {
        this.newTicketCommentTeam.ticket = this.ticket;
        this.newTicketCommentTeam.type = 'team';

        this.ticketLog.ticket = this.ticket;

        if (this.ticket.teamStatus === this.DEVELOPMENTDONE) {
            this.ticketMessageContent = 'Ticket Done from Dev';

            for (const list of this.ticketuserTrackerArray) {
                if (list.user.department.departmentName === 'QA') {
                    list.ticketAssign.accepted = this.DEVELOPMENTDONEQAPENDING;
                    this.newTicketCommentTeam.comment = 'DEVELOPMENT DONE - QA PENDING';
                    this.ticketLog.action = 'DEVELOPMENT DONE - QA PENDING';
                    this.productService.saveTicketassignToTeamPut(list.ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
                }
            }
        } else if (this.ticket.teamStatus === this.QADONE) {
            this.ticketMessageContent = 'Ticket Done from QA';

            for (const list of this.ticketuserTrackerArray) {
                if (list.user.department.departmentName === 'Support') {
                    list.ticketAssign.accepted = this.QADONESUPPORTPENDING;
                    this.newTicketCommentTeam.comment = 'QA DONE - SUPPORT PENDING';
                    this.ticketLog.action = 'QA DONE - SUPPORT PENDING';
                    this.productService.saveTicketassignToTeamPut(list.ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
                }
            }
        } else {
            this.newTicketCommentTeam.comment = this.ticket.teamStatus;
            this.ticketLog.action = this.ticket.teamStatus;
        }

        if (this.ticket.teamStatus === this.DEVELOPMENTDONE) {
        } else if (this.ticket.teamStatus === this.QADONE) {
        } else if (this.ticket.teamStatus === this.SUPPORTDONE) {
            this.ticketMessageContent = 'Ticket Done from Support';
        } else {
            this.ticketService.getTicketUserTrackerByTicketId(this.ticketId).subscribe((ticketUserTracker: TicketUserTrackerModel[]) => {
                for (const list of ticketUserTracker) {
                    if (this.currentLoggedUser.department.departmentName === 'QA') {
                        if (list.user.department.departmentName === 'Support') {
                            this.getHelpTicketUserTracker = list;
                        }
                        this.ticketService
                            .getTicketAssignById(this.getHelpTicketUserTracker.ticketAssign.id)
                            .subscribe((ticketAssign: TicketAssignModule) => {
                                ticketAssign.accepted = this.SUPPORTASSIGNEDTOQA;

                                this.productService
                                    .saveTicketassignToTeamPut(ticketAssign)
                                    .subscribe((ticketAssign: TicketAssignModule) => {});
                            });
                    }
                }
            });
        }

        this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});

        this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

        this.ticketService.postNewTicket(this.ticket).subscribe((ticket: TicketModel) => {});

        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            ticketAssign.accepted = this.ticket.teamStatus;

            if (this.ticket.teamStatus === this.SUPPORTASSIGNEDTOQA) {
                this.userProductQATicketAssign.accepted = this.ticket.teamStatus;
                this.userProductQATicketAssign.ticket = this.ticket;
                for (const list of this.userProductQAList) {
                    this.userProductQATicketAssign.user = list.user;
                    this.productService
                        .saveTicketassignToTeamPut(this.userProductQATicketAssign)
                        .subscribe((ticketAssign: TicketAssignModule) => {});
                }
            } else if (this.ticket.teamStatus === this.QAASSIGNEDTODEVELOPMENT) {
                this.userProductDevTicketAssign.accepted = this.ticket.teamStatus;
                this.userProductDevTicketAssign.ticket = this.ticket;
                for (const list of this.userProductDevList) {
                    this.userProductDevTicketAssign.user = list.user;
                    this.productService
                        .saveTicketassignToTeamPut(this.userProductDevTicketAssign)
                        .subscribe((ticketAssign: TicketAssignModule) => {});
                }
            }

            this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {
                if (ticketAssign.ticket.teamStatus === this.SUPPORTASSIGNEDTOQA) {
                    this.productService.getUserByUserRoleAndDepartment(6).subscribe((user: User[]) => {
                        for (const list of user) {
                            this.productService
                                .sendMessagesByApi(list.telno, 'Ticket Assigned from Support' + ticketAssign.ticket.ticketNo)
                                .subscribe((userProduct: UserProductModule[]) => {});
                            this.productService
                                .sendMessagesByEmail(
                                    list.email,
                                    'IT SUPPORT TICKET SYSTEM',
                                    'Ticket Assigned from Support' + ticketAssign.ticket.ticketNo
                                )
                                .subscribe((userProduct: UserProductModule[]) => {});
                        }
                    });
                } else if (ticketAssign.ticket.teamStatus === this.QAASSIGNEDTODEVELOPMENT) {
                    this.productService.getUserByUserRoleAndDepartment(7).subscribe((user: User[]) => {
                        for (const list of user) {
                            this.productService
                                .sendMessagesByApi(list.telno, 'Ticket Assigned from QA' + ticketAssign.ticket.ticketNo)
                                .subscribe((userProduct: UserProductModule[]) => {});
                            this.productService
                                .sendMessagesByEmail(
                                    list.email,
                                    'IT SUPPORT TICKET SYSTEM',
                                    'Ticket Assigned from QA' + ticketAssign.ticket.ticketNo
                                )
                                .subscribe((userProduct: UserProductModule[]) => {});
                        }
                    });
                } else if (ticketAssign.ticket.teamStatus === this.DEVELOPMENTDONE) {
                    this.productService
                        .sendMessagesByApi(ticketAssign.user.telno, 'Ticket Done from Dev' + ticketAssign.ticket.ticketNo)
                        .subscribe((userProduct: UserProductModule[]) => {});
                    this.productService
                        .sendMessagesByEmail(
                            ticketAssign.user.email,
                            'IT SUPPORT TICKET SYSTEM',
                            'Ticket Done from Dev' + ticketAssign.ticket.ticketNo
                        )
                        .subscribe((userProduct: UserProductModule[]) => {});
                }
            });
        });

        this.router.navigate(['../../../../../dashboard'], { relativeTo: this.route });
    }

    openTicket() {
        this.openTicketStatus = false;
        this.openTicketStatusButton = true;

        const userTrackerNumber = this.GetTicketUSERTRackers();
        this.ticketService.getTicketById(this.ticketId).subscribe((ticket: TicketModel) => {
            this.newTicketCommentTeam.ticket = ticket;
            this.newTicketCommentTeam.type = 'team';

            this.ticketLog.ticket = ticket;

            if (this.currentLoggedUser.department.departmentName === 'Support') {
                if (ticket.teamStatus === this.QADONESUPPORTACCEPTED) {
                    ticket.teamStatus = this.QADONESUPPORTINPROGRESS;
                    this.newTicketCommentTeam.comment = 'QA DONE - SUPPORT INPROGRESS';
                    this.ticketLog.action = 'QA DONE - SUPPORT INPROGRESS';
                } else {
                    ticket.teamStatus = this.SUPPORTINPROGRESS;
                    this.newTicketCommentTeam.comment = 'SUPPORT INPROGRESS';
                    this.ticketLog.action = 'SUPPORT INPROGRESS';
                }
            } else if (this.currentLoggedUser.department.departmentName === 'QA') {
                if (ticket.teamStatus === this.DEVELOPMENTDONEQAACCEPTED) {
                    ticket.teamStatus = this.DEVELOPMENTDONEQAINPROGRESS;
                    this.newTicketCommentTeam.comment = 'DEVELOPMENT DONE - QA INPROGRESS';
                } else if (ticket.teamStatus === 'QA DONE - SUPPORT REJECTED' && userTrackerNumber === 3) {
                    ticket.teamStatus = this.DEVELOPMENTDONEQAINPROGRESS;
                    this.newTicketCommentTeam.comment = 'DEVELOPMENT DONE - QA INPROGRESS';
                    this.ticketLog.action = 'DEVELOPMENT DONE - QA INPROGRESS';
                } else {
                    ticket.teamStatus = this.QAINPROGRESS;
                    this.newTicketCommentTeam.comment = 'QA INPROGRESS';
                    this.ticketLog.action = 'QA INPROGRESS';
                }
            } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                ticket.teamStatus = this.DEVINPROGRESS;
                this.newTicketCommentTeam.comment = 'DEV INPROGRESS';
                this.ticketLog.action = 'DEV INPROGRESS';
            }

            this.ticketService.postNewTicket(ticket).subscribe((ticket: TicketModel) => {});

            this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});
        });

        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            if (this.currentLoggedUser.department.departmentName === 'Support') {
                if (ticketAssign.accepted === this.QADONESUPPORTACCEPTED) {
                    ticketAssign.accepted = this.QADONESUPPORTINPROGRESS;
                } else {
                    ticketAssign.accepted = this.SUPPORTINPROGRESS;
                }
            } else if (this.currentLoggedUser.department.departmentName === 'QA') {
                if (ticketAssign.accepted === this.DEVELOPMENTDONEQAACCEPTED) {
                    ticketAssign.accepted = this.DEVELOPMENTDONEQAINPROGRESS;
                } else if (ticketAssign.accepted === 'QA DONE - SUPPORT REJECTED' && userTrackerNumber === 3) {
                    ticketAssign.accepted = this.DEVELOPMENTDONEQAINPROGRESS;
                } else {
                    ticketAssign.accepted = this.QAINPROGRESS;
                }
            } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                ticketAssign.accepted = this.DEVINPROGRESS;
            }

            this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});

            // this.router.navigate(['../../../../../team/ticketAction' ], { relativeTo: this.route });
        });
    }

    assignTicketByQAManager() {
        this.newTicketAssign.ticket = this.ticket;
        this.newTicketCommentTeam.ticket = this.ticket;
        this.newTicketCommentTeam.type = 'team';
        this.ticketLog.ticket = this.ticket;

        if (this.currentLoggedUser.department.id === 6) {
            this.ticket.teamStatus = this.QAASSIGNEDBYMANAGER;
            this.newTicketAssign.accepted = this.QAASSIGNEDBYMANAGER;
            this.newTicketCommentTeam.comment = 'QA ASSIGNED BY MANAGER';
            this.ticketLog.action = 'QA ASSIGNED BY MANAGER';

            this.ticketMessageContent = 'Ticket Assigned from Supervisor';
        } else if (this.currentLoggedUser.department.id === 7) {
            this.ticket.teamStatus = this.DEVASSIGNEDBYMANAGER;
            this.newTicketAssign.accepted = this.DEVASSIGNEDBYMANAGER;
            this.newTicketCommentTeam.comment = 'DEV ASSIGNED BY MANAGER';
            this.ticketLog.action = 'DEV ASSIGNED BY MANAGER';

            this.ticketMessageContent = 'Ticket Assigned from Supervisor';
        }

        this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});

        this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

        this.ticketService.postNewTicket(this.ticket).subscribe((ticket: TicketModel) => {});

        this.productService.saveTicketassignToTeamPut(this.newTicketAssign).subscribe((ticketAssign: TicketAssignModule) => {
            this.newTicketUserTracker.ticketAssign = ticketAssign;

            this.productService
                .sendMessagesByApi(ticketAssign.user.telno, this.ticketMessageContent + ticketAssign.ticket.ticketNo)
                .subscribe((userProduct: UserProductModule[]) => {});
            this.productService
                .sendMessagesByEmail(
                    ticketAssign.user.email,
                    'IT SUPPORT TICKET SYSTEM',
                    this.ticketMessageContent + ticketAssign.ticket.ticketNo
                )
                .subscribe((userProduct: UserProductModule[]) => {});

            this.ticketService
                .postNewTicketUserTracker2(this.newTicketUserTracker)
                .subscribe((ticketUserTracke: TicketUserTrackerModel) => {});
        });
    }

    acceptTicketModelDone() {
        this.newTicketCommentTeam.ticket = this.ticket;
        this.newTicketCommentTeam.type = 'team';

        this.ticketLog.ticket = this.ticket;

        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            if (this.currentLoggedUser.department.id === 6) {
                ticketAssign.accepted = this.DEVELOPMENTDONEQAACCEPTED;
                ticketAssign.ticket.teamStatus = this.DEVELOPMENTDONEQAACCEPTED;
                this.newTicketCommentTeam.comment = 'DEVELOPMENT DONE - QA ACCEPTED';
                this.ticketLog.action = 'DEVELOPMENT DONE - QA ACCEPTED';
            } else if (this.currentLoggedUser.department.id === 5) {
                ticketAssign.accepted = this.QADONESUPPORTACCEPTED;
                ticketAssign.ticket.teamStatus = this.QADONESUPPORTACCEPTED;
                this.newTicketCommentTeam.comment = 'QA DONE - SUPPORT ACCEPTED';
                this.ticketLog.action = 'QA DONE - SUPPORT ACCEPTED';
            }

            this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});

            this.ticketService.postNewTicket(ticketAssign.ticket).subscribe((ticket: TicketModel) => {});

            this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});
        });

        this.openTicketStatus = true;
        this.openTicketStatusButton = false;
        this.openTicketDoneButton = true;
    }

    closeTicket(ticketTeamStatus: string) {
        this.ticketService.getTicketById(this.ticketId).subscribe((ticket: TicketModel) => {
            this.ticketLog.ticket = ticket;
            this.ticketLog.action = 'Ticket Closed';

            if (ticketTeamStatus === this.SUPPORTDONE) {
                ticket.teamStatus = this.CLOSE;
            } else {
                ticket.teamStatus = this.TiCKETCLOSED_;
            }
            this.ticketService.postNewTicket(ticket).subscribe((ticket: TicketModel) => {});

            this.ticketService.getTicketUserTrackerByTicketId(this.ticketId).subscribe((ticketuserTracker: TicketUserTrackerModel[]) => {
                for (const list of ticketuserTracker) {
                    console.log('Ticket going to close' + list.ticketAssign.accepted);
                    list.ticketAssign.accepted = this.TiCKETCLOSED_;
                    this.productService.saveTicketassignToTeamPut(list.ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
                }
            });

            this.newTicketComment.ticket = this.ticket;
            this.newTicketComment.comment = this.ticketCloseFeedback;
            this.ticketService.postNewTicketComment(this.newTicketComment).subscribe((ticketComment: TicketCommentModel) => {
                this.trackerService.sendActivity2(this.newTicketComment);
                this.newTicketComment.comment = null;
            });

            this.newTicketComment.comment = 'Ticket Closed';
            this.newTicketComment.type = 'team';
            this.ticketService.postNewTicketComment(this.newTicketComment).subscribe((ticketComment: TicketCommentModel) => {
                this.trackerService.sendActivity2(this.newTicketComment);
                this.newTicketComment.comment = null;
            });

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});
        });

        this.router.navigate(['../../../viewTicket'], { relativeTo: this.route });
    }

    ticketReassign() {
        this.ticketService.getTicketById(this.ticketId).subscribe((ticket: TicketModel) => {
            const ticketTeamStatus = ticket.teamStatus;

            if (this.currentLoggedUser.department.departmentName === 'Support') {
                if (ticket.teamStatus === this.QADONESUPPORTINPROGRESS) {
                    this.reassignTicketAssignModel.accepted = this.QADONESUPPORTPENDING;
                } else {
                    this.reassignTicketAssignModel.accepted = 'SUPPORT PENDING';
                }
            } else if (this.currentLoggedUser.department.departmentName === 'QA') {
                if (ticket.teamStatus === this.DEVELOPMENTDONEQAINPROGRESS) {
                    this.reassignTicketAssignModel.accepted = 'DEVELOPMENT DONE - QA INPROGRESS REASSIGN';
                } else if (ticket.teamStatus === this.DEVELOPMENTDONEQAACCEPTED) {
                    this.reassignTicketAssignModel.accepted = 'DEVELOPMENT DONE - QA ACCEPTED REASSIGN';
                } else if (ticket.teamStatus === this.DEVELOPMENTDONE) {
                    this.reassignTicketAssignModel.accepted = 'DEVELOPMENT DONE - QA PENDING REASSIGN';
                } else if (ticket.teamStatus === 'DEVELOPMENT DONE - QA REASSIGN PENDING REJECTED') {
                    this.reassignTicketAssignModel.accepted = this.DEVELOPMENTDONEQAPENDING;
                } else if (ticket.teamStatus === 'DEVELOPMENT DONE - QA REASSIGN REJECTED') {
                    this.reassignTicketAssignModel.accepted = 'DEVELOPMENT DONE - QA ACCEPTED REASSIGN';
                } else {
                    this.reassignTicketAssignModel.accepted = this.QAASSIGNEDBYMANAGER;
                }
            } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                this.reassignTicketAssignModel.accepted = this.DEVASSIGNEDBYMANAGER;
            }

            this.reassignTicketAssignModel.ticket = ticket;

            this.newTicketCommentTeam.ticket = ticket;
            this.newTicketCommentTeam.type = 'team';

            if (this.currentLoggedUser.department.departmentName === 'Support') {
                if (ticket.teamStatus === this.QADONESUPPORTINPROGRESS) {
                    ticket.teamStatus = this.QADONESUPPORTINPROGRESS;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.QADONESUPPORTINPROGRESS;
                } else if (ticket.teamStatus === this.QADONESUPPORTACCEPTED) {
                    ticket.teamStatus = this.QADONESUPPORTACCEPTED;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.QADONESUPPORTACCEPTED;
                } else if (ticket.teamStatus === this.QADONE) {
                    ticket.teamStatus = this.QADONE;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.QADONE;
                } else {
                    ticket.teamStatus = 'SUPPORT PENDING';
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + 'SUPPORT PENDING';
                }
            } else if (this.currentLoggedUser.department.departmentName === 'QA') {
                if (ticket.teamStatus === this.DEVELOPMENTDONEQAINPROGRESS) {
                    ticket.teamStatus = this.DEVELOPMENTDONEQAINPROGRESS;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.DEVELOPMENTDONEQAINPROGRESS;
                } else if (ticket.teamStatus === this.DEVELOPMENTDONEQAACCEPTED) {
                    ticket.teamStatus = this.DEVELOPMENTDONEQAACCEPTED;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.DEVELOPMENTDONEQAACCEPTED;
                } else if (ticket.teamStatus === this.DEVELOPMENTDONE) {
                    ticket.teamStatus = this.DEVELOPMENTDONE;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.DEVELOPMENTDONE;
                } else if (ticket.teamStatus === 'DEVELOPMENT DONE - QA REASSIGN PENDING REJECTED') {
                    ticket.teamStatus = this.DEVELOPMENTDONE;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.DEVELOPMENTDONE;
                } else if (ticket.teamStatus === 'DEVELOPMENT DONE - QA REASSIGN REJECTED') {
                    ticket.teamStatus = this.DEVELOPMENTDONEQAACCEPTED;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.DEVELOPMENTDONEQAACCEPTED;
                } else {
                    ticket.teamStatus = this.QAASSIGNEDBYMANAGER;
                    this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.QAASSIGNEDBYMANAGER;
                }
            } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                ticket.teamStatus = this.DEVASSIGNEDBYMANAGER;
                this.newTicketCommentTeam.comment = 'TICKET REASSIGN - ' + this.DEVASSIGNEDBYMANAGER;
            }
            this.ticketService.postNewTicket(ticket).subscribe((ticket: TicketModel) => {});

            this.productService.saveTicketassignToTeamPut(this.reassignTicketAssignModel).subscribe((ticketAssign: TicketAssignModule) => {
                this.reassignNewUserTracker.ticketAssign = ticketAssign;

                this.ticketService
                    .getTicketUserTrackerByTicketId(this.ticketId)
                    .subscribe((ticketUserTracker: TicketUserTrackerModel[]) => {
                        for (const list of ticketUserTracker) {
                            if (this.currentLoggedUser.department.departmentName === 'Support') {
                                if (list.user.department.departmentName === 'Support') {
                                    this.ticketService
                                        .getTicketAssignById(list.ticketAssign.id)
                                        .subscribe((ticketAssign: TicketAssignModule) => {
                                            if (ticketTeamStatus === 'REJECTED') {
                                                ticketAssign.accepted = 'rejected';
                                            } else {
                                                ticketAssign.accepted = 'TICKET REASSIGN';
                                            }

                                            this.productService
                                                .saveTicketassignToTeamPut(ticketAssign)
                                                .subscribe((ticketAssign: TicketAssignModule) => {});
                                        });
                                    list.user = this.reassignNewUserTracker.user;
                                    list.ticketAssign = this.reassignNewUserTracker.ticketAssign;
                                    this.ticketService
                                        .postNewTicketUserTracker2(list)
                                        .subscribe((ticketUserTracker: TicketUserTrackerModel) => {});
                                }
                            }
                            if (this.currentLoggedUser.department.departmentName === 'QA') {
                                if (list.user.department.departmentName === 'QA') {
                                    this.ticketService
                                        .getTicketAssignById(list.ticketAssign.id)
                                        .subscribe((ticketAssign: TicketAssignModule) => {
                                            if (ticketTeamStatus === 'QA REJECTED') {
                                                ticketAssign.accepted = 'QA REJECTED';
                                            } else {
                                                ticketAssign.accepted = 'TICKET REASSIGN';
                                            }
                                            this.productService
                                                .saveTicketassignToTeamPut(ticketAssign)
                                                .subscribe((ticketAssign: TicketAssignModule) => {});
                                        });
                                    list.user = this.reassignNewUserTracker.user;
                                    list.ticketAssign = this.reassignNewUserTracker.ticketAssign;
                                    this.ticketService
                                        .postNewTicketUserTracker2(list)
                                        .subscribe((ticketUserTracker: TicketUserTrackerModel) => {});
                                }
                            }
                            if (this.currentLoggedUser.department.departmentName === 'Dev') {
                                if (list.user.department.departmentName === 'Dev') {
                                    this.ticketService
                                        .getTicketAssignById(list.ticketAssign.id)
                                        .subscribe((ticketAssign: TicketAssignModule) => {
                                            if (ticketTeamStatus === 'DEV REJECTED') {
                                                ticketAssign.accepted = 'DEV REJECTED';
                                            } else {
                                                ticketAssign.accepted = 'TICKET REASSIGN';
                                            }
                                            this.productService
                                                .saveTicketassignToTeamPut(ticketAssign)
                                                .subscribe((ticketAssign: TicketAssignModule) => {});
                                        });
                                    list.user = this.reassignNewUserTracker.user;
                                    list.ticketAssign = this.reassignNewUserTracker.ticketAssign;
                                    this.ticketService
                                        .postNewTicketUserTracker2(list)
                                        .subscribe((ticketUserTracker: TicketUserTrackerModel) => {});
                                }
                            }
                        }
                    });
            });

            this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});
        });

        this.router.navigate(['../../../../manager/ticketDetails'], { relativeTo: this.route });
    }

    rejectTicketModel() {
        this.newTicketCommentTeam.ticket = this.ticket;
        this.newTicketCommentTeam.type = 'team';

        this.ticketLog.ticket = this.ticket;

        this.ticketService.getTicketById(this.ticketId).subscribe((ticket: TicketModel) => {
            if (this.currentLoggedUser.department.departmentName === 'QA') {
                if (this.ticket.teamStatus === this.DEVELOPMENTDONE) {
                    ticket.teamStatus = 'DEVELOPMENT DONE - QA REJECTED';
                    this.newTicketCommentTeam.comment = 'DEVELOPMENT DONE - QA REJECTED';
                    this.ticketLog.action = 'DEVELOPMENT DONE - QA REJECTED';
                } else {
                    ticket.teamStatus = 'QA MANAGER REJECTED';
                    this.newTicketCommentTeam.comment = 'QA MANAGER REJECTED';
                    this.ticketLog.action = 'QA MANAGER REJECTED';
                }
            } else if (this.currentLoggedUser.department.departmentName === 'Dev') {
                ticket.teamStatus = 'DEV MANAGER REJECTED';
                this.newTicketCommentTeam.comment = 'DEV MANAGER REJECTED';
                this.ticketLog.action = 'DEV MANAGER REJECTED';
            } else if (this.currentLoggedUser.department.departmentName === 'Support') {
                if (this.ticket.teamStatus === this.QADONE) {
                    ticket.teamStatus = 'QA DONE - SUPPORT REJECTED';
                    this.newTicketCommentTeam.comment = 'QA DONE - SUPPORT REJECTED';
                    this.ticketLog.action = 'QA DONE - SUPPORT REJECTED';
                }
            }
            this.ticketService.postNewTicket(ticket).subscribe((ticket: TicketModel) => {});

            this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});
        });
        this.ticketService.getTicketUserTrackerByTicketId(this.ticketId).subscribe((ticketUserTracker: TicketUserTrackerModel[]) => {
            for (const list of ticketUserTracker) {
                if (this.currentLoggedUser.department.departmentName === 'QA') {
                    if (this.ticket.teamStatus === this.DEVELOPMENTDONE) {
                        if (list.user.department.departmentName === 'Dev') {
                            this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                                ticketAssign.reason = this.ticketRejectedReason;
                                ticketAssign.accepted = 'DEVELOPMENT DONE - QA REJECTED';
                                this.productService
                                    .saveTicketassignToTeamPut(ticketAssign)
                                    .subscribe((ticketAssign: TicketAssignModule) => {});
                            });
                        }
                        if (list.user.department.departmentName === 'QA') {
                            this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                                ticketAssign.reason = this.ticketRejectedReason;
                                ticketAssign.accepted = 'DEVELOPMENT DONE - QA REJECTED';
                                this.productService
                                    .saveTicketassignToTeamPut(ticketAssign)
                                    .subscribe((ticketAssign: TicketAssignModule) => {});
                            });
                        }
                    } else {
                        if (list.user.department.departmentName === 'Support') {
                            this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                                ticketAssign.reason = this.ticketRejectedReason;
                                ticketAssign.accepted = 'QA MANAGER REJECTED';
                                this.productService
                                    .saveTicketassignToTeamPut(ticketAssign)
                                    .subscribe((ticketAssign: TicketAssignModule) => {});
                            });
                        }
                    }
                }
                if (this.currentLoggedUser.department.departmentName === 'Dev') {
                    if (list.user.department.departmentName === 'QA') {
                        this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                            ticketAssign.reason = this.ticketRejectedReason;
                            ticketAssign.accepted = 'DEV MANAGER REJECTED';
                            this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
                        });
                    }
                }
                if (this.currentLoggedUser.department.departmentName === 'Support') {
                    if (this.ticket.teamStatus === this.QADONE) {
                        if (list.user.department.departmentName === 'QA') {
                            this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                                ticketAssign.reason = this.ticketRejectedReason;
                                ticketAssign.accepted = 'QA DONE - SUPPORT REJECTED';
                                this.productService
                                    .saveTicketassignToTeamPut(ticketAssign)
                                    .subscribe((ticketAssign: TicketAssignModule) => {});
                            });
                        }
                        if (list.user.department.departmentName === 'Support') {
                            this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                                ticketAssign.reason = this.ticketRejectedReason;
                                ticketAssign.accepted = 'QA DONE - SUPPORT REJECTED';
                                this.productService
                                    .saveTicketassignToTeamPut(ticketAssign)
                                    .subscribe((ticketAssign: TicketAssignModule) => {});
                            });
                        }
                    }
                }
            }
        });

        this.router.navigate(['../../../../manager/ticketDetails'], { relativeTo: this.route });
    }

    acceptTicket() {
        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            this.newTicketAssign1 = ticketAssign;
            this.newTicketAssign1.id = ticketAssign.id;
            this.newTicketCommentTeam1.ticket = ticketAssign.ticket;
        });
    }

    acceptTicketModel() {
        this.newTicketAssign1.accepted = 'accepted';
        this.newTicketAssign1.ticket.teamStatus = 'ACCEPTED';
        this.newTicketCommentTeam1.comment = 'SUPPORT ACCEPTED';
        this.newTicketCommentTeam1.type = 'team';

        this.ticketLog.ticket = this.newTicketAssign1.ticket;
        this.ticketLog.action = 'SUPPORT ACCEPTED';

        this.ticketService.postNewTicketComment(this.newTicketCommentTeam1).subscribe((ticketComment: TicketCommentModel) => {});

        this.ticketService.postNewTicket(this.newTicketAssign1.ticket).subscribe((ticket: TicketModel) => {});
        this.productService.saveTicketassignToTeamPut(this.newTicketAssign1).subscribe((ticketAssign: TicketAssignModule) => {
            this.ticketService
                .getTicketAssignsByTicketId(this.newTicketAssign1.ticket.id)
                .subscribe((ticketAssignList: TicketAssignModule[]) => {
                    for (const list of ticketAssignList) {
                        if (list.id !== ticketAssign.id) {
                            this.ticketService.deleteTicketAssignById(list.id).subscribe(() => {});
                        }
                    }
                });
        });

        this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

        this.router.navigate(['../../../../../team/ticketAction'], { relativeTo: this.route });
    }

    acceptTicketModelQA() {
        this.newTicketCommentTeam1.type = 'team';
        if (this.currentLoggedUser.department.id === 6) {
            if (this.newTicketAssign1.accepted === 'DEVELOPMENT DONE - QA INPROGRESS REASSIGN') {
                this.newTicketAssign1.accepted = this.DEVELOPMENTDONEQAACCEPTED;
                this.newTicketAssign1.ticket.teamStatus = this.DEVELOPMENTDONEQAACCEPTED;
            } else if (this.newTicketAssign1.accepted === 'DEVELOPMENT DONE - QA PENDING REASSIGN') {
                this.newTicketAssign1.accepted = this.DEVELOPMENTDONEQAPENDING;
                this.newTicketAssign1.ticket.teamStatus = this.DEVELOPMENTDONE;
            } else if (this.newTicketAssign1.accepted === 'DEVELOPMENT DONE - QA ACCEPTED REASSIGN') {
                this.newTicketAssign1.accepted = this.DEVELOPMENTDONEQAACCEPTED;
                this.newTicketAssign1.ticket.teamStatus = this.DEVELOPMENTDONEQAACCEPTED;
            } else {
                this.newTicketAssign1.accepted = this.QAACCEPTED;
                this.newTicketAssign1.ticket.teamStatus = this.QAACCEPTED;
                this.newTicketCommentTeam1.comment = this.QAACCEPTED;
            }
        } else if (this.currentLoggedUser.department.id === 7) {
            this.newTicketAssign1.accepted = this.DEVACCEPTED;
            this.newTicketAssign1.ticket.teamStatus = this.DEVACCEPTED;
            this.newTicketCommentTeam1.comment = this.DEVACCEPTED;
        }

        this.ticketService.postNewTicket(this.newTicketAssign1.ticket).subscribe((ticket: TicketModel) => {});
        this.productService.saveTicketassignToTeamPut(this.newTicketAssign1).subscribe((ticketAssign: TicketAssignModule) => {});
        this.router.navigate(['../../../../../team/ticketAction'], { relativeTo: this.route });
    }

    rejectTicket() {
        this.ticketService.getTicketAssignById(this.assignId).subscribe((ticketAssign: TicketAssignModule) => {
            this.newTicketAssign1 = ticketAssign;
            this.newTicketAssign1.id = ticketAssign.id;
            this.newTicketCommentTeam1.ticket = ticketAssign.ticket;
        });
    }

    rejectTicketModelNew() {
        this.newTicketAssign1.accepted = 'rejected';
        this.newTicketAssign1.reason = this.ticketRejectedReason;
        this.newTicketAssign1.ticket.teamStatus = 'REJECTED';
        this.newTicketCommentTeam1.comment = 'SUPPORT REJECTED';
        this.newTicketCommentTeam1.type = 'team';

        this.ticketLog.ticket = this.newTicketCommentTeam1.ticket;
        this.ticketLog.action = 'SUPPORT REJECTED - ' + this.ticketRejectedReason;

        this.ticketService.postNewTicketComment(this.newTicketCommentTeam1).subscribe((ticketComment: TicketCommentModel) => {});

        this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

        this.ticketService.postNewTicket(this.newTicketAssign1.ticket).subscribe((ticket: TicketModel) => {});
        this.productService.saveTicketassignToTeamPut(this.newTicketAssign1).subscribe((ticketAssign: TicketAssignModule) => {});
        this.router.navigate(['../../../../../team/ticketAction'], { relativeTo: this.route });
    }

    rejectTicketModelQA() {
        if (this.currentLoggedUser.department.departmentName === 'QA') {
            this.newTicketAssign1.accepted = 'QA REJECTED';
            this.newTicketAssign1.reason = this.ticketRejectedReason;
            this.newTicketAssign1.ticket.teamStatus = 'QA REJECTED';
            this.newTicketCommentTeam1.comment = 'QA REJECTED';
            this.newTicketCommentTeam1.type = 'team';

            this.ticketLog.ticket = this.newTicketCommentTeam1.ticket;
            this.ticketLog.action = 'QA REJECTED - ' + this.ticketRejectedReason;
        } else {
            this.newTicketAssign1.accepted = 'DEV REJECTED';
            this.newTicketAssign1.reason = this.ticketRejectedReason;
            this.newTicketAssign1.ticket.teamStatus = 'DEV REJECTED';
            this.newTicketCommentTeam1.comment = 'DEV REJECTED';
            this.newTicketCommentTeam1.type = 'team';

            this.ticketLog.ticket = this.newTicketCommentTeam1.ticket;
            this.ticketLog.action = 'DEV REJECTED - ' + this.ticketRejectedReason;
        }
        this.ticketService.postNewTicketComment(this.newTicketCommentTeam1).subscribe((ticketComment: TicketCommentModel) => {});

        this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});

        this.ticketService.postNewTicket(this.newTicketAssign1.ticket).subscribe((ticket: TicketModel) => {});
        this.productService.saveTicketassignToTeamPut(this.newTicketAssign1).subscribe((ticketAssign: TicketAssignModule) => {});
        this.router.navigate(['../../../../../team/ticketAction'], { relativeTo: this.route });
    }

    deleteCom(list: TicketCommentModel) {
        this.deleteTicketComment = list;
    }

    deleteComment() {
        this.deleteTicketComment.type = 'deleted';
        this.ticketService.postNewTicketComment(this.deleteTicketComment).subscribe((ticketComment: TicketCommentModel) => {
            this.ticketService.getTicketCommentByTicketId(this.ticketId).subscribe((ticketComment: TicketCommentModel[]) => {
                this.ticketCommentArrya = ticketComment;
            });
            this.ticketLog.action = 'Comment Deleted';
            this.ticketLog.ticket = this.ticket;

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});
        });
    }

    editCom(list: TicketCommentModel) {
        this.editTicketComment = list;
        this.editCommentString = list.comment;
    }

    editComment() {
        this.editTicketComment.type = 'edited';
        this.editTicketComment.comment = this.editCommentString;
        this.ticketService.postNewTicketComment(this.editTicketComment).subscribe((ticketComment: TicketCommentModel) => {
            this.ticketService.getTicketCommentByTicketId(this.ticketId).subscribe((ticketComment: TicketCommentModel[]) => {
                this.ticketCommentArrya = ticketComment;
            });
            this.ticketLog.action = 'Comment Edited';
            this.ticketLog.ticket = this.ticket;

            this.ticketService.postNewTicketLog(this.ticketLog).subscribe((ticket: TicketModel) => {});
        });
    }

    feedBackDone() {
        this.newTicketCommentTeam.ticket = this.ticket;
        this.newTicketCommentTeam.type = 'team';
        this.newTicketCommentTeam.comment = 'FEEDBACK DONE';

        this.ticket.teamStatus = this.SUPPORTINPROGRESS;
        this.ticketService.postNewTicket(this.ticket).subscribe((ticket: TicketModel) => {
            this.ticketService.getTicketUserTrackerByTicketId(this.ticketId).subscribe((ticketuserTracker: TicketUserTrackerModel[]) => {
                for (const list of ticketuserTracker) {
                    this.ticketService.getTicketAssignById(list.ticketAssign.id).subscribe((ticketAssign: TicketAssignModule) => {
                        ticketAssign.accepted = this.SUPPORTINPROGRESS;
                        this.productService.saveTicketassignToTeamPut(ticketAssign).subscribe((ticketAssign: TicketAssignModule) => {});
                    });
                }
            });

            this.ticketService.postNewTicketComment(this.newTicketCommentTeam).subscribe((ticketComment: TicketCommentModel) => {});
        });
    }

    ticketHistory() {
        this.ticketHistoryDisplay = false;
        this.ticketDisplay = true;
    }

    ticketDataDisplay() {
        this.ticketHistoryDisplay = true;
        this.ticketDisplay = false;
    }

    sendEmail() {
        console.log(this.reminderEmailTo);
        this.productService
            .sendMessagesByEmail(this.reminderEmailTo, this.reminderSubject, this.reminderEmailBody)
            .subscribe((userProduct: UserProductModule[]) => {});
    }
}
