import {MpCheckoutElements} from '../../elements/MpCheckoutElements';

export const MpCheckoutPage = {
    validateUrl(url) {
        cy.url().should('include', url);
    },
    pay() {
        cy.get(MpCheckoutElements.paymentMethods.pix.option).click();
        cy.get(MpCheckoutElements.finishButton).click();
    }
}