import {StorePage} from '../pageObjects/store/store-page'
import {CheckoutPage} from '../pageObjects/checkout/checkout-page'
import {CheckoutCustomPage} from '../pageObjects/checkout/custom-page'
import {StoreOrderPage} from '../pageObjects/store/order-page'
import {StoreOrderConfirmationPage} from '../pageObjects/store/order-confirmation-page'

Given("um item no carrinho de compras", () => {
    StorePage.accessStore();
    StorePage.addFirstProductOnCart();
})

When("realizo o processo de checkout com OTHE OTHE", () => {
    StorePage.accessCart();
    StorePage.accessCheckout();
    CheckoutPage.fillPersonalData('mlb');
    CheckoutCustomPage.selectPaymentMethod();
    CheckoutCustomPage.fillPaymentInformation('OTHE OTHE', 'mlb');
    CheckoutPage.finishCheckout();
})

Then("na página do pedido devo visualizar uma mensagem dizendo que o pagamento foi recusado e deve ser feito uma retentativa", () => {
    StoreOrderConfirmationPage.errorPaymentMessage('Seu pagamento foi rejeitado. Você pode tentar novamente.');
})