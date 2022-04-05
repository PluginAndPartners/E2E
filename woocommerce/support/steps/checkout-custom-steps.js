import { StorePage } from '../pageObjects/store/store-page'
import { CheckoutPage } from '../pageObjects/checkout/checkout-page'
import { CheckoutCustomPage } from '../pageObjects/checkout/custom-page'
import { StoreOrderConfirmationPage } from '../pageObjects/store/order-confirmation-page';
import { StoreLoginPage } from "./../pageObjects/store/login-page"
import { StorePluginPage } from "./../pageObjects/store/plugin-page";
import { ConfigurationPage } from "./../pageObjects/store/configuration-page";

var site;

Given("a loja esteja configurada com o site {word} para testes de custom", (siteId) => {
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
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("que preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData(site);
})

And("clicar na opção de pagamento com o checkout custom", () => {
    CheckoutCustomPage.selectPaymentMethod();
})

When("eu preencher corretamente o número do cartão", () => {
    CheckoutCustomPage.fillCardNumber(site);
})

Then("a bandeira do cartão deve ser exibida no campo do número do cartão", () => {    
    CheckoutCustomPage.isThumbnailCard();
})

And("o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão", () => {
    CheckoutCustomPage.cvvDigitsInformation(site);
})

And("deve ser exibido o campo de documento", () => {
    CheckoutCustomPage.isDocumentInput();
})

And("deve ser exibido o campo de seleção de parcelas", () => {
    CheckoutCustomPage.isInstallments();
})

And("o campo do titular deve ter APRO APRO", () => {    
    CheckoutCustomPage.fillCardHolderName('APRO APRO', site);
})

When("eu preencher corretamente os campos de cvv, documento e parcela", () => {    
    CheckoutCustomPage.fillExpirationDate(site);
    CheckoutCustomPage.fillCvv(site);
    CheckoutCustomPage.fillDocument(site);
    CheckoutCustomPage.fillInstallments(site);
})

And("clicar em finalizar pedido", () => {
    CheckoutPage.finishCheckout();
})

Then("deve ser exibido que o pagamento foi realizado com sucesso", () => {
    StoreOrderConfirmationPage.checkElement("title", "checkoutCustom");
})