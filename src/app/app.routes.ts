import { Routes } from '@angular/router';
import { QueryformComponent } from './queryform/queryform.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

export const routes: Routes = [
    {
        path: 'queryform',
        component: QueryformComponent,
        title: 'queryform',
    },
    {
        path:'thank-you',
        component:ThankYouComponent,
        title:"Thank You"
    }
];
