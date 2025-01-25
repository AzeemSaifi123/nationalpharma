import { Routes } from '@angular/router';
import { QueryformComponent } from './queryform/queryform.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoaderComponent } from './loader/loader.component';

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
        path:'thank-you',
        component:ThankYouComponent,
        title:"Thank You"
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
];
