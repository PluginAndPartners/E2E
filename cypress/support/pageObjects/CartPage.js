import CartElements from '../elements/CartElements';

const cartElements = new CartElements;

class ProductPage {
    clickOnFinishButton() {
        cy.get(cartElements.finishButton()).click()
    }
}

export default ProductPage;