# books-back-E2E
Repository to test books-back-qa

Steps to execute the test (Only executes on console so there it's no headless or ui mode):
- `git clone https://github.com/kliver98/books-back-E2E`
- `cd books-back-E2E`
- `npm i`
- `npm test`
- See on console the outputs

To be aware of some assertions and annotations I made in this exercise, please read READ.txt

## How does workflow work to Continuous Deployment?:
1. Developer code on main repository https://github.com/kliver98/books-back creating a branch from qa-staging
> If they make a PR from their braches to qa-staging, then code will be deployed in qa-staging [https://books2testing-qa.herokuapp.com/dashboard]
2. E2E test are coded in test repository https://github.com/kliver98/books-back-e2e in a new brach, different from main
> When tests are done in test repository, tester make a PR to main branch in test repository
> If tests pass, then a dispatch event will send to https://github.com/kliver98/books-back for merge qa-staging branch and main of that other repository
3. And it's done :) Now changes with their approved tests will be deployed in production
