import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './core/component/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './core/component/homepage/homepage.component';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AdminPanelComponent } from './core/component/admin-panel/admin-panel.component';
import { urlInterceptor } from './core/interceptor/url.interceptor';
import { environment } from '../environments/environment.prod';
import { APP_CONFIG } from './app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AccountManagementComponent } from './core/component/account-management/account-management.component';
import { MenuComponent } from './core/component/menu/menu/menu.component';
import { SharedModule } from "./shared/shared.module";
import { PasswordModule } from 'primeng/password';

@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        LoginComponent,
        HomepageComponent,
        AdminPanelComponent,
        AccountManagementComponent,
    ],
    providers: [
        provideHttpClient(withInterceptors([urlInterceptor])),
        {
            provide: APP_CONFIG,
            useValue: environment,
        },
        { provide: LOCALE_ID, useValue: 'tr' },
        provideAnimationsAsync(),
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        SharedModule,
        PasswordModule
    ]
})
export class AppModule { }
