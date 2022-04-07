import {CheckoutElements} from '../../elements/checkout/checkout-elements';

export const CheckoutProPage = {
    selectPaymentMethod() {
        cy.get(CheckoutElements.paymentMethods.checkoutPro.radio).click({force: true});
    },
}