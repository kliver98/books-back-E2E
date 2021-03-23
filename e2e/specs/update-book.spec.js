const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../contants');

let response;
let book = {
    "name":`Test: ${faker.random.words(4)}`,
    "author":`Test: ${faker.name.findName()}`
}

let updatedBook = {
    "name":`Test: ${faker.random.words(4)} updated`,
    "author":book.author
}

describe('Given a created book wants to update a book', () => {
    before(async() => {
        response = await axios.post(cs.baseUrl+'/books',book);
    });

    describe('Given a created book',()=> {
        before('When user wants update book',async()=> {
            updatedBook.id = response.data.id;
            response = await axios.put(`${cs.baseUrl}/books/${updatedBook.id}`,updatedBook);
        });

        it('Then status code should be 200',() => {
            expect(response.status).eql(200);
        });
    });
});