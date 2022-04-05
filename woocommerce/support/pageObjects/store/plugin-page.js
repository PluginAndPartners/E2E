import { PluginElements } from "./../../elements/store/plugin-elements";

const pluginPage = Cypress.config("pluginPageUrl");

export const StorePluginPage = {
  accessPluginPage() {
    cy.visit(pluginPage);
  },

  createIntegration(site) {
    const envs = Cypress.env(site);

    cy.get(PluginElements.integrationAccordion).click({ force: true });
    cy.get(PluginElements.testMode.publicKey).clear().type(envs.store.testCredentials.publicKey);
    cy.get(PluginElements.testMode.accessToken).clear().type(envs.store.testCredentials.accessToken);
    cy.get(PluginElements.prodMode.publicKey).clear().type(envs.store.prodCredentials.publicKey);
    cy.get(PluginElements.prodMode.accessToken).clear().type(envs.store.prodCredentials.accessToken);

    cy.get(PluginElements.integrationSaveButton).click({ force: true });
  },

  changeStoreMode(mode) {
    let modeElement = mode == 'produção' ? 'prodMode' : 'testMode'

    cy.get(PluginElements.modeAccordion).click({ force: true });
    cy.get(PluginElements[modeElement].radioMode).check().should("be.checked");
    cy.get(PluginElements.modeSaveButton).click({ force: true });
  },
};
