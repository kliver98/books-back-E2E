const axios = require('axios');
const { expect } = require('chai');
const cs = require('../contants');

let book = {}

describe('When user wants to create a book providing not allowed values',() => {
    describe('When name of book its an array',() => {

        it('Then should return a 400 Bad Request status code',async() => {
            book = {
                'name':[],
                'author':'Test'
            }
            await axios.post(cs.baseUrl+'/books',book).catch(err => {
                expect(err.response.status).to.equal(400)
            });
        });

    });

    describe('When author of book its an array',() => {

        it('Then should return a 400 Bad Request status code',async() => {
            book = {
                'name':'Test',
                'author':[]
            }
            await axios.post(cs.baseUrl+'/books',book).catch(err => {
                expect(err.response.status).to.equal(400)
            });
        });

    });

    describe('When both name and author of book are arrays',() => {

        it('Then should return a 400 Bad Request status code',async() => {
            book = {
                'name':[],
                'author':[]
            }
            await axios.post(cs.baseUrl+'/books',book).catch(err => {
                expect(err.response.status).to.equal(400)
            });
        });

    });
    
});