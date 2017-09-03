import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AlertModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component/app.component';
import { AppPageAboutComponent } from './app.page-about.component/app.page-about.component';
import { AppPageSearchComponent } from './app.page-search.component/app.page-search.component';
import { SearchRequestComponent } from './search-request.component/search-request.component';
import { SearchResultsComponent } from './search-results.component/search-results.component';
import { GroupDefinitionsPipe } from './group-definitions.pipe';

import { WordsApiService } from './words-api.service';

import { routes } from './app.routes'


@NgModule({
  declarations: [
    AppComponent,
    AppPageAboutComponent,
    AppPageSearchComponent,
    SearchRequestComponent,
    SearchResultsComponent,
    GroupDefinitionsPipe,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AlertModule.forRoot(),
  ],
  providers: [
    WordsApiService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
