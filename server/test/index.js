import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

const { expect } = chai;

chai.use(chaiHttp);

describe('F1 fastest lap endpoints', () => {
  describe('GET /notfound', () => {
    it('it should return 404 ERROR', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/circuits', () => {
    it('it should list of curcuits', (done) => {
      chai.request(server)
        .get('/api/circuits')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });

  describe('GET /api/laps?id=1,2,3', () => {
    it('it should fastest laps by years', (done) => {
      chai.request(server)
        .get('/api/laps?id=1,2,3')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.have.property('data');
          done();
        });
    });
  });  
});

