import {StorePage} from '../pageObjects/store-page'
import {CheckoutPage} from '../pageObjects/checkout-page'
import {OrderPage} from '../pageObjects/order-page'
import {LoginPage} from '../pageObjects/login-page'

Given("um item no carrinho de compras", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

When("realizo o processo de checkout com OTHE OTHE", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
    CheckoutPage.fillPersonalData();
    CheckoutPage.selectPaymentMethod();
    CheckoutPage.fillPaymentInformation();
    CheckoutPage.finishCheckout();
})

Then("na página do pedido devo visualizar o status de pagamento recusado", () => {
    OrderPage.accessOrderPage();
    LoginPage.doLoginIfNecessary();
    OrderPage.accessLastOrder();
    OrderPage.checkPaymentStatusBox();
})