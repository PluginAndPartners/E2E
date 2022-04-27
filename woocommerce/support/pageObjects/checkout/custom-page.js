import { CheckoutElements } from "./../../elements/checkout/checkout-elements";
import { IframePage } from "./iframe-page";

export const CheckoutCustomPage = {
  selectPaymentMethod() {
    cy.get(CheckoutElements.paymentMethods.creditCard.radio).click({
      force: true,
    });
  },

  checkElement(element) {
    cy.get(CheckoutElements.paymentMethods.creditCard[element], {
      force: true,
    }).should("be.visible");
  },

  checkIframeElement(parent, child) {
    IframePage.getIframeElementName(parent, child, {
      force: true,
    }).should("be.visible");
  },

  isThumbnailCard() {
    cy.get(CheckoutElements.paymentMethods.creditCard.cardNumberDiv).should(
      "have.attr",
      "style"
    );
  },

  cvvDigitsInformation(site) {
    const envs = Cypress.env(site);
    cy.get(
      CheckoutElements.paymentMethods.creditCard.cvvDigitsInformation
    ).contains(envs.cards.amex.digits);
    cy.get(
      CheckoutElements.paymentMethods.creditCard.cvvDigitsInformation
    ).contains(envs.cards.amex.side);
  },

  clickWalletButton() {
    cy.get(CheckoutElements.paymentMethods.creditCard.walletButton).click({
      force: true,
    });
  },

  fillWalletButton(site) {
    cy.wait(4000);
    const envs = Cypress.env(site);

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#button_popup > span"
    ).click({ force: true });

    this.fillIframeElement(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#user_id",
      envs.user.email
    );

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#login_user_form > div.login-form__actions > button > span"
    ).click({ force: true });

    this.fillIframeElement(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#password",
      envs.user.password
    );

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#action-complete > span"
    ).click({ force: true });
  },

  payWithWalletButton() {
    cy.wait(4000);

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#pay"
    ).click({ force: true });

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#continue_button"
    ).click({ force: true });
  },

  selectInstallment() {
    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsRadio)
      .eq(1)
      .check({ force: true });
  },

  fillIframeElement(field, value) {
    cy.wait(2000);
    IframePage.getIframeElementName(`iframe[name=${field}]`, `#${field}`).type(
      value,
      { force: true }
    );
  },

  fillElement(field, value) {
    cy.get(CheckoutElements.paymentMethods.creditCard[field]).type(value);
  },

  isEmptyIframeField(field) {
    IframePage.getIframeElementName(
      `iframe[name=${field}]`,
      `#${field}`
    ).should("have.value", "");
  },
};
