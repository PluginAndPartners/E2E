import {MpCheckoutElements} from './../../elements/mp/checkout-elements';

export const MpCheckoutPage = {
    validateUrl(url) {
        cy.url().should('include', url);
    },
    selectPaymentMethod(paymentMethod) {
        cy.get(MpCheckoutElements.paymentMethods[paymentMethod].option).click();
    },
    pay(){
        cy.get(MpCheckoutElements.finishButton).click();
        cy.wait(5000);
    },
    fillCardData(cardFullName, site) {
        const envs = Cypress.env(site);
        cy.get(MpCheckoutElements.cardForm.holderName).type(cardFullName, {force: true});
        cy.get(MpCheckoutElements.cardForm.cardNumber).type(envs.cards.master.number, {force: true});
        cy.get(MpCheckoutElements.cardForm.expirationDate).type(envs.cards.master.expirationDate,{force: true});
        cy.get(MpCheckoutElements.cardForm.cvv).type(envs.cards.master.cvv,{force: true});
        
    },
    fillInputDocument(site){
        const envs = Cypress.env(site);
        cy.get(MpCheckoutElements.cardForm.document).type(envs.document.cpf,{force: true});
    },
    selectInstallments(){
        cy.get(MpCheckoutElements.cardForm.installment).click();
    },
    nextPage() {
        cy.get(MpCheckoutElements.nextButton).click();
    }, 
    continue(){
        cy.get(MpCheckoutElements.continueButton).click();
    },
    fillEmailInput(site) {
        const envs = Cypress.env(site);
        cy.get(MpCheckoutElements.emailInput).type(envs.user.email);
    },
    fillPasswordInput(site) {
        const envs = Cypress.env(site);
        cy.get(MpCheckoutElements.passwordInput).type(envs.user.password);
    },
    doLogin(){
        cy.get(MpCheckoutElements.loginButton).click();
        cy.wait(2000);
    }
}