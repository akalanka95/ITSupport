import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AccountService, LoginService, User } from 'app/core';
import { FileUploader } from 'ng2-file-upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductModuleService } from 'app/core/create-ticket/ProductModule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    @ViewChild('fileInput') fileInput: ElementRef;
    error: string;
    success: string;
    settingsAccount: any;
    languages: any[];
    currentLoggedUser: User = new User();
    loginName: string;

    uploadForm: FormGroup;
    fileName: string;
    imagePath: string;

    public uploader: FileUploader = new FileUploader({
        isHTML5: true
    });

    constructor(
        private accountService: AccountService,
        private fb: FormBuilder,
        private http: HttpClient,
        private productModuleService: ProductModuleService,
        private router: Router,
        private route: ActivatedRoute,
        private loginService: LoginService
    ) {}

    ngOnInit() {
        this.accountService.identity().then(account => {
            this.settingsAccount = this.copyAccount(account);
            this.loginName = this.settingsAccount.login;
            this.imagePath = '../../../content/uploades/' + this.settingsAccount.imageUrl;
        });

        this.productModuleService.getCurrentLoggedUser().subscribe((user: User) => {
            this.currentLoggedUser = user;
        });
        this.uploadForm = this.fb.group({
            document: [null, null],
            type: [null, Validators.compose([Validators.required])]
        });
    }

    save() {
        if (this.settingsAccount.login !== this.loginName) {
            this.accountService.save(this.settingsAccount).subscribe(
                () => {
                    this.error = null;
                    this.success = 'OK';
                    this.accountService.identity(true).then(account => {
                        this.settingsAccount = this.copyAccount(account);
                    });
                    this.logout();
                },
                () => {
                    this.success = null;
                    this.error = 'ERROR';
                }
            );
        } else {
            this.accountService.save(this.settingsAccount).subscribe(
                () => {
                    this.error = null;
                    this.success = 'OK';
                    this.accountService.identity(true).then(account => {
                        this.settingsAccount = this.copyAccount(account);
                    });
                },
                () => {
                    this.success = null;
                    this.error = 'ERROR';
                }
            );
        }

        this.uploadSubmit();
    }

    copyAccount(account) {
        return {
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl
        };
    }

    test() {
        window.alert('test');
    }

    uploadSubmit() {
        for (let i = 0; i < this.uploader.queue.length; i++) {
            let fileItem = this.uploader.queue[i]._file;
            if (fileItem.size > 10000000) {
                alert('Each File should be less than 10 MB of size.');
                return;
            }
        }
        for (let j = 0; j < this.uploader.queue.length; j++) {
            let data = new FormData();
            let fileItem = this.uploader.queue[j]._file;
            this.fileName = fileItem.name;
            console.log(fileItem.name);
            data.append('file', fileItem);
            data.append('dataType', this.uploadForm.controls.type.value);
            this.uploadFile(data).subscribe(data => alert(data.message));
        }
        this.uploader.clearQueue();
    }

    uploadFile(data: FormData): Observable<any> {
        this.accountService.save(this.settingsAccount).subscribe(
            () => {
                this.error = null;
                this.success = 'OK';
                this.accountService.identity(true).then(account => {
                    this.settingsAccount = this.copyAccount(account);
                });
            },
            () => {
                this.success = null;
                this.error = 'ERROR';
            }
        );

        this.imagePath = '../../../content/uploades/' + this.fileName;
        return this.http.post('api/filesimage', data);
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }

    // getImageUrl(){
    //     this.accountService.identity().then(account => {
    //         this.settingsAccount = this.copyAccount(account);
    //         this.imagePath = '../../../content/uploades/' + this.settingsAccount.imageUrl;
    //     });
    // }
}
