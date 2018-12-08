// Require the dev-dependencies
const chai = require('chai');
const supertest = require('supertest');
const expect = chai.expect;
const {DIALECTS} = require('db-connectors');

/* eslint-disable */
const should = chai.should();
/* eslint-enable */

const server = require('../../app')
const request = supertest(server);


describe('Common ', () => {


    it('it should successfully get dialects', async (done) => {
        try {
            const res = await request.get('/common/dialects');
            expect(res.status).to.equal(200);
            res.body.should.be.a('array');
            done();
        } catch (err) {
            done(err);
        }
    });

    it('it should successfully get dialects', async (done) => {
        try {
            const res = await request.get(`/common/schema/${DIALECTS.MYSQL}`);
            expect(res.status).to.equal(200);
            res.body.should.be.a('array');
            done();
        } catch (err) {
            done(err);
        }
    });


});