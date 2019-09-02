const app = require('../app');
const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const playstore = require("../playstore");

describe('App.js', () => {
    it('GET /apps should return an array with length of 20 and equal to the full STORE', () => {
        return request(app)
            .get("/apps")
            .expect(200)
            .then(res => {
                expect(res.body).to.be.an("array");
                expect(res.body).to.have.lengthOf(20);
                expect(res.body).to.eql(playstore);
            });
    });
    it('GET /apps with query.genres=arcade should return an array with length of 3', () => {
        return request(app)
            .get('/apps')
            .query({genres:'arcade'})
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf(3);
                expect(res.body).to.deep.include(playstore[1]);
                const storeApp = res.body[0];
                expect(storeApp).to.include.all.keys('App', 'Category', 'Rating');
            })
    });
    it('should be 400 if sort is not App or Rating', () => {
        return request(app)
            .get('/apps')
            .query({sort:'MISTAKE'})
            .expect(400, 'Sort must be one of App or Rating');
    })
});

