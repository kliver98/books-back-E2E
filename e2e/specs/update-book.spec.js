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

describe('Given a created book wants to update that book', () => {
    before(async() => {
        response = await axios.post(cs.baseUrl+'/books',book);
    });

    after(async() => {
        await axios.delete(`${cs.baseUrl}/books/${response.data.id}`);
    });

    describe('Given a created book',()=> {
        before('When user wants to update that book',async()=> {
            updatedBook.id = response.data.id;
            response = await axios.put(`${cs.baseUrl}/books/${updatedBook.id}`,updatedBook);
        });

        it('Then should return a 200 OK status code',() => {
            expect(response.status).eql(200);
        });

        it('Then should return book with [id,name,author]',() => {
            const resBook = response.data;
            expect(resBook).to.have.property("id");
            expect(resBook).to.have.property("name");
            expect(resBook).to.have.property("author");
        })

        it('Then return the updated book',() => {
            const resUpdatedBook = response.data;
            expect(resUpdatedBook.name).eql(updatedBook.name);
            expect(resUpdatedBook.author).eql(updatedBook.author);
        });
        
        it('Then return a json as content type',() => {
            expect(response.headers['content-type']).to.contain('application/json');
        });
    });
});