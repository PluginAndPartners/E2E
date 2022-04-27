import { StorePage } from "../pageObjects/store/store-page";
import { CheckoutPage } from "../pageObjects/checkout/checkout-page";
import { CheckoutCustomPage } from "../pageObjects/checkout/custom-page";
import { StoreOrderConfirmationPage } from "../pageObjects/store/order-confirmation-page";
import { StoreLoginPage } from "./../pageObjects/store/login-page";
import { StorePluginPage } from "./../pageObjects/store/plugin-page";
import { ConfigurationPage } from "./../pageObjects/store/configuration-page";

var site;
var envs;

Given("a loja esteja configurada com o site {word} para testes de custom", (siteId) => {
  site = siteId;
  envs = Cypress.env(site);
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

And("possua o endereço de operação {string}", (address) => {
  ConfigurationPage.accessConfigurationPage("woocommerce");
  ConfigurationPage.setAddress(address);
});

And("a moeda de operação da loja deve ser {string}", (currency) => {
  ConfigurationPage.accessConfigurationPage("woocommerce");
  ConfigurationPage.setStoreCurrency(currency);
});

Given("que eu tenha um produto no carrinho", () => {
  StorePage.accessStore();
  StorePage.addFirstProductOnCart();
});

And("que eu esteja na página de checkout", () => {
  StorePage.accessCart();
  StorePage.accessCheckout();
});

And("que preenchi corretamente os detalhes de faturamento", () => {
  CheckoutPage.fillPersonalData(site);
});

And("que cliquei na opção de pagamento com o checkout custom", () => {
  CheckoutCustomPage.selectPaymentMethod();
});

When("eu preencher corretamente o número do cartão", () => {
  CheckoutCustomPage.fillIframeElement("cardNumber", envs.cards.amex.number);
});

Then("a bandeira do cartão deve ser exibida no campo do número do cartão", () => {
  CheckoutCustomPage.isThumbnailCard();
});

And("o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão", () => {
  CheckoutCustomPage.cvvDigitsInformation(site);
});

And("deve ser exibido o campo de documento", () => {
  CheckoutCustomPage.checkElement("documentInput");
});

And("deve ser exibido o campo de seleção de parcelas", () => {
  CheckoutCustomPage.checkElement("installmentsSelect");
});

And("preencher o nome do titular com {string}", (name) => {
  CheckoutCustomPage.fillElement("nameInput", name);
});

When("eu preencher corretamente os campos de cvv, documento e parcela", () => {
  CheckoutCustomPage.fillIframeElement(
    "expirationDate",
    envs.cards.amex.expirationDate
  );
  CheckoutCustomPage.fillIframeElement("securityCode", envs.cards.amex.cvv);
  CheckoutCustomPage.fillElement(
    "documentInput",
    Object.values(envs.document)[0]
  );
  CheckoutCustomPage.selectInstallment();
});

And("clicar em finalizar pedido", () => {
  CheckoutPage.finishCheckout();
});

Then("deve ser exibido que o pagamento foi realizado com sucesso", () => {
  StoreOrderConfirmationPage.checkElement("title", "checkoutCustom");
});

And("eu preencher corretamente o número do cartão", () => {
  CheckoutCustomPage.fillIframeElement("cardNumber", envs.cards.amex.number);
});

Then("devo visualizar na tela uma mensagem de pedido recusado com um link para tentar novamente", () => {
  StoreOrderConfirmationPage.checkElement("errorAlert", "checkoutCustom");
});

And("clicar em pagar com mercado pago", () => {
  CheckoutCustomPage.checkElement("walletButtonContainer");
  CheckoutCustomPage.clickWalletButton();
});

Then("devo visualizar um modal do mercado pago", () => {
  CheckoutCustomPage.checkElement("walletButtonIframe");
});

When("eu preencher corretamente os campos do wallet button", () => {
  //TODO: See how to handle with multi-tabs / multi-windows
  //? is possible? https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs
  //CheckoutCustomPage.fillWalletButton(site);
});

And("clicar em pagar", () => {
  //TODO: See how to handle with multi-tabs / multi-windows
  //? is possible? https://docs.cypress.io/guides/references/trade-offs#Multiple-tabs
  //CheckoutCustomPage.payWithWalletButton();
});

And("deve ser exibido o texto para {string}", (text) => {
  CheckoutCustomPage.selectInstallment();
  CheckoutCustomPage.checkElement("taxCft");
});

//* Scenario: Realizar um pagamento com sucesso pela retentativa de pagamento
Given("scenario Realizando um pagamento sem sucesso", () => {
  StorePage.accessStore();
  StorePage.addFirstProductOnCart();
  StorePage.accessCart();
  StorePage.accessCheckout();
  CheckoutPage.fillPersonalData(site);
  CheckoutCustomPage.selectPaymentMethod();
  CheckoutCustomPage.fillIframeElement("cardNumber", envs.cards.amex.number);
  CheckoutCustomPage.isThumbnailCard();
  CheckoutCustomPage.cvvDigitsInformation(site);
  CheckoutCustomPage.checkElement("documentInput");
  CheckoutCustomPage.checkElement("installmentsSelect");
  CheckoutCustomPage.fillElement("nameInput", "OTHE OTHE");
  CheckoutCustomPage.fillIframeElement(
    "expirationDate",
    envs.cards.amex.expirationDate
  );
  CheckoutCustomPage.fillIframeElement("securityCode", envs.cards.amex.cvv);
  CheckoutCustomPage.fillElement(
    "documentInput",
    Object.values(envs.document)[0]
  );
  CheckoutCustomPage.selectInstallment();
  CheckoutPage.finishCheckout();
  StoreOrderConfirmationPage.checkElement("errorAlert", "checkoutCustom");
});

When("eu clicar no link tente novamente", () => {
  StoreOrderConfirmationPage.tryAgain();
});

Then("devo ser redirecionado para a tela de retentativa de pagamento", () => {
  cy.url().should("include", "pay_for_order");
  cy.wait(3000);
});

And("eu preencher corretamente o número do cartão", () => {
  CheckoutCustomPage.fillIframeElement("cardNumber", envs.cards.amex.number);
});

Then("a bandeira do cartão deve ser exibida no campo do número do cartão", () => {
  CheckoutCustomPage.isThumbnailCard();
});

And("o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão", () => {
  CheckoutCustomPage.cvvDigitsInformation(site);
});

And("deve ser exibido o campo de documento", () => {
  CheckoutCustomPage.checkElement("documentInput");
});

And("deve ser exibido o campo de seleção de parcelas", () => {
  CheckoutCustomPage.checkElement("installmentsSelect");
});

When("eu preencher corretamente os campos de cvv, documento e parcela", () => {
  CheckoutCustomPage.fillIframeElement(
    "expirationDate",
    envs.cards.amex.expirationDate
  );
  CheckoutCustomPage.fillIframeElement("securityCode", envs.cards.amex.cvv);
  CheckoutCustomPage.fillElement(
    "documentInput",
    Object.values(envs.document)[0]
  );
  CheckoutCustomPage.selectInstallment();
});

And("preencher o nome do titular com {string}", (name) => {
  CheckoutCustomPage.fillElement("nameInput", name);
});

And("clicar em finalizar pedido", () => {
  CheckoutPage.finishCheckout();
});

Then("eu devo ser redirecionado para a tela de pedido recebido", () => {
  StoreOrderConfirmationPage.validateUrl("/order-received");
});

When("preencher o campo de {string} com {string}", (field, value) => {
  CheckoutCustomPage.fillIframeElement(field, value);
});

Then("uma mensagem de erro deve ser exibida", () => {
  CheckoutCustomPage.checkElement("helperMessage");
});

When("eu clicar no botão submit", () => {
  CheckoutPage.finishCheckout();
});

Then("o campo {string} deve continuar vazio", (field) => {
  CheckoutCustomPage.isEmptyIframeField(field);
});

And("preenchi corretamente de todos os campos exceto o campo de {string}", (field) => {
  CheckoutCustomPage.fillIframeElement("cardNumber", envs.cards.amex.number);
  CheckoutCustomPage.fillElement("nameInput", "APRO APRO");
  CheckoutCustomPage.fillElement(
    "documentInput",
    Object.values(envs.document)[0]
  );

  if (field != "expirationDate")
    CheckoutCustomPage.fillIframeElement(
      "expirationDate",
      envs.cards.amex.expirationDate
    );

  if (field != "securityCode")
    CheckoutCustomPage.fillIframeElement("securityCode", envs.cards.amex.cvv);

  if (field != "installments") CheckoutCustomPage.selectInstallment();
});

And("que o campo de {string} tenha sido preenchido com {string}", (field, value) => {
  CheckoutCustomPage.fillIframeElement(field, value);
});
