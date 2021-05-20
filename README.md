Basic implementation of [Marvel API](https://developer.marvel.com) using Node.js and Redis

## Dependencies
* Node.js 14
* Yarn
* Express
* Jest
* Redis

## Setup (Ubuntu)
Will need Marvel API privateKey and publicKey to work
* Register in [Marvel Developer website](https://developer.marvel.com/)
* Get the public key and private key
* Put them in `config/default.json`

Installing dependencies and running the server
* Install [Redis](https://redis.io/download#from-the-official-ubuntu-ppa), then run it by executing `redis-server` in terminal
* Install [Node](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)
* Install [Yarn](https://yarnpkg.com/getting-started/install#about-global-installs)
* Clone this repo
* Execute `yarn` in the repo directory
* If you haven't started Redis yet, you can do so via `yarn start:cache`
* Start the Node server via `yarn start`

Testing the API endpoints
* There are two API endpoints: "localhost:8080/characters" and "localhost:8080/characters/{characterId}"
* First, open the "localhost:8080/characters". The page will initially takes a long time to load as it attempts to fetch all Marvel characters
* Once the page has completely loaded, pick one characterId, let's say 1010354
* Open "localhost:8080/characters/1010354", it will load a short bio of a Marvel character with that id

## Caching
The caching strategy is to simply store character data for one day. On each list API call, check if number of character in cache is less than the number of character in Marvel API. If true, then attempt to fetch all Marvel characters.

By relying only on number of character, this caching strategy is very simple. This is done with the assumption that the data are not frequently updated and even if the cache is stale, the important information are not urgent to require re-fetching the updated data immediately.
