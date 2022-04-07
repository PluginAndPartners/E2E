import { StorePage } from '../pageObjects/store/store-page'
import { CheckoutPage } from '../pageObjects/checkout/checkout-page'
import { CheckoutProPage } from '../pageObjects/checkout/pro-page'
import { StoreOrderPage } from '../pageObjects/store/order-page'
import { StoreLoginPage } from '../pageObjects/store/login-page'
import { MpCheckoutPage } from '../pageObjects/mp/checkout-page'
import { MpOrderConfirmationPage } from '../pageObjects/mp/order-confirmation-page'
import { StoreOrderConfirmationPage } from '../pageObjects/store/order-confirmation-page'
import { StorePluginPage } from "./../pageObjects/store/plugin-page";
import { ConfigurationPage } from "./../pageObjects/store/configuration-page";

var site;

Given("a loja esteja configurada com o site {word} para testes de pro", (id) => {
  site = id;
  StorePluginPage.accessPluginPage();
  StoreLoginPage.doLoginIfNecessary();
  StorePluginPage.createIntegration(site);
});

And("esteja em modo {word}", (mode) => {
  StorePluginPage.changeStoreMode(mode);
});

Then("o idioma deve ser configurado para {string}", (language) => {
  ConfigurationPage.accessConfigurationPage("wordpress");
  ConfigurationPage.setStoreLanguage(language);
});

And("a moeda de operação da loja deve ser {string}", (currency) => {
  ConfigurationPage.accessConfigurationPage("woocommerce");
  ConfigurationPage.setStoreCurrency(currency);
});

Given("que eu tenha um produto no carrinho", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData(site);
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
    CheckoutPage.fillPersonalData(site);
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
    MpCheckoutPage.fillCardData('APRO APRO', site);
    MpCheckoutPage.nextPage();
    MpCheckoutPage.fillInputDocument(site);
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
    CheckoutPage.fillPersonalData(site);
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
    MpCheckoutPage.fillCardData('OTHE OTHE', site);
    MpCheckoutPage.nextPage();
    MpCheckoutPage.fillInputDocument(site);
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
    CheckoutPage.fillPersonalData(site);
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
    // MpCheckoutPage.fillEmailInput(site);
    // MpCheckoutPage.nextPage();
    // MpCheckoutPage.fillPasswordInput(site);
    // MpCheckoutPage.doLogin();
    // MpCheckoutPage.pay();
})