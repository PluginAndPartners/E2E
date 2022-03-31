import { IframePage } from "./../checkout/iframe-page";
import { OrderConfirmationElements } from "./../../elements/store/order-confirmation-elements";

export const StoreOrderConfirmationPage = {
  validateUrl(url) {
    cy.url().should("include", url);
  },

  checkElement(element) {
    cy.get(OrderConfirmationElements.paymentMethods.checkoutTicket[element], {
      force: true,
    }).should("be.visible");
  },

  checkIframe() {
    IframePage.getIframeElementName(
      OrderConfirmationElements.paymentMethods.checkoutTicket.iframe,
      OrderConfirmationElements.paymentMethods.checkoutTicket.iframeErrorMessage
    ).should("not.exist");
  },

  errorPaymentMessage(message) {
    cy.get(OrderElements.errorPaymentMessage, { force: true }).should(
      "be.visible"
    );
    cy.get(OrderElements.errorPaymentMessage, { force: true }).contains(
      message
    );
  },

  espera() {
    cy.pause();
  },
};
