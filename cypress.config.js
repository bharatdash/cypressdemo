const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'w2ejkr',
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
    include:["cypress/**/*.js"],
  }
});
