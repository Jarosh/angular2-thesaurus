process.env.NODE_ENV = 'test';
process.env.PORT = 3000;
process.env.AKEY = 'qwerty';
process.env.MOCK = true;

let server = require('../server');
let chai = require('chai');
let expect =  require('chai').expect;
let should = require('chai').should();

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
    it('it should return valid mock', (done) => {
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
    it('it should return valid mock', (done) => {
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

  describe('GET /words/cthulhu', () => {
    it('it should return \'unauthorized\' code', (done) => {
      chai.request(server)
        .get('/words/Cthulhu')
        .end((err, res) => {
          expect(res).to.be.json;
          res.should.have.status(403);
          done();
        });
    });
  });

});
