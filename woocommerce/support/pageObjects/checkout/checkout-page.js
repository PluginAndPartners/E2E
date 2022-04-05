import { CheckoutElements } from "../../elements/checkout/checkout-elements";

export const CheckoutPage = {
  fillPersonalData(site) {
    cy.fixture("users").then(users => {
      let user = users[site];
      let envs = Cypress.env(site);
      cy.get(CheckoutElements.billingForm.firstNameInput).clear().type(user.firstName);
      cy.get(CheckoutElements.billingForm.lastNameInput).clear().type(user.lastName);
      cy.get(CheckoutElements.billingForm.countrySelect).select(user.countryAcronym,{ force: true });
      cy.get(CheckoutElements.billingForm.addressInput).clear().type(user.address);
      cy.get(CheckoutElements.billingForm.cityInput).clear().type(user.city);
      cy.get(CheckoutElements.billingForm.stateSelect).select(user.stateAcronym,{ force: true });
      cy.get(CheckoutElements.billingForm.zipcodeInput).clear().type(user.zipcode, { force: true });
      cy.get(CheckoutElements.billingForm.phoneInput).clear().type(user.phone);
      cy.get(CheckoutElements.billingForm.emailInput).clear().type(envs.user.email);
    });
  },

  finishCheckout() {
    cy.get(CheckoutElements.finishButton, { setTimeout: 4000 }).click();
    cy.on("uncaught:exception", () => false);
  },
};
