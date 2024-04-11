import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { HomepageComponent } from './core/component/homepage/homepage.component';
import { AdminPanelComponent } from './core/component/admin-panel/admin-panel.component';
import { SignUpComponent } from './core/component/sign-up/sign-up.component';
import { AccountManagementComponent } from './core/component/account-management/account-management.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'homepage', component: HomepageComponent, children: [
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
  { path: 'adminPanel', component: AdminPanelComponent, children: [
    
  ] },
  { path: 'signup', component: SignUpComponent },
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
