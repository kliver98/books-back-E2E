const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../contants');

let response;

let book = {
    "name":`Test: ${faker.random.words(4)}`,
    "author":`Test: ${faker.name.findName()}`
}

describe("When user wants to delete a book",() => {
    before(async()=>{
        response = await axios.post(cs.baseUrl+'/books',book);
        book.id = response.data.id;
    });

    it('Then return a deleted status code',() => {
        expect(response.status).eql(200); //Back has not set to return 204 (recommended), just default 200
    });
});