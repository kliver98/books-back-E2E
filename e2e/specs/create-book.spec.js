const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../contants');

let response;

const book = {
    "name":`Test: ${faker.random.words(4)}`,
    "author":`Test: ${faker.name.findName()}`
}

describe("When user wants to create a book",() => {
    before(async()=>{
        response = await axios.post(cs.baseUrl+'/books',book);
    });

    after(async() => {
        await axios.delete(`${cs.baseUrl}/books/${response.data.id}`);
    });

    it('Then should return a 200 OK status code',() => {
        expect(response.status).eql(200); //Back has not set to return 201, just default 200
    });

    it('Then should return book with [id,name,author]',() => {
        const resBook = response.data;
        expect(resBook).to.have.property("id");
        expect(resBook).to.have.property("name");
        expect(resBook).to.have.property("author");
    })

    it('Then return a json as content type',() => {
        expect(response.headers['content-type']).to.contain('application/json');
    });

    it('Then return the created book',() => {
        const createdBook = response.data;
        expect(createdBook.name).eql(book.name);
        expect(createdBook.author).eql(book.author);
    });
    
});