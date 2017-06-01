import { NG4FirebaseTutorialPage } from './app.po';

describe('ng4-firebase-tutorial App', () => {
  let page: NG4FirebaseTutorialPage;

  beforeEach(() => {
    page = new NG4FirebaseTutorialPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
