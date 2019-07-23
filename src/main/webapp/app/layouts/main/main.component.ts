import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd, NavigationError } from '@angular/router';

import { Title } from '@angular/platform-browser';
import { LoginService, User } from '../../core';
import { ProductModuleService } from '../../core/create-ticket/ProductModule.service';

@Component({
    selector: 'jhi-main',
    templateUrl: './main.component.html',
    styleUrls: ['main.component.css']
})
export class JhiMainComponent implements OnInit {
    currentUser: User = new User();
    private _opened: boolean = false;
    imagePath: string;

    constructor(
        private titleService: Title,
        private router: Router,
        private productService: ProductModuleService,
        private loginService: LoginService
    ) {}

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = routeSnapshot.data && routeSnapshot.data['pageTitle'] ? routeSnapshot.data['pageTitle'] : 'jhipstersupport3App';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        console.log('#33333333333333333333333');
        console.log('#33333333333333333333333');
        console.log('#33333333333333333333333');
        console.log('#33333333333333333333333');

        this.router.events.subscribe(event => {
            this.productService.getCurrentLoggedUser().subscribe((user: User) => {
                console.log('------------------------');
                console.log(user);
                this.currentUser = user;
                this.imagePath = '../../../content/uploades/' + this.currentUser.imageUrl;
            });

            if (event instanceof NavigationEnd) {
                this.titleService.setTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
            if (event instanceof NavigationError && event.error.status === 404) {
                this.router.navigate(['/404']);
            }
        });
    }

    private _toggleSidebar() {
        this._opened = !this._opened;
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['']);
    }
}
