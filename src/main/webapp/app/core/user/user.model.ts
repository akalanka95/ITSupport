import { CompanyModule } from 'app/core/company.module';
import { DepartmentModule } from 'app/core/department.module';

export interface IUser {
    id?: any;
    login?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    activated?: boolean;
    langKey?: string;
    authorities?: any[];
    createdBy?: string;
    createdDate?: Date;
    lastModifiedBy?: string;
    lastModifiedDate?: Date;
    password?: string;
    company?: CompanyModule;
    userRole?: string;
    telno?: string;
    qaRole?: string;
    imageUrl?: string;
}

export class User implements IUser {
    constructor(
        public id?: any,
        public login?: string,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public activated?: boolean,
        public langKey?: string,
        public authorities?: any[],
        public createdBy?: string,
        public createdDate?: Date,
        public lastModifiedBy?: string,
        public lastModifiedDate?: Date,
        public password?: string,
        public company?: CompanyModule,
        public department?: DepartmentModule,
        public userRole?: string,
        public telno?: string,
        public qaRole?: string,
        public imageUrl?: string
    ) {
        this.id = id ? id : null;
        this.login = login ? login : null;
        this.firstName = firstName ? firstName : null;
        this.lastName = lastName ? lastName : null;
        this.email = email ? email : null;
        this.activated = activated ? activated : false;
        this.langKey = langKey ? langKey : null;
        this.authorities = authorities ? authorities : null;
        this.createdBy = createdBy ? createdBy : null;
        this.createdDate = createdDate ? createdDate : null;
        this.lastModifiedBy = lastModifiedBy ? lastModifiedBy : null;
        this.lastModifiedDate = lastModifiedDate ? lastModifiedDate : null;
        this.password = password ? password : null;
        this.company = company ? company : null;
        this.department = department ? department : null;
        this.userRole = userRole ? userRole : null;
        this.telno = telno ? telno : null;
        this.qaRole = qaRole ? qaRole : null;
        this.imageUrl = imageUrl ? imageUrl : null;
    }
}
