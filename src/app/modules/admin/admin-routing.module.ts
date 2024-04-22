import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminProductManagementComponent } from './admin-product-management/admin-product-management.component';
import { AdminEditProductComponent } from './admin-edit-product/admin-edit-product.component';
import { AdminAddProductComponent } from './admin-add-product/admin-add-product.component';
import { AdminShelfManagementComponent } from './admin-shelf-management/admin-shelf-management.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminEditUserComponent } from './admin-edit-user/admin-edit-user.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { AdminPanelComponent } from '../../core/component/admin-panel/admin-panel.component';
import { AdminAddShelfComponent } from './admin-add-shelf/admin-add-shelf.component';
import { AdminShelfComponent } from './admin-shelf/admin-shelf.component';

const routes: Routes = [
  { path: '', redirectTo:'products', pathMatch: 'full' },
  { path: 'products', component: AdminProductComponent,  
  children: [
      {path: '', component: AdminProductManagementComponent, pathMatch: 'full' },
      {path: 'editProduct', component: AdminEditProductComponent},
      {path: 'addProduct', component: AdminAddProductComponent}
    ]
  },
  // { path: 'editProduct', component: AdminEditProductComponent},
  // { path: 'addProduct', component: AdminAddProductComponent},
  { path: 'shelves', component: AdminShelfComponent,
  children: [
    {path: '', component: AdminShelfManagementComponent, pathMatch: 'full' },

    {path: 'addShelf', component: AdminAddShelfComponent},
    
  ]

  },
  { path: 'users', component: AdminUserComponent,  
  children: [
      {path: '', component: AdminUserManagementComponent, pathMatch: 'full' },
      {path: 'addUser', component: AdminAddUserComponent},
      {path: 'editUser', component: AdminEditUserComponent}
    ]
  },
  { path: 'account', component: AdminAccountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
