const axios = require('axios');
const { expect } = require('chai');
const cs = require('../contants');

let response;
describe("When user wants to list books",() => {
    before(async()=>{
        response = await axios.get(cs.baseUrl+'/books');
    });

    it('Then should return a 200 OK status code',() => {
        expect(response.status).eql(200);
    });

    it('Then return a json as content type',() => {
        expect(response.headers['content-type']).to.contain('application/json');
    });

    it('It should return books with [id,name,author]',() => {
        expect(response.data.length).to.be.greaterThan(0); //By default it's known are 20 books
        const books = response.data;
        books.forEach(book => { //Test all books returned. This is slow depending amount of data, but ensures all books have those properties
            expect(book).to.have.property("id");
            expect(book).to.have.property("name");
            expect(book).to.have.property("author");
        });
    })
});