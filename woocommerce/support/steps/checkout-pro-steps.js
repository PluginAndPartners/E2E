import {StorePage} from '../pageObjects/store/store-page'
import {CheckoutPage} from '../pageObjects/checkout/checkout-page'
import {CheckoutProPage} from '../pageObjects/checkout/pro-page'
import {StoreOrderPage} from '../pageObjects/store/order-page'
import {StoreLoginPage} from '../pageObjects/store/login-page'
import {MpCheckoutPage} from '../pageObjects/mp/checkout-page'
import {MpOrderConfirmationPage} from '../pageObjects/mp/order-confirmation-page'
import {StoreOrderConfirmationPage} from '../pageObjects/store/order-confirmation-page'


//*Scenario: Realizando um pagamento com sucesso com um meio Off
Given("que eu tenha um produto no carrinho", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData('mlb');
})

And("que cliquei na opção de pagamento com o checkout PRO", () => {
    CheckoutProPage.selectPaymentMethod();
})

When("cliquei em finalizar a compra", () => {
    CheckoutPage.finishCheckout();
})

Then("devo ser redirecionado para o Mercado Pago", () => {
    MpCheckoutPage.validateUrl('/checkout/v1/redirect');
})

And("deve concluir o fluxo de pagamento com Pix", () => {
    MpCheckoutPage.selectPaymentMethod('pix');
    MpCheckoutPage.pay();
})

And("ao concluir o fluxo de pagamento, deve ser redirecionado de volta a loja, na tela de pedido recebido", () => {
    MpCheckoutPage.validateUrl('/congrats');
    MpOrderConfirmationPage.backToStore();
    StoreOrderConfirmationPage.validateUrl('/order-received');
})

And("na página do pedido eu devo visualizar o status de pagamento pendente", () => {
    StoreOrderPage.accessOrderPage();
    StoreLoginPage.doLoginIfNecessary();
    StoreOrderPage.accessLastOrder();
})

//*Scenario: Realizando um pagamento com sucesso com cartão
Given("que eu tenha um produto no carrinho", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData('mlb');
})

And("que cliquei na opção de pagamento com o checkout PRO", () => {
    CheckoutProPage.selectPaymentMethod();
})

And("cliquei em finalizar a compra", () => {
    CheckoutPage.finishCheckout();
})

Then("devo ser redirecionado para o Mercado Pago", () => {
    MpCheckoutPage.validateUrl('/checkout/v1/redirect');
})

And("deve concluir o fluxo de pagamento com cartão", () => {
    MpCheckoutPage.selectPaymentMethod('creditCard');
    MpCheckoutPage.fillCardData('APRO APRO', 'mlb');
    MpCheckoutPage.nextPage();
    MpCheckoutPage.fillInputDocument('mlb');
    MpCheckoutPage.nextPage();
    MpCheckoutPage.selectInstallments();
    MpCheckoutPage.pay()
})

And("ao concluir o fluxo de pagamento, devo ver a tela de congrats", () => {
    MpCheckoutPage.validateUrl('/congrats');
    /* 
    *The test can only go this far because cho pro card redirect causes an error: 
    *https://github.com/cypress-io/cypress/issues/2367
    */
})

//*Scenario: Realizando um pagamento com sucesso com cartão
Given("que eu tenha um produto no carrinho", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData('mlb');
})

And("que cliquei na opção de pagamento com o checkout PRO", () => {
    CheckoutProPage.selectPaymentMethod();
})

And("cliquei em finalizar a compra", () => {
    CheckoutPage.finishCheckout();
})

Then("devo ser redirecionado para o Mercado Pago", () => {
    MpCheckoutPage.validateUrl('/checkout/v1/redirect');
})

And("deve falhar o fluxo de pagamento com cartão", () => {
    MpCheckoutPage.selectPaymentMethod('creditCard');
    MpCheckoutPage.fillCardData('OTHE OTHE', 'mlb');
    MpCheckoutPage.nextPage();
    MpCheckoutPage.fillInputDocument('mlb');
    MpCheckoutPage.nextPage();
    MpCheckoutPage.selectInstallments();
    MpCheckoutPage.pay()
})

And("ao concluir o fluxo de pagamento, devo ver a tela de erro", () => {
    MpCheckoutPage.validateUrl('/congrats/rejected');
    /* 
    *The test can only go this far because cho pro card redirect causes an error: 
    *https://github.com/cypress-io/cypress/issues/2367
    */
})


//*Scenario: Realizando um pagamento com sucesso com saldo em conta
Given("que eu tenha um produto no carrinho", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData('mlb');
})

And("que cliquei na opção de pagamento com o checkout PRO", () => {
    CheckoutProPage.selectPaymentMethod();
})

When("cliquei em finalizar a compra", () => {
    CheckoutPage.finishCheckout();
})

Then("devo ser redirecionado para o Mercado Pago", () => {
    MpCheckoutPage.validateUrl('/checkout/v1/redirect');
})

And("deve concluir o fluxo de pagamento com saldo em conta", () => {
    MpCheckoutPage.selectPaymentMethod('accountMoney');
    //TODO: See how to handle with multi-tabs / multi-windows
    //? is possible? https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs
    // MpCheckoutPage.fillEmailInput('mlb');
    // MpCheckoutPage.nextPage();
    // MpCheckoutPage.fillPasswordInput('mlb');
    // MpCheckoutPage.doLogin();
    // MpCheckoutPage.pay();
})