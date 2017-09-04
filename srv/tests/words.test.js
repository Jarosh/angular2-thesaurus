process.env.NODE_ENV = 'test';
process.env.PORT = require('../config').arg.port;
process.env.AKEY = require('../config').arg.akey;
process.env.MOCK = true;

const server = require('../server');
const chai = require('chai');
const expect =  require('chai').expect;
const should = require('chai').should();

chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));


var wordsApiResponseSchema = {
  title: 'Words API response schema',
  type: 'object',
  required: ['word', 'results'],
  properties: {
    word: {
      type: 'string'
    },
    results: {
      type: 'array',
      minItems: 1,
      uniqueItems: true,
      items: {
        type: 'object',
        required: ['definition', 'partOfSpeech'],
        properties: {
          definition: {
            type: 'string'
          },
          partOfSpeech: {
            type: 'string'
          },
          synonyms: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          examples: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
        }
      }
    }
  }
};


describe('Thesaurus', () => {

  describe('GET /words', () => {
    it('root /words path should not exist', (done) => {
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
    it('example / it should return valid mock', (done) => {
      chai.request(server)
        .get('/words/example')
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body).to.be.jsonSchema(wordsApiResponseSchema);
          done();
        });
    });
  });

  describe('GET /words/work', () => {
    it('work / it should return valid mock', (done) => {
      chai.request(server)
        .get('/words/work')
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body).to.be.jsonSchema(wordsApiResponseSchema);
          done();
        });
    });
  });

  describe('GET /words/dog', () => {
    it('dog / it should return valid real data', (done) => {
      chai.request(server)
        .get('/words/dog')
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(200);
          res.body.should.be.a('object');
          expect(res.body).to.be.jsonSchema(wordsApiResponseSchema);
          done();
        });
    });
  });

  describe('GET /words/cthulhu', () => {
    it('cthulhu / it should return 404 (not found) code', (done) => {
      chai.request(server)
        .get('/words/Cthulhu')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

});
