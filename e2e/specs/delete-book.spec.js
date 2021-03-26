const axios = require('axios');
const { expect } = require('chai');
const faker = require('faker');
const cs = require('../contants');

let response;
let book = {
    "name":`Test: ${faker.random.words(4)}`,
    "author":`Test: ${faker.name.findName()}`
}

describe("Given a created book wants to delete that book",() => {
    before(async()=>{
        response = await axios.post(cs.baseUrl+'/books',book);
    });

    describe('Given a created book',() => {
        before('When user wants delete that created book',async()=> {
            book.id = response.data.id;
            response = await axios.delete(`${cs.baseUrl}/books/${book.id}`);
        });

        it('Then should return a 200 OK status code',() => {
            expect(response.status).eql(200); //Back has not set to return 204 (recommended), just default 200
        });

        it('Then get books does not retrieve the book',async () => {
            const resp = await axios.get(cs.baseUrl+'/books');
            
            let someMatch = resp.data.some(someBook => someBook.id===book.id);
            expect(someMatch).to.be.false;
        });

        it('Then does not return any content type',() => {
            expect(response.headers['content-type']).to.be.undefined;
        });
    });
});