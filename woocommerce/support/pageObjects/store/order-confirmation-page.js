export const StoreOrderConfirmationPage = {
    validateUrl(url) {
        cy.url().should('include', url);
    },
}