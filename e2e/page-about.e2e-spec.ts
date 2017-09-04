import { Angular2ThesaurusPageAbout } from './page-about.po';


describe('About Page', () => {

  let page: Angular2ThesaurusPageAbout;

  beforeEach(() => {
    page = new Angular2ThesaurusPageAbout();
  });

  it('should contain about page component', () => {
    page.navigateTo();
    expect(page.hasPageAboutComponent()).toBeTruthy();
  });

  it('should contain certain text in first paragraph', () => {
    page.navigateTo();
    expect(page.getFirstParagraphText()).toMatch(/^Lorem.*/);
  });

});
