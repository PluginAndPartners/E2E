import { CheckoutElements } from "../../elements/checkout/checkout-elements";
import { IframePage } from "./iframe-page";

export const CheckoutCustomPage = {
  selectPaymentMethod() {
    cy.debug();
    cy.get(CheckoutElements.paymentMethods.creditCard.radio).click({
      force: true,
    });
  },

  checkElement(element) {
    cy.get(CheckoutElements.paymentMethods.creditCard[element], {
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
    ).contains(envs.cards.master.digits);
    cy.get(
      CheckoutElements.paymentMethods.creditCard.cvvDigitsInformation
    ).contains(envs.cards.master.side);
  },

  isDocumentInput() {
    cy.get(CheckoutElements.paymentMethods.creditCard.documentInput, {
      force: true,
    }).should("be.visible");
  },

  isInstallments() {
    cy.get(CheckoutElements.paymentMethods.creditCard.installmentsSelect, {
      force: true,
    }).should("be.visible");
  },

  fillCardNumber(site) {
    const envs = Cypress.env(site);
    IframePage.getIframeElementName(
      "iframe[name=cardNumber]",
      "#cardNumber"
    ).type(envs.cards.master.number, { force: true });
  },

  fillCvv(site) {
    const envs = Cypress.env(site);
    IframePage.getIframeElementName(
      "iframe[name=securityCode]",
      "#securityCode"
    ).type(envs.cards.master.cvv, { force: true });
  },

  fillExpirationDate(site) {
    const envs = Cypress.env(site);
    IframePage.getIframeElementName(
      "iframe[name=expirationDate]",
      "#expirationDate"
    ).type(envs.cards.master.expirationDate, { force: true });
  },

  fillCardHolderName(cardFullName) {
    cy.wait(1000);
    cy.get(CheckoutElements.paymentMethods.creditCard.nameInput).type(
      cardFullName,
      { force: true }
    );
  },

  fillInstallments(site) {
    const envs = Cypress.env(site);
    cy.get(CheckoutElements.paymentMethods.creditCard.firstInstallment).click({
      force: true,
    });
  },

  fillDocument(site) {
    const envs = Cypress.env(site);
    cy.get(CheckoutElements.paymentMethods.creditCard.documentInput).type(
      envs.document.cpf,
      { force: true }
    );
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

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#user_id"
    ).type(envs.user.email, { force: true });

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#user_id"
    ).type(envs.user.email, { force: true });

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#login_user_form > div.login-form__actions > button > span"
    ).click({ force: true });

    IframePage.getIframeElementName(
      CheckoutElements.paymentMethods.creditCard.walletButtonIframe,
      "#password"
    ).type(envs.user.password, { force: true });

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
};
