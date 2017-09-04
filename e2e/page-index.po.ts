import { browser, by, element } from 'protractor';


export class Angular2ThesaurusPageIndex {

  navigateTo() {
    return browser.get('/');
  }

  hasDumbUnexistingComponent() {
    return element(by.css('app-dumb-unexisting-component')).isPresent();
  }

  hasSearchRequestComponent() {
    return element(by.css('app-search-request')).isPresent();
  }
  
  hasSearchResultsComponent() {
    return element(by.css('app-search-results')).isPresent();
  }

}
