import { browser, by, element } from 'protractor';


export class Angular2ThesaurusPageAbout {

  navigateTo() {
    return browser.get('/about');
  }

  hasPageAboutComponent() {
    return element(by.css('app-page-about')).isPresent();
  }

  getFirstParagraphText() {
    return element(by.css('app-page-about p:first-child')).getText();
  }

}
