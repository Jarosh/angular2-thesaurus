import { Angular2ThesaurusPage } from './app.po';

describe('angular2-thesaurus App', () => {
  let page: Angular2ThesaurusPage;

  beforeEach(() => {
    page = new Angular2ThesaurusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
