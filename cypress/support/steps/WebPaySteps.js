import ProductPage from '../pageObjects/ProductPage'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage'

const productPage = new ProductPage
const cartPage = new CartPage
const checkoutPage = new CheckoutPage

Given("um item no carrinho de compras", () => {
    productPage.accessProductPage();
    productPage.clickAddToCartButton();
    productPage.checkCartNumber();
    productPage.clickOnCart();
})

When("realizo o processo de checkout com usuário cadastrado", () => {
    cartPage.clickOnFinishButton();
    checkoutPage.makeLogin();
    checkoutPage.selectExistingAddress();
    checkoutPage.fillSendMethodsForm();
    checkoutPage.chooseWebPayMethod();
})

Then("devo ser redirecionado para a página de sucesso", () => {
    checkoutPage.checkSuccessPage();
})