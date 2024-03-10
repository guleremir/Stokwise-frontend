import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { HomepageComponent } from './core/component/homepage/homepage.component';
import { AdminPanelComponent } from './core/component/admin-panel/admin-panel.component';
import { SignUpComponent } from './core/component/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent},
  { path: 'adminPanel', component: AdminPanelComponent},
  { path: 'signup', component: SignUpComponent},
  { path: '**', redirectTo: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
