import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { WordsApiResponse } from './../interfaces';
import { WordsApiService } from './../words-api.service';


@Component({
  selector: 'app-page-search',
  templateUrl: './app.page-search.component.html',
  styleUrls: ['./app.page-search.component.css']
})

export class AppPageSearchComponent {

  public query: string;
  public results: WordsApiResponse;

  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: WordsApiService
  ) {
  }

  ngOnInit(): void {
    this.subs.push(this.route.params.subscribe(params => {
      if (params['word']) {
        this.query = params['word'];
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }

  public search(value: string): void {
    console.log(`Search for: ${value}`);
    if (value) {
      this.api.requestWordDefinition(value).subscribe(
        (res: WordsApiResponse) => {
          this.results = res;
          this.router.navigate(['search', value]);
        }
      );
    } else {
      this.results = null;
    }
  }

}
