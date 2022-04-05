import { IframePage } from "./../checkout/iframe-page";
import { OrderConfirmationElements } from "./../../elements/store/order-confirmation-elements";

export const StoreOrderConfirmationPage = {
  validateUrl(url) {
    cy.url().should("include", url);
  },

  checkElement(element, cho) {
    let path = OrderConfirmationElements.paymentMethods[cho];

    cy.get(path[element], {
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
