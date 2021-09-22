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

    checkPaymentStatusBox() {
        cy.get(OrderElements.alertImage, {force: true}).should('be.visible');
        cy.get(OrderElements.alertTitle, {force: true}).contains('recusado');
        cy.get(OrderElements.alertImage, {force: true}).should('have.attr', 'src', 'https://poc-cypress-pluginspartners.codeanyapp.com/wp-content/plugins/woocommerce-mercadopago/includes/admin/../../assets/images/generics/circle-red-alert.png');
    },
}
