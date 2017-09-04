import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AlertModule } from 'ngx-bootstrap';

import { AppPageSearchComponent } from './app.page-search.component';
import { SearchRequestComponent } from './../search-request.component/search-request.component';
import { SearchResultsComponent } from './../search-results.component/search-results.component';
import { GroupDefinitionsPipe } from './../group-definitions.pipe';

import { WordsApiService } from './../words-api.service';

declare var $: any;


describe('AppPageSearchComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppPageSearchComponent,
        SearchRequestComponent,
        SearchResultsComponent,
        GroupDefinitionsPipe
      ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule,
        AlertModule.forRoot()
      ],
      providers: [
        WordsApiService,
      ]
    }).compileComponents();
  }));

  it('should create the app page / search', async(() => {
    const fixture = TestBed.createComponent(AppPageSearchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain one app-search-request component', async(() => {
    const fixture = TestBed.createComponent(AppPageSearchComponent);
    fixture.detectChanges();
    expect($('app-search-request').length).toEqual(1);
  }));
  
  it('should contain one app-search-results component', async(() => {
    const fixture = TestBed.createComponent(AppPageSearchComponent);
    fixture.detectChanges();
    expect($('app-search-results').length).toEqual(1);
  }));

  it('should contain search input field', async(() => {
    const fixture = TestBed.createComponent(AppPageSearchComponent);
    fixture.detectChanges();
    expect($('app-search-request input[type="text"]').length).toBeGreaterThan(0);
  }));

});
