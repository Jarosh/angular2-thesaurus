import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'

import { WordsApiResponse, WordDefinition, GroupedDefinitionsCollection } from './interfaces';


@Injectable()
export class WordsApiService {

  private defaultHeaders: Headers = new Headers({
    'X-Mashape-Key': 'qwerty'
  });

  constructor(
    private http: Http
  ) {
  }

  public groupDefinitionsByPartOfSpeech(definitions: WordDefinition[]): GroupedDefinitionsCollection {
    let r: GroupedDefinitionsCollection = {};
    definitions.forEach((definition: WordDefinition) => {
      if (!r[definition.partOfSpeech]) {
        r[definition.partOfSpeech] = [definition];
      } else {
        r[definition.partOfSpeech].push(definition);
      }
    });
    return r;
  }

  public requestWordDefinition(word: string): Observable<WordsApiResponse> {
    return this.http.request(
      `mocks/work.json`, //`https://wordsapiv1.p.mashape.com/words/${word}`,
      this.getXhrOptions()
    ).map(res => res.json());
  }

  private getXhrOptions(method: string = 'GET', body?: any): RequestOptionsArgs {
    let options: RequestOptionsArgs = {
      method: method,
      headers: this.defaultHeaders,
      withCredentials: true,
    };
    if (body) {
      options.body = body;
    }
    return options;
  }

}
