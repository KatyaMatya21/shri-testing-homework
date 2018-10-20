const {expect} = require('chai');
const {buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../../utils/navigation');


// buildFolderUrl
describe('Проверка генерации адреса директории', function () {
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


// buildFileUrl
describe('Проверка генерации адреса файла', function () {
  const parentHash = '1234567890helpme';
  const path = 'file';

  it('Генерация адреса файла', function () {
    const result = buildFileUrl(parentHash, path);
    expect(result).to.eql('/content/' + parentHash + '/' + path);
  });
});


// buildBreadcrumbs
describe('Проверка генерации хлебных крошек', function () {
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
