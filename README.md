# F1FL

Node.js, Express, Mongo

## Overview

Formula 1 Fastest Lap Visualization Tool

## Notes

- F1 data provided by [Ergast F1](http://ergast.com/mrd/)

- Provides [Sequelize](https://github.com/sequelize/sequelize), [Sequelize-CLI](https://github.com/sequelize/cli) and [Sequelize-Auto](https://github.com/sequelize/sequelize-auto) support

- Uses `morgan` as a HTTP request logger and `winston` as a logger for everything else

- Loads environment variables from `.env` file

- Uses `error-handler`

- Controllers should be added to `controllers` folder

- Linter config extends airbnb's

- Added `chai-http` to test api calls

## Quick Start

1. Install dependencies

  ```
  npm i
  ```

2. Run the server

  - Boot from the top-level directory

  ```
  LOG_LEVEL=debug npm start
  ```

  - Dev server (uses nodemon):

  ```
  PORT=3030 LOG_LEVEL=debug npm run devstart
  ```

  - Browse at http://localhost:3030

3. Run scripts

  ```
  # Run tests
  npm test
  # Alias for sequelize-cli
  npm run sqlze [command]
  # Auto generate models for Sequelize via the command line
  npm run sqlze-gen -- -d [dbname] -h [localhost] -u [username] -p [port] -x [password] -e mysql
  ```

## API Endpoints

  Note: Use GET method to retrieve data
  
  - Call /pulse to see 'It works!'
  
    For example, `/pulse`
