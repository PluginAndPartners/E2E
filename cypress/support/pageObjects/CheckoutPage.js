import CheckoutElements from '../elements/CheckoutElements';

const checkoutElements = new CheckoutElements;

class CheckoutPage {    
    makeLogin() {
        cy.get(checkoutElements.loginForm()).click();
        cy.get('#login-form > section > div:nth-child(2) > div.col-md-6 > input').type(`teste@teste.com`);
        cy.get('#login-form > section > div:nth-child(3) > div.col-md-6 > div > input').type('Teste@123');
        cy.get('#login-form > footer > button').click();
    }

    selectExistingAddress() {
        cy.get('#checkout-addresses-step > div > div > form > div.clearfix > button').click();
    }

    fillPersonalDataForm() {
        const uniqId = new Date().getUTCMilliseconds();

        cy.get(checkoutElements.inputRadioMaleGender()).click();
        cy.get(checkoutElements.inputFirstName()).type('João');
        cy.get(checkoutElements.inputLastName()).type('Silva');
        cy.get(checkoutElements.inputEmail()).first().type(`teste+${uniqId}@teste.com`);
        cy.get(checkoutElements.inputPassword()).first().type('Teste@123');
        cy.get(checkoutElements.inputBirthday()).type('1998-04-30');
        cy.get(checkoutElements.continueButton()).first().click();
    }

    fillAddressDataForm() {
        cy.get(checkoutElements.inputAddress()).type('R. Batata da China');
        cy.get(checkoutElements.inputPostcode()).type('99999999');
        cy.get(checkoutElements.inputCity()).type('São Paulo');
        cy.get(checkoutElements.continueAddressButton()).click();
    }

    fillSendMethodsForm() {
        cy.get(checkoutElements.continueDeliveryOption()).click();
    }

    chooseWebPayMethod() {
        cy.get(checkoutElements.inputRadioWebPay()).click();
        cy.get(checkoutElements.inputTermsAndConditions()).click();
        cy.get(checkoutElements.finishCheckoutButton()).click();
        cy.get(checkoutElements.webpayContinueButton()).should('be.visible')
        cy.get(checkoutElements.webpayContinueButton()).click();
    }

    checkSuccessPage() {
        cy.wait(20000)
        cy.url().should('include', 'order-success')
    }
}

export default CheckoutPage;