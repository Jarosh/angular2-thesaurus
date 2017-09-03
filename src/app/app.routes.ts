import { Routes } from '@angular/router';

import { AppPageAboutComponent } from './app.page-about.component/app.page-about.component';
import { AppPageSearchComponent } from './app.page-search.component/app.page-search.component';


export const routes: Routes = [
  {
    path: 'about',
    component: AppPageAboutComponent
  },
  {
    path: 'search/:word',
    component: AppPageSearchComponent
  },
  {
    path: '**',
    component: AppPageSearchComponent
  },
];
