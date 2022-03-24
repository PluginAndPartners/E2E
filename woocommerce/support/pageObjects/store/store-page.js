import {StoreElements} from '../../elements/store/store-elements';

const storeUrl = Cypress.config("storeUrl");

export const StorePage = {
    accessStore() {
        cy.visit(storeUrl)
    },

    addFirstProductOnCart() {
        cy.get(StoreElements.listOfProducts).children().eq(0).then(firstProduct => {
            cy.get(firstProduct).children().eq(1).then(buyButton => {
                cy.get(buyButton).click();
                cy.wait(2000);
            });
        });
    },

    accessCart() {
        cy.get(StoreElements.cart).click()
    },

    accessCheckout() {
        cy.get(StoreElements.checkoutButton).click()
    },
}
