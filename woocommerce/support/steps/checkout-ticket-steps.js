import { StorePage } from "./../pageObjects/store/store-page";
import { CheckoutPage } from "./../pageObjects/checkout/checkout-page";
import { CheckoutTicketPage } from "./../pageObjects/checkout/ticket-page";
import { StoreOrderConfirmationPage } from "./../pageObjects/store/order-confirmation-page";

Given("que eu tenha um produto no carrinho", () => {
  StorePage.accessStore();
  StorePage.addFirstProductOnCart();
});

And("que eu esteja na página de checkout", () => {
  StorePage.accessCart();
  StorePage.accessCheckout();
});

And("que eu preencha corretamente os detalhes de faturamento", () => {
  CheckoutPage.fillPersonalData("mlb");
});

When("eu clicar na opção de pagamento com o checkout ticket", () => {
  CheckoutTicketPage.selectPaymentMethod();
});

Then("exibido um campo de documento", () => {
  CheckoutTicketPage.checkElement("documentInputContainer");
  CheckoutTicketPage.checkDocumentsValues("mlb");
  CheckoutTicketPage.checkTranslation("documentTitle", "Documento do titular*");
});

And("exibido uma tabela com opções de pagamento", () => {
  CheckoutTicketPage.checkElement("paymentMethodsContainer");
  CheckoutTicketPage.checkPaymentMethodsValues("mlb");
  CheckoutTicketPage.checkTranslation(
    "paymentMethodsContainerTitle",
    "Selecione onde você quer pagar"
  );
});

And("exibido a mensagem de termos e condições", () => {
  CheckoutTicketPage.checkElement("termsAndConditions");
  CheckoutTicketPage.checkTranslation(
    "termsAndConditions",
    "Ao continuar, você concorda com nossosTermos e condições"
  );
});

And("que eu clique na opção de pagamento com o checkout ticket", () => {
  CheckoutTicketPage.selectPaymentMethod();
});

When("eu preencher corretamente o {word} como número do documento", (document) => {
    CheckoutTicketPage.fillDocument(document, "mlb");
  }
);

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
  StoreOrderConfirmationPage.checkElement("iframe");
  StoreOrderConfirmationPage.checkIframe();
});

When("eu preencher incorretamente o {word} como número do documento", (document) => {
    CheckoutTicketPage.fillDocument(document, "mlb", "123%$#.");
  }
);

Then("o campo de documento deve exibir a mensagem {string}", (message) => {
  CheckoutTicketPage.checkElement("helperMessage");
  CheckoutTicketPage.checkTranslation(
    "helperMessage",
    message
  );
});

And("a página de checkout deve exibir um alerta vermelho sinalizando o erro", () => {
    CheckoutTicketPage.checkElement("wooNotice");
  }
);

Then("a página de checkout deve exibir um alerta vermelho sinalizando o erro", () => {
    CheckoutTicketPage.checkElement("wooNotice");
  }
);

When("eu não preencher o {word} como número do documento", (document) => {
  CheckoutTicketPage.fillDocument(document, "mlb", " ");
});
