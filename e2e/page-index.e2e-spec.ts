import { Angular2ThesaurusPageIndex } from './page-index.po';


describe('Index Page', () => {

  let page: Angular2ThesaurusPageIndex;

  beforeEach(() => {
    page = new Angular2ThesaurusPageIndex();
  });

  it('should not contain unexisting component', () => {
    page.navigateTo();
    expect(page.hasDumbUnexistingComponent()).toBeFalsy();
  });

  it('should contain search request component', () => {
    page.navigateTo();
    expect(page.hasSearchRequestComponent()).toBeTruthy();
  });

  it('should contain search results component', () => {
    page.navigateTo();
    expect(page.hasSearchResultsComponent()).toBeTruthy();
  });

});
