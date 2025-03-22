import { Routes } from '@angular/router';
import { QueryformComponent } from './queryform/queryform.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderComponent } from './loader/loader.component';
import { SalesGraphComponent } from './admin/sales-graph/sales-graph.component';
import { OrderComponent } from './admin/order/order.component';
import { LoginComponent } from './admin/login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: QueryformComponent,
        title: 'The National Pharma',
    },
    {
        path: 'queryform',
        component: QueryformComponent,
        title: 'The National Pharma',
    },
    {
        path: 'home',
        component: HomeComponent,
        title: 'The National Pharma',
    },
    {
        path:'thank-you',
        component:ThankYouComponent,
        title:"Thank You"
    },
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    {
        path: 'admin',
        loadComponent: () => import('./admin/admin.component').then(c => c.AdminComponent), // Lazy loaded
        
        children: [ 
                    { path: '', component: SalesGraphComponent },
                    { path: 'sales-graph', component: SalesGraphComponent },
                    { path: 'order', component: OrderComponent },
                    { path: 'login', component: LoginComponent },
                  ]
    },
    {
        path:'loader',
        component:LoaderComponent,
        title:"Loader" 
    },
    {
        path:'**',
        component:PageNotFoundComponent,
        title:"Page not found"
    }


    //    {
    //       path:'dashboard',
    //       component:DashboardComponent,
    //       title:"Dashboard",
    //       children: [  // Example of nested routes within the lazy-loaded module
    //         { path: '', component: SalesGraphComponent },
    //         { path: 'salesgraph', component: SalesGraphComponent },
    //         { path: 'order', component: OrderComponent },
    //         { path: 'login', component: LoginComponent },
    //       ]
    //     },
    //     { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];
