import {StorePage} from '../pageObjects/store/store-page'
import {CheckoutPage} from '../pageObjects/checkout/checkout-page'
import {CheckoutCustomPage} from '../pageObjects/checkout/custom-page'
import {StoreOrderPage} from '../pageObjects/store/order-page'
import {StoreLoginPage} from '../pageObjects/store/login-page'

Given("um item no carrinho de compras", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

When("realizo o processo de checkout com OTHE OTHE", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
    CheckoutPage.fillPersonalData('mlb');
    CheckoutCustomPage.selectPaymentMethod();
    CheckoutCustomPage.fillPaymentInformation('OTHE OTHE');
    CheckoutPage.finishCheckout();
})

Then("na página do pedido devo visualizar o status de pagamento recusado", () => {
    StoreOrderPage.accessOrderPage();
    StoreLoginPage.doLoginIfNecessary();
    StoreOrderPage.accessLastOrder();
    StoreOrderPage.checkPaymentStatusBox('recusado');
})