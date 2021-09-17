import ProductElements from '../elements/ProductElements';

const productElements = new ProductElements;
const productPageUrl = Cypress.config("productPageUrl");

class ProductPage {
    accessProductPage() {
        cy.visit(productPageUrl)
    }

    clickAddToCartButton() {
        cy.get(productElements.buttonAddToCart()).click()
    }

    checkCartNumber() {
        cy.get(productElements.cartCounter()).should('contain', '(1)')
    }

    clickOnCart() {
        cy.get(productElements.cartLink()).click();
    }
}

export default ProductPage;