import { Component, Input } from '@angular/core';

import { WordsApiResponse, GroupedDefinitionsCollection } from './../interfaces';
import { WordsApiService } from './../words-api.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})

export class SearchResultsComponent {

  @Input() results: WordsApiResponse;

  constructor(
    private api: WordsApiService
  ) {
  }

  public getDefinitions(): GroupedDefinitionsCollection {
    return this.results
      ? this.api.groupDefinitionsByPartOfSpeech(this.results.results)
      : null;
  }

}
