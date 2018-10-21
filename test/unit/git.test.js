const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
const gitModule = require('../../utils/git');

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('git.js', function() {

  describe('parseHistoryItem', function () {
    const line = '0ab316fe09d6639e8cde89ab5689522f7cb26b35\tkatya\t00:00:11\thello';
    const normalizedLine = line.split('\t');

    it('parseHistoryItem', function () {
      const result = gitModule.parseHistoryItem(line);
      expect(result).to.have.property('hash').to.eql(normalizedLine[0]);
      expect(result).to.have.property('author').to.eql(normalizedLine[1]);
      expect(result).to.have.property('timestamp').to.eql(normalizedLine[2]);
      expect(result).to.have.property('msg').to.eql(normalizedLine[3]);
    });
  });

  describe('parseFileTreeItem', function () {
    const line = '100644 blob 02fe732137bea2adfb6f650bce92aa0be2f5cd9d\tcontrollers/filesController.js';
    const normalizedLine = line.split('\t');
    const infoLine = normalizedLine[0].split(' ');

    it('parseFileTreeItem', function () {
      const result = gitModule.parseFileTreeItem(line);
      expect(result).to.have.property('type').to.eql(infoLine[1]);
      expect(result).to.have.property('hash').to.eql(infoLine[2]);
      expect(result).to.have.property('path').to.eql(normalizedLine[1]);
    });
  });

  describe('gitHistory', function () {
    const fakeResult = 'fcce6f67d5f4567e7b211377b172c1e14f2e1c0a        katyamatya21    2018-10-21 00:08:48 +0300       Добавляет тесты для навигации\n' +
      '0ab316fe09d6639e8cde89ab5689522f7cb26b35        katyamatya21    2018-10-17 15:57:29 +0300       Добавляем обёртку\n' +
      'f205e103b367e5aadae92fd66d2929e071be0d2f        katyamatya21    2018-10-17 15:52:45 +0300       Чистит лишнее\n' +
      '84408b854c88dad7b3f766264c113d030196ef56        katyamatya21    2018-10-17 15:51:51 +0300       Добавляет зависимости и тестовый тест\n';

    const mockExecuteGit = function () {
      return new Promise(function (resolve) {
        resolve(fakeResult);
      });
    };

    it('gitHistory', function () {
      const result = gitModule.gitHistory(1, 10, mockExecuteGit);
      return expect(result).to.eventually.have.lengthOf(4);
    });
  });

  describe('gitFileTree', function () {
    const fakeResult = '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n' +
      '110563 tree hgv1k3hjd4as76623ff4bf8d0d63c29b784asdbdf8\tapp.js\n' ;

    const mockExecuteGit = function () {
      return new Promise(function (resolve) {
        resolve(fakeResult);
      });
    };

    it('gitFileTree', function () {
      const result = gitModule.gitFileTree(1, 10, mockExecuteGit);
      return expect(result).to.eventually.have.lengthOf(2);
    });
  });

  describe('gitFileContent', () => {
    it('gitFileContent', () => {

    });
  });

});
