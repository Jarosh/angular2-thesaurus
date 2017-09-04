import { TestBed, async } from '@angular/core/testing';

import { AppPageAboutComponent } from './app.page-about.component';

declare var $: any;


describe('AppPageAboutComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppPageAboutComponent
      ]
    }).compileComponents();
  }));

  it('should create the app page / about', async(() => {
    const fixture = TestBed.createComponent(AppPageAboutComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should contain one or more paragraphs', async(() => {
    const fixture = TestBed.createComponent(AppPageAboutComponent);
    fixture.detectChanges();
    expect($('p').length).toBeGreaterThan(0);
  }));

  it('first paragraph should begin with...', async(() => {
    const fixture = TestBed.createComponent(AppPageAboutComponent);
    fixture.detectChanges();
    expect($('p:first-child').html().trim()).toMatch(/^Lorem.*/);
  }));

});
