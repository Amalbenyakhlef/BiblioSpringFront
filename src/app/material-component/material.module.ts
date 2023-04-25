import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/view-bill-products/confirmation/confirmation.component';
import { ManageDevoirComponent } from './manage-devoir/manage-devoir.component';
import { DevoirComponent } from './dialog/devoir/devoir.component';
import { ManageLivreComponent } from './manage-livre/manage-livre.component';
import { LivreComponent } from './dialog/livre/livre.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ManageDevoirComponent,
    DevoirComponent,
    ManageLivreComponent,
    LivreComponent,
    ManageUsersComponent
  ]
})
export class MaterialComponentsModule {}
