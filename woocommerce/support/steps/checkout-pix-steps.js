import { StorePage } from "../pageObjects/store/store-page";
import { CheckoutPage } from "../pageObjects/checkout/checkout-page";
import { CheckoutPixPage } from "../pageObjects/checkout/pix-page";
import { StoreOrderPage } from "../pageObjects/store/order-page";
import { StoreLoginPage } from "../pageObjects/store/login-page";
import { StoreOrderConfirmationPage } from "../pageObjects/store/order-confirmation-page";
import { ConfigurationPage } from "./../pageObjects/store/configuration-page";
import { StorePluginPage } from "./../pageObjects/store/plugin-page";

var site;

Given("a loja esteja configurada com o site {word} para testes de pix", (siteId) => {
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

And("que eu preenchi corretamente os detalhes de faturamento", () => {
  CheckoutPage.fillPersonalData(site);
});

And("que cliquei na opção de pagamento com o checkout Pix", () => {
  CheckoutPixPage.selectPaymentMethod();
});

When("cliquei em finalizar a compra", () => {
  CheckoutPage.finishCheckout();
});

Then("devo ser direcionado para a tela de pedido recebido", () => {
  StoreOrderConfirmationPage.validateUrl("/order-received");
});

And("devo visualizar uma seção com o QR Code e o código do Pix", () => {
  CheckoutPixPage.getQRCode();
});

And("na página do pedido eu devo visualizar o status de pagamento pendente do pix", () => {
	StoreOrderPage.accessOrderPage();
	StoreLoginPage.doLoginIfNecessary();
	StoreOrderPage.accessLastOrder();
	StoreOrderPage.checkPaymentStatusBox("pendente");
});
