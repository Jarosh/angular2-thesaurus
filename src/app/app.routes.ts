import { Routes } from '@angular/router';

import { AppPageAboutComponent } from './app.page-about.component/app.page-about.component';
import { AppPageSearchComponent } from './app.page-search.component/app.page-search.component';


export const routes: Routes = [
  {
    path: 'about',
    component: AppPageAboutComponent,
    data: { page: 'about' }
  },
  {
    path: 'search/:word',
    component: AppPageSearchComponent,
    data: { page: 'index' }
  },
  {
    path: '**',
    component: AppPageSearchComponent,
    data: { page: 'index' }
  },
];
