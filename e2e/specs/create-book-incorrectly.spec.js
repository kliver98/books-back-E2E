const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../contants');

let response;

axios.defaults.headers['Origin'] = 'https://books2testing-qa-not.herokuapp.com';
const book = {
    "name":`Test: ${faker.random.words(4)}`,
    "author":`Test: ${faker.name.findName()}`
}

describe("When user wants to create a book from not allowed origin",() => {
    before(async()=>{
        response = await axios.post(cs.baseUrl+'/books',book);
        console.log('Hello')
    });

    it.only('Then should return a 403 Forbidden status code',() => {
        console.log(axios.defaults.headers)
        expect(response.status).eql(403);
    });

    it('Then should ',() => {
        console.log(response)
    })
    
});