const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'w2ejkr',
  watchForFileChanges: false, //Whether Cypress will watch and restart tests on test file changes.
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      reporter: 'mochawesome'
      reporterOptions: {
        reportDir: 'cypress/results'
        overwrite: false
        html: true
        json: true
      }
    },
    baseUrl: "https://admin-demo.nopcommerce.com",
    include:["cypress/**/*.js"], //Which tests to include in the test runners list
    defaultCommandTimeout: 4000, //to wait until most DOM based commands are considered timed out. Defaul 4000
    pageLoadTimeout: 120000, //Time, in milliseconds, to wait for page transition events Default 60000
    requestTimeout: 10000,
    responseTimeout : 60000,
    chromeWebSecurity: false, //Chromium-based browser's Web Security for same-origin policy and insecure mixed content.
    viewportHeight:660,
    viewportWidth: 1000, //Default width in pixels for the application under tests' viewport.
    waitForAnimations:true,
    scrollBehavior:'bottom',
  }
});
