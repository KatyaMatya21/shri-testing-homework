const { expect } = require('chai');
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs, buildObjectUrl } = require('../../utils/navigation');
const sinon = require('sinon');

describe('navigation.js', function() {

  describe('buildFolderUrl: проверка генерации адреса директории', function () {
    const parentHash = '1234567890helpme';
    const path = 'folder';

    it('Генерация с хэшом коммита', function () {
      const result = buildFolderUrl(parentHash);
      expect(result).to.eql('/files/' + parentHash + '/');
    });

    it('Генерация с хэшом коммита и путём', function () {
      const result = buildFolderUrl(parentHash, path);
      expect(result).to.eql('/files/' + parentHash + '/' + path);
    });
  });

  describe('buildFileUrl: проверка генерации адреса файла', function () {
    const parentHash = '1234567890helpme';
    const path = 'file';

    it('Генерация адреса файла', function () {
      const result = buildFileUrl(parentHash, path);
      expect(result).to.eql('/content/' + parentHash + '/' + path);
    });
  });

  describe('buildBreadcrumbs: проверка генерации хлебных крошек', function () {
    const hash = '1234567890helpme';

    it('Генерация крошки для главной страницы', function () {
      const result = buildBreadcrumbs();
      expect(result).to.eql(
        [
          {
            'href': undefined,
            'text': 'HISTORY'
          }
        ]);
    });

    it('Генерация крошек для ROOT', function () {
      const result = buildBreadcrumbs(hash);
      expect(result).to.eql(
        [
          {'href': '/', 'text': 'HISTORY'},
          {'href': undefined, 'text': 'ROOT'}
        ]
      );
    });

    const extraTests = [
      {hash: '123', path: 'something'},
      {hash: 'qwerty', path: '1234567'},
      {hash: '3', path: '38har8sfsfh4'},
      {hash: 'q1w2e3r4t5y6', path: 'apple/banana/orange'},
      {hash: '/das/sdf/', path: 'apple/banana'},
      {hash: '!kjhbn@', path: 'apple/banana/32424234/a#a4e%rsrs4f/1234'},
    ];

    extraTests.forEach(function (test) {
      it('Генерация крошек для хэша и пути', function () {
        const normalizedPath = test.path.split('/').filter(Boolean);
        const result = buildBreadcrumbs(test.hash, test.path);

        expect(result[0].text).to.eql('HISTORY');
        expect(result[0].href).to.eql('/');

        expect(result[1].text).to.eql('ROOT');
        expect(result[1].href).to.eql('/files/' + test.hash + '/');

        expect(result).to.have.lengthOf( 2 + normalizedPath.length );
        expect(result.slice(-1)).to.not.have.property('href');
      });
    });

  });

  describe('buildObjectUrl: генерирует адрес объекта по типу', function () {
    const parentHash = '1234567890helpme';
    const path = 'file';

    it('генерация адреса директории', function () {
      const folderUrl = sinon.fake();
      const type = 'tree';
      buildObjectUrl(parentHash, { path, type }, folderUrl);
      expect(folderUrl.calledWith(parentHash, path)).to.eql(true);
    });

    it('генерация адреса файла', function () {
      const fileUrl = sinon.fake();
      const type = 'blob';
      buildObjectUrl(parentHash, { path, type }, null, fileUrl);
      expect(fileUrl.calledWith(parentHash, path)).to.eql(true);
    });

    it('генерация адреса по умолчанию', function () {
      const type = 'abc';
      expect(buildObjectUrl(parentHash, {path, type})).to.eql('#');
    });

  });

});
