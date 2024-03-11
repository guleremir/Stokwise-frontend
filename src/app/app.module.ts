import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './core/component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './core/component/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminPanelComponent } from './core/component/admin-panel/admin-panel.component';
import { SignUpComponent } from './core/component/sign-up/sign-up.component';
import { MenuComponent } from './core/component/menu/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    AdminPanelComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
