const chai = require('chai');
const expect = chai.expect;

describe('Правильное отображение', function() {

  it('истории коммитов', function() {
    return this.browser
      .url('/')
      .isExisting('.commit-content')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });


  it('файловой системы', function() {
    return this.browser
      .url('/files/84408b854c88dad7b3f766264c113d030196ef56/')
      .isExisting('.files')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

  it('содержимого файла', function() {
    return this.browser
      .url('/content/52196a53e250d7c5acc43aaf4559e2e74b37eb70/.gitignore')
      .isExisting('.file-content')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

});


describe('Правильное отображение', function() {

  it('одного коммита', function() {
    return this.browser
      .url('/')
      .isExisting('.commit')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

  it('коммит содержит автора', function() {
    return this.browser
      .url('/')
      .isExisting('.commit__author')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

  it('коммит содержит дату', function() {
    return this.browser
      .url('/')
      .isExisting('.commit__date')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

  it('коммит содержит сообщение', function() {
    return this.browser
      .url('/')
      .isExisting('.commit__msg')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

});


describe('Правильное отображение хлебных крошек', function() {

  it('на странице истории коммитов', function() {
    return this.browser
      .url('/')
      .isExisting('.breadcrumbs')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

  it('на странице директории', function() {
    return this.browser
      .url('/files/84408b854c88dad7b3f766264c113d030196ef56/')
      .isExisting('.breadcrumbs')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

  it('на странице файла', function() {
    return this.browser
      .url('/content/52196a53e250d7c5acc43aaf4559e2e74b37eb70/.gitignore')
      .isExisting('.breadcrumbs')
      .then((exist) => {
        expect(exist).to.be.true;
      });
  });

});
