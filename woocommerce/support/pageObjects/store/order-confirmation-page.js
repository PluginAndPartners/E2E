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
    IframePage.getIframeElementName("iframe", "iframeErrorMessage").should(
      "not.exist"
    );
  },
};
