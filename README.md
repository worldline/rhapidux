# Rhapidux

## Work in progress

This aims at being a bootstrap based on recommended technologies like node.js, hapi, react, redux, postcss, ...

This is **NOT** ready for production and still contains bugs, work is ongoing.

## First installation

To run it, you'll need [NodeJS](https://nodejs.org/download/release/latest/) (4.0+) and NPM (all-in-one package under Windows).

Once you've retrieved the code, open a terminal in the containing folder.

Then run:

    npm install

You'll need a network access for that. So if you're behind a proxy,
don't forget to set the `HTTP_PROXY` and `HTTPS_PROXY` environment variables.

## Execution

To run the project, use NPM shortcut:

    npm run start

It will start a development server hosting on http://localhost:8080.

This server has hot module reloading capabilities, so if you change anything in the code,
any opened browser will be automatically reloaded, keeping the application state
as much as possible.

## Development

When developing, you should open another terminal in the containing folder,
and run command:

    npm run test-client

This will continuously run your client tests, relaunching them on every file changes.

You will be able to access the test results on http://localhost:8000/webpack-dev-server/test.bundle

You can also run them with [Karma](http://karma-runner.github.io) on real browsers by running command:

    npm run test-browser

A coverage report is also created when running Karma, and available under the `coverage` folder.

You should also configure your IDE to use [ESLint rules](http://eslint.org) (configuration file is `.eslintrc`).

But if you want/can not use it, you can run it separately with:

    npm run lint
