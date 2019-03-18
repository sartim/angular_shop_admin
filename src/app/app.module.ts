import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AmChartsModule, AmChartsService } from '@amcharts/amcharts3-angular';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AlertComponent } from './_directives';
import { AuthGuard } from './_guards';
import { AlertService, AuthenticationService, UserService, OrderService, CategoryService } from './_services';
import { HomeComponent } from './home';
import { OrderListComponent, OrderDetailComponent } from './order';
import { CategoryListComponent, CategoryDetailComponent } from './category';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { NavigationComponent } from './navigation/navigation.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AmChartsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        OrderListComponent,
        OrderDetailComponent,
        CategoryListComponent,
        CategoryDetailComponent,
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
        CategoryService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
