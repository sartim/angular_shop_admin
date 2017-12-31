import { MaterializeModule } from 'angular2-materialize';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService, OrderService } from './_services/index';
import { HomeComponent } from './home/index';
import { OrderDetailComponent } from './order/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AmChartsModule,
        MaterializeModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        OrderDetailComponent,
        LoginComponent,
        RegisterComponent,
        NavigationComponent,
        HeaderComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        OrderService,
        AmChartsService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
