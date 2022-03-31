import {StorePage} from '../pageObjects/store/store-page'
import {CheckoutPage} from '../pageObjects/checkout/checkout-page'
import { CheckoutCustomPage } from '../pageObjects/checkout/custom-page'
import { StoreOrderConfirmationPage } from '../pageObjects/store/order-confirmation-page';

Given("que eu tenha um produto no carrinho", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

And("que eu esteja na página de checkout", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
})

And("que preenchi corretamente os detalhes de faturamento", () => {
    CheckoutPage.fillPersonalData('mlb');
})

And("clicar na opção de pagamento com o checkout custom", () => {
    CheckoutCustomPage.selectPaymentMethod();
})

When("eu preencher corretamente o número do cartão", () => {
    CheckoutCustomPage.fillCardNumber('mlb');
})

Then("a bandeira do cartão deve ser exibida no campo do número do cartão", () => {    
    CheckoutCustomPage.isThumbnailCard();
})

And("o campo de código de segurança deve exibir logo abaixo uma mensagem com a quantidade e posição dos dígitos daquele cvv no cartão", () => {
    CheckoutCustomPage.cvvDigitsInformation('mlb');
})

And("deve ser exibido o campo de documento", () => {
    CheckoutCustomPage.isDocumentInput();
})

And("deve ser exibido o campo de seleção de parcelas", () => {
    CheckoutCustomPage.isInstallments();
})

And("o campo do titular deve ter APRO APRO", () => {    
    CheckoutCustomPage.fillCardHolderName('APRO APRO', 'mlb');
})

When("eu preencher corretamente os campos de cvv, documento e parcela", () => {    
    CheckoutCustomPage.fillExpirationDate('mlb');
    CheckoutCustomPage.fillCvv('mlb');
    CheckoutCustomPage.fillDocument('mlb');
    CheckoutCustomPage.fillInstallments('mlb');
})

And("clicar em finalizar pedido", () => {
    CheckoutPage.finishCheckout();
})

Then("deve ser exibido que o pagamento foi realizado com sucesso", () => {
    StoreOrderConfirmationPage.espera()
})