import {MpOrderConfirmationElements} from './../../elements/mp/order-confirmation-elements';

export const MpOrderConfirmationPage = {
    backToStore() {
        cy.get(MpOrderConfirmationElements.backToStoreButton).click();
    },
}