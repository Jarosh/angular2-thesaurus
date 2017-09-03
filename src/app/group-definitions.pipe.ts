import { Pipe } from '@angular/core';

import { WordDefinition, GroupedDefinitionsCollection } from './interfaces';


@Pipe({
  name: 'groupDefinitions'
})
export class GroupDefinitionsPipe {

  transform(value: GroupedDefinitionsCollection, args: string[]): { partOfSpeech: string, results: WordDefinition[] }[] {
    return Object.keys(value).map((key: string) => ({
      partOfSpeech: key,
      results: value[key]
    }));
  }

}
