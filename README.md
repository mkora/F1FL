# F1FL

Node.js, Express, MySQL, React

## Overview

Formula 1 Fastest Lap Visualization Tool

## Notes

- F1 data provided by [Ergast F1](http://ergast.com/mrd/)

- Provides [Sequelize](https://github.com/sequelize/sequelize), [Sequelize-CLI](https://github.com/sequelize/cli) and [Sequelize-Auto](https://github.com/sequelize/sequelize-auto) support

- Configured to transpile ES2015, ES2016, ES2017 stage-3 code

- Uses `morgan` as a HTTP request logger and `winston` as a logger for everything else

- Loads environment variables from `.env` file

- Uses [react-vis](https://github.com/uber/react-vis) and [material-ui](https://material-ui.com)

## Screenshots

![Fastest Lap](https://user-images.githubusercontent.com/31717889/45991395-a04efc80-c039-11e8-96d8-4ad933d5131c.png)

## Quick Start

1. Install dependencies

  ```
  npm i
  ```

2. Run the server

  - Run the server & the client

  ```
  npm start
  ```

  - Run the dev server (uses nodemon):

  ```
  npm run devstart
  ```

  - Run the create-react-app server

  ```
  npm run client
  ```

  - Run the api server

  ```
  npm run server
  ```

  - Browse at http://localhost:3000

  - NOTE: to change default proxy value (http://localhost:3030) modify src/react/package.json

3. Run scripts

  ```
  # Run build
  npm run build
  # Run tests
  npm test
  # Alias for sequelize-cli
  npm run sqlze [command]
  # Autogenerate models for Sequelize via the command line
  npm run sqlze-gen -- -d [dbname] -h [localhost] -u [username] -p [port] -x [password] -e mysql
  ```

## API Endpoints

  NOTE: Use GET method to retrieve data

  NOTE: Add `Accept: application/json` header

  - Call `/api/curcuits` to retrieve all circuits info
  
    For example, `/api/curcuits`

  - Call `/api/laps` to retrieve fastest laps info by circuit
  
    For example, `/api/laps?id=1,2,3`

    NOTE: `id` can be an array of circuit ids
