import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { HomepageComponent } from './core/component/homepage/homepage.component';
import { AdminPanelComponent } from './core/component/admin-panel/admin-panel.component';
import { SignUpComponent } from './core/component/sign-up/sign-up.component';
import { AccountManagementComponent } from './core/component/account-management/account-management.component';
import { MenuComponent } from './core/component/menu/menu/menu.component';
import { loginGuard } from './core/guard/login.guard';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'homepage', component: HomepageComponent, canActivate: [loginGuard], children: [
      {
        path: 'products', loadChildren: () => import('./modules/product/product.module')
          .then(p => p.ProductModule)
      },
      {
        path: 'shelves', loadChildren: () => import('./modules/shelf/shelf.module')
          .then(s => s.ShelfModule)
      },
      {
        path: 'account', component: AccountManagementComponent
      }
    ]
  },
  {
    path: 'adminPanel', component: AdminPanelComponent, canActivate: [loginGuard], children: [
      {
        path: '', loadChildren: () => import('./modules/admin/admin.module')
          .then(p => p.AdminModule)
      },
    ]
  },
  { path: 'signup', component: SignUpComponent },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
