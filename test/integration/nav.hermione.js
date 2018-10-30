const chai = require('chai');
const expect = chai.expect;

describe('Правильно работают переходы по страницам', function() {

  it('из списка коммитов на список файлов', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY / ROOT');
      });
  });

  it('из списка файлов во вложенную папку', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('ul.files li a[href*="/files/"]')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY / ROOT / bin');
      });
  });

  it('из списка файлов на страницу отдельного файла', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('ul.files li a[href*="/content/"]')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY / ROOT / .gitignore');
      });
  });

});


describe('Правильно работают переходы по хлебным крошкам', function() {

  it('history root history', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('.breadcrumbs a')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY');
      });
  });

  it('root file root', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('ul.files li a[href*="/content/"]')
      .click('.breadcrumbs a:nth-child(2)')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY / ROOT');
      });
  });

  it('root file history', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('ul.files li a[href*="/content/"]')
      .click('.breadcrumbs a')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY');
      });
  });

  it('root folder root', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('ul.files li a[href*="/files/"]')
      .click('.breadcrumbs a:nth-child(2)')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY / ROOT');
      });
  });

  it('folder file folder', function() {
    return this.browser
      .url('/')
      .click('.commit__link a')
      .click('ul.files li a[href*="/files/"]')
      .click('.files a')
      .click('.breadcrumbs a:nth-child(3)')
      .getText('.breadcrumbs')
      .then((text) => {
        expect(text).to.eql('HISTORY / ROOT / bin');
      });
  });

});
