const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const BASE_URL = 'https://books-back-qa.herokuapp.com';

let response;

const book = {
    "name":`Test: ${faker.random.words(4)}`,
    "author":`Test: ${faker.name.findName()}`
}
describe("When user wants to create a book",() => {
    before(async()=>{
        response = await axios.post(BASE_URL+'/books',book);
    });

    it('Then return a created status code',() => {
        expect(response.status).eql(200); //Back has not set to return 201, just default 200
    });

    it('Then return the created book',() => {
        const createdBook = response.data;
        expect(createdBook.name).eql(book.name);
        expect(createdBook.author).eql(book.author);
    });
    
    it('Then return a json as content type',() => {
        expect(response.headers['content-type']).to.contain('application/json');
    });
});