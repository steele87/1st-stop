process.env.NODE_ENV = 'development';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);

describe('update preferences', () => {
  it('retuns object with new preferences', () => {
    return request
      .put('/api/marketing_consent/166445')
      .send({
        'sms': 'yes',
        'email': 'yes',
        'telephone': 'yes',
        'post': 'yes',
        'id': '166445'
      })
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('object');
        expect(res.body.info[0].sms).to.equal('yes');
      });
  });
  it('returns error message if request can not be completed', () => {
    return request
      .put('/api/marketing_consent/1665445')
      .send({
        'sms': 'yes',
        'email': 'yes',
        'telephone': 'yes',
        'post': 'yes',
        'id': 'dfsgh'
      })
      .expect(400)
      .then(res => {
        expect(res.body.message).to.equal('Please ensure a valid ID number is used');
      });
  });
});