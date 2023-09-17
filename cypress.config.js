const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://admin-demo.nopcommerce.com",
    include:["cypress/**/*.js"],
  }
});
