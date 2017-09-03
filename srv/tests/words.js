process.env.NODE_ENV = 'test';
process.env.PORT = 3000;
process.env.AKEY = 'qwerty';
process.env.MOCK = true;

let server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect =  require('chai').expect;
let should = chai.should();

chai.use(chaiHttp);

describe('Thesaurus', () => {
  
  describe('GET /words', () => {
    it('it should not exist', (done) => {
      chai.request(server)
        .get('/words')
        .end((err, res) => {
          expect(res).to.be.html;
          res.should.have.status(404);
          done();
        });
    });
  });
  
  describe('GET /words/example', () => {
    it('it should return mock', (done) => {
      chai.request(server)
        .get('/words/work')
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          done();
        });
    });
  });

});
