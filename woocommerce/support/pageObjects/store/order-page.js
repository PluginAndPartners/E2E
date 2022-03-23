import {StoreOrderElements} from '../../elements/store/order-elements';

const orderPage = Cypress.config("orderPageUrl");

export const StoreOrderPage = {
    accessOrderPage() {
        cy.visit(orderPage)
    },

    accessLastOrder() {
        cy.get(StoreOrderElements.orderList).children().eq(0).then(lastOrderRow => {
            cy.get(lastOrderRow).children().eq(1).then(lastOrderColumn => {
                cy.get(lastOrderColumn).children().eq(1).then(lastOrderLink => {
                    cy.get(lastOrderLink).click();
                });
            });
        });
    },

    checkPaymentStatusBox(title) {
        cy.get(StoreOrderElements.alertImage, {force: true}).should('be.visible');
        cy.get(StoreOrderElements.alertTitle, {force: true}).contains(title);
    },
}
