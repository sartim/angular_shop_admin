import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { OrderListComponent, OrderDetailComponent } from './order/index';
import { ProductListComponent, ProductDetailComponent } from './product/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'product/list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    { path: 'order/all', component: OrderListComponent, canActivate: [AuthGuard] },
    { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
