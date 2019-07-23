import { Route } from '@angular/router';

import { UserRouteAccessService } from 'app/core';
import { SettingsComponent } from './settings.component';
import { FileUploader } from 'ng2-file-upload';
import { FileUploaderComponent } from 'app/file-uploader/file-uploader.component';

export const settingsRoute: Route = {
    path: 'settings',
    component: SettingsComponent,

    data: {
        authorities: ['ROLE_USER', 'ROLE_TEAM', 'ROLE_TEAM_SUPERVISOR', 'ROLE_MANAGER', 'ROLE_PROJECT_MANAGER'],
        pageTitle: 'Settings'
    },
    canActivate: [UserRouteAccessService]
};
