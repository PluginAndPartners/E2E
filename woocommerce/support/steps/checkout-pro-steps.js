import {StorePage} from '../pageObjects/store/store-page'
import {CheckoutPage} from '../pageObjects/checkout/checkout-page'
import {CheckoutProPage} from '../pageObjects/checkout/pro-page'
import {StoreOrderPage} from '../pageObjects/store/order-page'
import {StoreLoginPage} from '../pageObjects/store/login-page'
import {MpCheckoutPage} from '../pageObjects/mp/checkout-page'
import {MpOrderConfirmationPage} from '../pageObjects/mp/order-confirmation-page'
import {StoreOrderConfirmationPage} from '../pageObjects/store/order-confirmation-page'

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

And("deve concluir o fluxo de pagamento", () => {
    MpCheckoutPage.pay();
})

And("ao concluir o fluxo de pagamento, deve ser redirecionado de volta a loja, na tela de pedido recebido", () => {
    MpCheckoutPage.validateUrl('/congrats');
    MpOrderConfirmationPage.backToStore();
    StoreOrderConfirmationPage.validateUrl('/order-received');
})

And("na página do pedido eu devo visualizar o status de pagamento aprovado", () => {
    StoreOrderPage.accessOrderPage();
    StoreLoginPage.doLoginIfNecessary();
    StoreOrderPage.accessLastOrder();
})