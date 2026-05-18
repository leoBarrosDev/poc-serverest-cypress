const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,

  e2e: {
    baseUrl: 'https://front.serverest.dev',

    retries: {
      runMode: 2,
      openMode: 0,
    },

    env: {
      apiUrl: 'https://serverest.dev',
      defaultPassword: '123456' // Centralizando para facilitar suporte de diferentes ambientes pelo pipeline
    },

    setupNodeEvents(on, config) {
      return config;
    },
  },
});
