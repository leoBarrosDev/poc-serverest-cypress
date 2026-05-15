const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: 'https://front.serverest.dev',

    env: {
      apiUrl: 'https://serverest.dev'
    },

    setupNodeEvents(on, config) {
    },
  },
});
