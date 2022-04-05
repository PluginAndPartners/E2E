import { StoreElements } from "../../elements/store/store-elements";

const wooConfiguration = Cypress.config("wooConfigurationPageUrl");
const wordpressConfiguration = Cypress.config("wordpressConfigurationPageUrl");

export const ConfigurationPage = {
  accessConfigurationPage(page) {
    cy.visit(page === "woocommerce" ? wooConfiguration : wordpressConfiguration);
  },

  setStoreLanguage(language) {
    cy.get("#WPLANG").select(language, {force: true});
    cy.get(StoreElements.wordpressConfiguration.saveButton).click({ force: true });
  },

  setStoreCurrency(language) {
    cy.get('#woocommerce_currency').select(language, {force: true});
    cy.get(StoreElements.woocommerceConfiguration.saveButton).click({ force: true });
  }
};
