import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { BranchManagerComponent } from './organizition/branch-manager/branch-manager.component';
import { AddOrUpdateBranchComponent } from './organizition/branch-manager/add-or-update-branch/add-or-update-branch.component';
import { CompanyManagerComponent } from './organizition/company-manager/company-manager.component';
import { AddOrUpdateCompanyComponent } from './organizition/company-manager/add-or-update-company/add-or-update-company.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  
  // Routes quản lý công ty
  { path: 'organization/company', component: CompanyManagerComponent },
  { path: 'organization/company/add', component: AddOrUpdateCompanyComponent },
  { path: 'organization/company/edit/:id', component: AddOrUpdateCompanyComponent },

  // Routes quản lý chi nhánh
  { path: 'organization/branch', component: BranchManagerComponent },
  { path: 'organization/branch/add', component: AddOrUpdateBranchComponent },
  { path: 'organization/branch/edit/:id', component: AddOrUpdateBranchComponent },
];

@NgModule({
  declarations: [
    HomeComponent,
    BranchManagerComponent,
    AddOrUpdateBranchComponent,
    CompanyManagerComponent,
    AddOrUpdateCompanyComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class MainModule { }
