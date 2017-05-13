import { OerPage } from './app.po';

describe('oer App', () => {
  let page: OerPage;

  beforeEach(() => {
    page = new OerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
