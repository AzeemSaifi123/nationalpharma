import { Routes } from '@angular/router';
import { QueryformComponent } from './queryform/queryform.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: QueryformComponent,
        title: 'queryform',
    },
    {
        path: 'queryform',
        component: QueryformComponent,
        title: 'queryform',
    },
    {
        path:'thank-you',
        component:ThankYouComponent,
        title:"Thank You"
    },
    {
        path:'**',
        component:PageNotFoundComponent,
        title:"Page not found"
    }
];
