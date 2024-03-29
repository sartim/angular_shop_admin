﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AuthGuard } from './_guards';
import {AlertService, AuthenticationService, UserService, OrderService, CategoryService, ProductService} from './_services';
import { HomeComponent } from './home';
import { OrderListComponent, OrderDetailComponent } from './order';
import { CategoryListComponent, CategoryDetailComponent } from './category';
import { ProductListComponent, ProductDetailComponent } from './product';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';
import {HttpClientModule} from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import {CurrencyPipe, UpperCasePipe} from '@angular/common';
import {AlertComponent} from './_directives';
import {ScriptHelper} from './_helpers/scripts.helpers';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {UserDetailComponent, UserListComponent} from './user';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        routing,
        AmChartsModule,
        DataTablesModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        OrderListComponent,
        OrderDetailComponent,
        UserListComponent,
        UserDetailComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        ProductListComponent,
        ProductDetailComponent,
        LoginComponent,
        RegisterComponent,
        NavigationComponent,
        HeaderComponent,
        BreadcrumbComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        OrderService,
        ProductService,
        AmChartsService,
        CategoryService,
        ScriptHelper,
        UpperCasePipe,
        CurrencyPipe
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
