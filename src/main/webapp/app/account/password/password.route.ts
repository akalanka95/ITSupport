import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { PasswordComponent } from './password.component';

export const passwordRoute: Route = {
    path: 'password',
    component: PasswordComponent,
    data: {
        authorities: ['ROLE_USER', 'ROLE_TEAM', 'ROLE_TEAM_SUPERVISOR', 'ROLE_MANAGER', 'ROLE_PROJECT_MANAGER'],
        pageTitle: 'Password'
    },
    canActivate: [UserRouteAccessService]
};
