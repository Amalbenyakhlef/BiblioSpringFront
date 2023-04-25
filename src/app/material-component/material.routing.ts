import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageDevoirComponent } from './manage-devoir/manage-devoir.component';
import { ManageLivreComponent } from './manage-livre/manage-livre.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUsersComponent } from './manage-users/manage-users.component';

export const MaterialRoutes: Routes = [
  {
    path: 'devoir',
    component: ManageDevoirComponent,
    

  },
  {
    path: 'livre',
    component: ManageLivreComponent,
    
  },
  {
    path: 'user',
    component: ManageUsersComponent,
    
  },
];
