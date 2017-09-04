# Angular2 Thesaurus

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.0.

## Configuration

The only config value that is recommended to change once the repo was checked out is `arg.akey` inside of the `srv/config.js` file.
By obvious reasons it was considered to be unsafe to expose any real API keys and thus a stub value was used there.

## REST API server

Run either `npm run api-start` or if arguments needed `node srv/server.js [ port [ mashape-key [ use-mocks ] ] ]` e.g. `node srv/server.js 3000 qwerty true`

With `use-mocks` option set to either `1` or `true` local mocks will be used for the following two words: 'example', 'work';
hence guaranteeing positive response for those two words even if invalid mashape key was provided.

## REST API server testing

Run `npm run api-test`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
