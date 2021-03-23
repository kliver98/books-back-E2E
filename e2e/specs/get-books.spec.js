const axios = require('axios');
const { expect } = require('chai');
const cs = require('../contants');

let response;
describe("When user wants to list books",() => {
    before(async()=>{
        response = await axios.get(cs.baseUrl+'/books');
    });

    it('Should return an OK status code',() => {
        expect(response.status).eql(200);
    });

    it('It should return books with [UUID,name,author]',() => {
        expect(response.data.length).to.be.greaterThan(0);
        const books = response.data;
        books.forEach(book => { //Test all books returned. This is slow depending amount of data, but ensures that are not many records
            expect(book).to.have.property("id");
            expect(book).to.have.property("name");
            expect(book).to.have.property("author");
        });
    })
});