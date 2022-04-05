import { StorePage } from "./../pageObjects/store/store-page";
import { CheckoutPage } from "./../pageObjects/checkout/checkout-page";
import { CheckoutTicketPage } from "./../pageObjects/checkout/ticket-page";
import { StoreOrderConfirmationPage } from "./../pageObjects/store/order-confirmation-page";
import { StoreLoginPage } from "./../pageObjects/store/login-page"
import { StorePluginPage } from "./../pageObjects/store/plugin-page";
import { ConfigurationPage } from "./../pageObjects/store/configuration-page";

var site;

Given("a loja esteja configurada com o site {word} para testes de ticket", (siteId) => {
  site = siteId;
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
});

And("que eu esteja na página de checkout", () => {
  StorePage.accessCart();
  StorePage.accessCheckout();
});

And("que eu preencha corretamente os detalhes de faturamento", () => {
  CheckoutPage.fillPersonalData(site);
});

When("eu clicar na opção de pagamento com o checkout ticket", () => {
  CheckoutTicketPage.selectPaymentMethod();
});

Then("exibido um campo de documento com o título {string}", (title) => {
  CheckoutTicketPage.checkElement("documentInputContainer");
  CheckoutTicketPage.checkDocumentsValues(site);
  CheckoutTicketPage.checkTranslation("documentTitle", title);
});

And("exibido uma tabela com o título {string}", (title) => {
  CheckoutTicketPage.checkElement("paymentMethodsContainer");
  CheckoutTicketPage.checkPaymentMethodsValues(site);
  CheckoutTicketPage.checkTranslation("paymentMethodsContainerTitle", title);
});

And("exibido a mensagem {string}", (termsAndConditionsText) => {
  CheckoutTicketPage.checkElement("termsAndConditions");
  CheckoutTicketPage.checkTranslation(
    "termsAndConditions",
    termsAndConditionsText
  );
});

And("que eu clique na opção de pagamento com o checkout ticket", () => {
  CheckoutTicketPage.selectPaymentMethod();
});

When("eu preencher corretamente o {word} como número do documento", (document) => {
  CheckoutTicketPage.fillDocument(document, site);
});

And("selecionar a opção {word}", (paymentMethodId) => {
  CheckoutTicketPage.selectPaymentMethodOption(paymentMethodId);
});

And("clicar em finalizar a compra", () => {
  CheckoutTicketPage.finishCheckout();
});

Then("devo ser direcionado para a tela de pedido recebido", () => {
  StoreOrderConfirmationPage.validateUrl("/order-received");
});

And("devo visualizar uma seção com a guia de pagamento em formato PDF", () => {
  StoreOrderConfirmationPage.checkElement("iframe", "checkoutTicket");
  StoreOrderConfirmationPage.checkIframe();
});

When("eu preencher incorretamente o {word} como número do documento", (document) => {
  CheckoutTicketPage.fillDocument(document, site, "123%$#.");
});

Then("o campo de documento deve exibir a mensagem {string}", (message) => {
  CheckoutTicketPage.checkElement("helperMessage");
  CheckoutTicketPage.checkTranslation("helperMessage", message);
});

And("a página de checkout deve exibir um alerta vermelho sinalizando o erro", () => {
  CheckoutTicketPage.checkElement("wooNotice");
});

Then("a página de checkout deve exibir um alerta vermelho sinalizando o erro", () => {
  CheckoutTicketPage.checkElement("wooNotice");
});

When("eu não preencher o {word} como número do documento", (document) => {
  CheckoutTicketPage.fillDocument(document, site, " ");
});
