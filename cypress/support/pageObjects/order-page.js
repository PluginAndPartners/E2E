import {OrderElements} from '../elements/order-elements';

const orderPage = Cypress.config("orderPageUrl");

export const OrderPage = {
    accessOrderPage() {
        cy.visit(orderPage)
    },

    accessLastOrder() {
        cy.get(OrderElements.orderList).children().eq(0).then(lastOrderRow => {
            cy.get(lastOrderRow).children().eq(1).then(lastOrderColumn => {
                cy.get(lastOrderColumn).children().eq(1).then(lastOrderLink => {
                    cy.get(lastOrderLink).click();
                });
            });
        });
    },

    checkPaymentStatusBox(title, imagePath) {
        cy.get(OrderElements.alertImage, {force: true}).should('be.visible');
        cy.get(OrderElements.alertTitle, {force: true}).contains(title);
        cy.get(OrderElements.alertImage, {force: true}).should('have.attr', 'src', imagePath);
    },
}
