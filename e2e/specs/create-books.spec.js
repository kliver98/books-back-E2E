const axios = require('axios');
const { expect } = require('chai');
const { random } = require('faker');
const BASE_URL = 'https://books-back-qa.herokuapp.com';
import {createUUID as UUID} from '../../util/functions';

let response;

const book = {
    "id":UUID(),
    "name":`Mrs. ${random.words(4)}`,
    "author":``
}
describe("When user wants to create a book",() => {
    before(async()=>{
        response = await axios.post(BASE_URL+'/books',book);
    });

    it('Then return a created status code',() => {
        expect(response.status).eql(201);
    });

    it('Then return the created animal',() => {
        const createdBook = response.data;
        expect(createdBook.id).eql(book.id);
        expect(createdBook.name).eql(book.name);
        expect(createdBook.author).eql(book.author);
    });
    
    it('Then return a json as content type',() => {
        //console.log(response.headers)
        expect(response.headers['content-type']).to.contain('application/json');
    });
});