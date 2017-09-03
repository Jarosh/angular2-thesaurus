import { Component } from '@angular/core';
import { Response } from '@angular/http';
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
  public loading: boolean = false;
  public results: WordsApiResponse;
  public failure: string;
  public warning: string;

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
    this.loading = true
    this.results = null;
    this.warning = this.failure = null;
    if (value) {
      console.log(`Search for: ${value}`);
      this.api.requestWordDefinition(value).subscribe(
        (res: WordsApiResponse) => {
          this.loading = false;
          this.results = res;
          this.router.navigate(['search', value]);
        },
        (err: Response) => {
          this.loading = false;
          this.router.navigate(['search', value]);
          switch (err.status) {
            case 400: // Bad Request
              this.failure = `Malformed request; maybe the word you're looking for was a special one or just an oversized.`;
              break;
            case 404: // Not Found
              this.warning = `Your search - "${value}" - did not match any word definitions.`;
              break;
            case 401: // Unauthorized
            case 429: // Too Many Requests
            case 500: // Server Error
            default:
              this.warning = `Unexpected error occured, please try again a bit later.`;
              break;
          }
        }
      );
    } else {
      this.results = null;
    }
  }

}
