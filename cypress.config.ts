import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: '**/*.cy.ts',
    setupNodeEvents(on, config) {
    },
  },
});
