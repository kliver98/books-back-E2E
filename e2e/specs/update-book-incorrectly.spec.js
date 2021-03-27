const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../contants');

describe('When user wants to update a book without providing id', () => {

    it('Then should return a 405 Method Not Allowed status code',async () => {
        let id = '';
        await axios.put(`${cs.baseUrl}/books/${id}`).then(() => {
            expect(false).to.be.true; //If id it's empty and enter here, it's wrong
        }).catch(err => {
            expect(err.response.status).to.equal(405)
        });
    });

});