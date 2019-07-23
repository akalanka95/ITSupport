import { Observable } from 'rxjs';
import { ProductModuleModel } from 'app/core/ProductModule.model';
import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from 'app/core';
import { CompanyProductModuleModel } from 'app/core/companyProductModule.model.st';
import { CompanyProductDetailModel } from 'app/core/CompanyProductDetail.module';
import { UserProductDetailsModule } from 'app/core/userProductDetails.module';
import { TicketAssignModule } from 'app/core/TicketAssign.module';
import { UserProductModule } from 'app/core/UserProduct.model';
import { ProductModel } from 'app/core/product.model';
import { ModuleModel } from 'app/core/module.model';
import { TicketProductModel } from 'app/core/TicketProduct.model';
import { UserProductQAModel } from 'app/core/UserProductQA.model';
import { UserProductDevModel } from 'app/core/UserProductDev,model';
import { PMProductModel } from 'app/core/PMProduct.model';

@Injectable({ providedIn: 'root' })
export class ProductModuleService {
    public resourceUrl = SERVER_API_URL + 'api/test';

    constructor(private http: HttpClient) {}

    create(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    update(user: IUser): Observable<HttpResponse<IUser>> {
        return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
    }

    getListOfProductModules() {
        const url = this.resourceUrl + '/getList';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getListOfProductModulesForCompany() {
        const url = this.resourceUrl + '/getListOfCompanyProductDetailForCompany';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfProductModulesByCompanyId(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductDetailByCompanyId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfProductsOnly() {
        const url = this.resourceUrl + '/getListOfProducts';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getListOfProductsModulesByProductId(id: number) {
        const url = this.resourceUrl + '/getListOfProductsModulesByProductId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveCompanyProductModule(companyModule: CompanyProductModuleModel) {
        const url = this.resourceUrl + '/saveCompanyProductModule';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, companyModule);
    }

    getListOfCompanyProductModules() {
        const url = this.resourceUrl + '/listOfCompanyProductModule';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfCompanies() {
        const url = this.resourceUrl + '/getListOfCompany';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfCompanyProductsModulesByProductId(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductsModulesByProductModuleId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveProductsAssignToCompany(companyProductList: CompanyProductDetailModel) {
        const url = this.resourceUrl + '/saveProductsAssignToCompany';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, companyProductList);
    }

    getListOfDepartments() {
        const url = this.resourceUrl + '/getListOfDepartments';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUsers(id: number) {
        const url = this.resourceUrl + '/getListOfUsersByDepartmentId/' + id;
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveProductsAssignToUser(userProductList: UserProductDetailsModule) {
        const url = this.resourceUrl + '/saveProductToUser';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, userProductList);
    }

    saveTicketassignToTeam(ticketAssign: TicketAssignModule) {
        const url = this.resourceUrl + '/ticketAssign';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, ticketAssign);
    }

    saveTicketassignToTeamPut(ticketAssign: TicketAssignModule) {
        const url = this.resourceUrl + '/ticketAssignPut';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.put(url, ticketAssign);
    }

    getListOfCompanyProductModuleById(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductModuleByID/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getListOfCompanyProductModuleByCompanyId(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductDetailByCompanyId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductDetailsById(id: number) {
        const url = this.resourceUrl + '/getListOfCompanyProductModuleId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveUserProduct(userProduct: UserProductModule) {
        const url = this.resourceUrl + '/saveUserAssignProduct';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, userProduct);
    }

    getListOfUserProductByUserID(id: number) {
        const url = this.resourceUrl + '/getListOfUserProductsById//' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductByProductID(id: number) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    sendMessages() {
        const url = this.resourceUrl + '/send';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }
    getCurrentLoggedUser() {
        const url = this.resourceUrl + '/getCurrentLoggedUser';
        return this.http.get(url);
    }

    getAllTheTickets() {
        const url = this.resourceUrl + '/getListTickets';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    findByUserProductByProductIdAndUserID(productId: number, userId: number) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductIdAndUserId/' + productId + '/' + userId;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    saveProduct(product: ProductModel) {
        const url = this.resourceUrl + '/saveProduct';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, product);
    }

    saveModule(module: ModuleModel) {
        const url = this.resourceUrl + '/saveModule';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, module);
    }

    saveProductModule(productModule: ProductModuleModel[]) {
        const url = this.resourceUrl + '/saveProductModule';
        return this.http.post(url, productModule);
    }

    saveTicketProductModule(ticketProduct: TicketProductModel) {
        const url = this.resourceUrl + '/saveTicketProduct';
        return this.http.post(url, ticketProduct);
    }

    getAllTheTicketProducts() {
        const url = this.resourceUrl + '/getListTicketProducts';
        return this.http.get(url);
    }

    getAllTheTicketProductsByTicketId(ticketId: number) {
        const url = this.resourceUrl + '/getTicketProductsByTicketId/' + ticketId;
        return this.http.get(url);
    }
    getAllUserProducts() {
        const url = this.resourceUrl + '/getListOfUserProducts';
        return this.http.get(url);
    }

    getTicketsByBankName(bankName: string) {
        const url = this.resourceUrl + '/getListTicketsByBankName/' + bankName;
        return this.http.get(url);
    }

    sendMessagesByApi(number: string, message: string) {
        const url =
            'https://app.notify.lk/api/v1/send?user_id=10607&api_key=PcjceaYOH0WE3baETfcB&sender_id=epicSupport&to=' +
            number +
            '&message=' +
            message;
        return this.http.get(url);
    }

    getUserByUserRoleAndDepartment(id: number) {
        const url = this.resourceUrl + '/getDepartmentSupervisor/' + id;
        return this.http.get(url);
    }

    getallTicketStatus() {
        const url = this.resourceUrl + '/findListOfTicketStatus';
        return this.http.get(url);
    }

    sendMessagesByEmail(to: string, subject: string, content: string) {
        const url = this.resourceUrl + '/sendMails/' + to + '/' + subject + '/' + content;
        return this.http.get(url);
    }

    saveUserProductQA(userProductQA: UserProductQAModel) {
        const url = this.resourceUrl + '/saveUserAssignProductQA';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, userProductQA);
    }

    saveUserProductDev(userProductDev: UserProductDevModel) {
        const url = this.resourceUrl + '/saveUserAssignProductDev';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, userProductDev);
    }

    getListOfProductsByProductNameAndType(name: string, type: string) {
        const url = this.resourceUrl + '/getListOfProductsByNameAndType/' + name + '/' + type;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getProductByProductId(id: number) {
        const url = this.resourceUrl + '/getProductByProductId/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductsQAByProductIdAndRole(id: number, role: string) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductIdAndRole/' + id + '/' + role;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductsDevByProductIdAndRole(id: number, role: string) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductIdAndRoleDev/' + id + '/' + role;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductsQAByProductId(id: number) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductIdQA/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfUserProductsDevByProductId(id: number) {
        const url = this.resourceUrl + '/getListOfUserProductsByProductIdDev/' + id;
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfAllUsers() {
        const url = this.resourceUrl + '/getListOfUsers';
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    savePMProduct(pmProduct: PMProductModel) {
        const url = this.resourceUrl + '/savePMProduct';
        // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.post(url, pmProduct);
    }
    getListOfAllPMProducts() {
        const url = this.resourceUrl + '/getListPMProduct';
        //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('user:admin') });
        return this.http.get(url);
    }

    getListOfPMProductsByproductIdAndBankId(productId: number, bankId: number) {
        const url = this.resourceUrl + '/getListPMProductByProductIdAndBankId/' + productId + '/' + bankId;
        return this.http.get(url);
    }

    deleteListOfQAuserProductsByUserId(userId: number) {
        const url = this.resourceUrl + '/deleteListOfUserProductsByUserId/' + userId;
        return this.http.get(url);
    }
}
