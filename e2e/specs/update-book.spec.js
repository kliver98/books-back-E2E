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

    after(async() => {
        await axios.delete(`${cs.baseUrl}/books/${response.data.id}`);
    });

    describe('Given a created book',()=> {
        before('When user wants update book',async()=> {
            updatedBook.id = response.data.id;
            response = await axios.put(`${cs.baseUrl}/books/${updatedBook.id}`,updatedBook);
        });

        it('Then should return a 200 OK status code',() => {
            expect(response.status).eql(200);
        });

        it('Then return the updated book',() => {
            const update = response.data;
            expect(update.name).eql(updatedBook.name);
            expect(update.author).eql(updatedBook.author);
        });
        
        it('Then return a json as content type',() => {
            expect(response.headers['content-type']).to.contain('application/json');
        });
    });
});