import { NodeAppPage } from './app.po';

describe('node-app App', () => {
  let page: NodeAppPage;

  beforeEach(() => {
    page = new NodeAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
