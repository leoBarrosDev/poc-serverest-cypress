const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,

  e2e: {
    baseUrl: 'https://front.serverest.dev',

    retries: {
      runMode: 2,
      openMode: 0,
    },

    env: {
      apiUrl: 'https://serverest.dev'
    },

    setupNodeEvents(on, config) {
    },
  },
});
