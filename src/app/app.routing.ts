import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home';
import { OrderListComponent, OrderDetailComponent } from './order';
import { ProductListComponent, ProductDetailComponent } from './product';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { CategoryDetailComponent, CategoryListComponent } from './category';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'product/list', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    { path: 'order/all', component: OrderListComponent, canActivate: [AuthGuard] },
    { path: 'order-detail/:id', component: OrderDetailComponent, canActivate: [AuthGuard] },
    { path: 'category/list', component: CategoryListComponent, canActivate: [AuthGuard] },
    { path: 'category-detail/:id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
