export interface WordsApiResponse {
  word: string;
  results: WordDefinition[];
  pronunciation?: {
    all?: string;
  }
}

export interface WordDefinition {
  definition: string;
  partOfSpeech: string;
  synonyms?: string[];
  examples?: string[];
}

export interface GroupedDefinitionsCollection {
  [key: string]: WordDefinition[];
}
