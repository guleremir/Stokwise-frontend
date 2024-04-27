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
import { AdminEditShelfComponent } from './admin-edit-shelf/admin-edit-shelf.component';
import { roleCheckGuard } from '../../shared/guard/role-check.guard';
import { ROLE_ADMIN, ROLE_REPORT_READER } from '../../shared/model/constant';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminCategoryManagementComponent } from './admin-category-management/admin-category-management.component';
import { AdminAddCategoryComponent } from './admin-add-category/admin-add-category.component';
import { AdminEditCategoryComponent } from './admin-edit-category/admin-edit-category.component';

const routes: Routes = [
  { path: '', redirectTo:'products', pathMatch: 'full' },
  { path: 'products', component: AdminProductComponent,  
  children: [
      {path: '', component: AdminProductManagementComponent, pathMatch: 'full' },
      {path: 'editProduct', component: AdminEditProductComponent},
      {path: 'addProduct', component: AdminAddProductComponent}
    ]
  },
  { path: 'categories', component: AdminCategoryComponent,  
  children: [
      {path: '', component: AdminCategoryManagementComponent, pathMatch: 'full' },
      {path: 'addCategory', component: AdminAddCategoryComponent},
      {path: 'editCategory', component: AdminEditCategoryComponent}
    ]
  },

  // { path: 'editProduct', component: AdminEditProductComponent},
  // { path: 'addProduct', component: AdminAddProductComponent},
  { path: 'shelves', component: AdminShelfComponent,
  children: [
    {path: '', component: AdminShelfManagementComponent, pathMatch: 'full' },
    {path: 'editShelf', component: AdminEditShelfComponent, canActivate:[roleCheckGuard(ROLE_ADMIN)]},
    {path: 'addShelf', component: AdminAddShelfComponent, canActivate:[roleCheckGuard(ROLE_ADMIN)]},
    
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
