import { CheckoutElements } from "./../../elements/checkout/checkout-elements";

export const CheckoutTicketPage = {
  selectPaymentMethod() {
    cy.get(CheckoutElements.paymentMethods.checkoutTicket.radio).click({
      force: true,
    });
  },

  checkElement(element) {
    let selector =
      typeof CheckoutElements[element] != "undefined"
        ? CheckoutElements[element]
        : CheckoutElements.paymentMethods.checkoutTicket[element];

    cy.get(selector, { force: true }).should("be.visible");
  },

  checkTranslation(element, expectedText) {
    let selector =
      typeof CheckoutElements[element] != "undefined"
        ? CheckoutElements[element]
        : CheckoutElements.paymentMethods.checkoutTicket[element];

    cy.get(selector).last().should("have.text", expectedText);
  },

  checkDocumentsValues(site) {
    cy.fixture("user-documents").then((documents) => {
      let documentsTypes = documents[site];

      cy.get(CheckoutElements.paymentMethods.checkoutTicket.documentSelect)
        .last()
        .find("option")
        .should("have.length", documentsTypes.length)
        .then((options) => {
          let option = [...options].map((o) => o.value);
          expect(option).to.deep.eq(documentsTypes);
        });
    });
  },

  checkPaymentMethodsValues(site) {
    cy.fixture("payment-methods-off").then((paymentMethods) => {
      let paymentMethodsTypes = paymentMethods[site];

      cy.get(CheckoutElements.paymentMethods.checkoutTicket.paymentMethodsList)
        .last()
        .find(CheckoutElements.paymentMethods.checkoutTicket.paymentMethodsText)
        .should("have.length", paymentMethodsTypes.length)
        .then((items) => {
          let item = [...items].map((o) => o.innerText);
          expect(item).to.deep.eq(paymentMethodsTypes);
        });
    });
  },

  fillDocument(documentType, site, documentValue = null) {
    let envs = Cypress.env(site);
    let document = !documentValue ? envs.document[documentType] : documentValue;

    cy.get(CheckoutElements.paymentMethods.checkoutTicket.documentSelect)
      .last()
      .select(documentType.toUpperCase(), { force: true });

    cy.get(CheckoutElements.paymentMethods.checkoutTicket.documentInput)
      .last()
      .type(document, { force: true });
  },

  selectPaymentMethodOption(paymentMethod) {
    cy.get(
      CheckoutElements.paymentMethods.checkoutTicket.paymentMethodsRadio
    ).check(paymentMethod, { force: true });
  },

  finishCheckout() {
    cy.get(CheckoutElements.finishButton, { setTimeout: 4000 }).click({
      force: true,
    });
    cy.on("uncaught:exception", () => false);
  },
};
