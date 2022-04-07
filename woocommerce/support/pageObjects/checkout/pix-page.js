import {CheckoutElements} from '../../elements/checkout/checkout-elements';

export const CheckoutPixPage = {
    selectPaymentMethod() {
        cy.get(CheckoutElements.paymentMethods.checkoutPix.radio).click({force: true});
    },
    getQRCode() {
        cy.get('[data-cy=qrcode-pix]').should("exist");
    },
}