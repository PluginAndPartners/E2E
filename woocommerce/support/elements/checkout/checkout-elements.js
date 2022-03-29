export const CheckoutElements = {
  billingForm: {
    firstNameInput: "#billing_first_name",
    lastNameInput: "#billing_last_name",
    addressInput: "#billing_address_1",
    cityInput: "#billing_city",
    stateSelect: "select#billing_state.state_select.select2-hidden-accessible",
    zipcodeInput: "#billing_postcode",
    phoneInput: "#billing_phone",
    emailInput: "#billing_email",
  },
  paymentMethods: {
    creditCard: {
      radio: "#payment_method_woo-mercado-pago-custom",
      numberInput: "#cardNumber",
      nameInput: "#form-checkout__cardholderName",
      expirationDateInput: "#expirationDate",
      cvvInput: "#securityCode",
      installmentsSelect: "#installment-1",
      documentInput: "[data-checkout=docNumber]",
    },
    checkoutPro: {
      radio: "#payment_method_woo-mercado-pago-basic",
    },
    checkoutTicket: {
      radio: "#payment_method_woo-mercado-pago-ticket",
      documentInputContainer: "[data-cy=input-document-container]",
      documentTitle: "[data-cy=input-label]",
      documentInput: "[data-cy=input-document]",
      documentSelect: "[data-cy=select-document]",
      paymentMethodsContainerTitle: "[data-cy=checkout-ticket-text]",
      paymentMethodsContainer: "[data-cy=input-table-container]",
      paymentMethodsList: "[data-cy=input-table-list]",
      paymentMethodsRadio: "[data-cy=input-radio]",
      helperMessage: "[data-cy=helper-message]",
      testModeContainer: "[data-cy=test-mode-card]",
      testModeDescription: "[data-cy=test-mode-description]",
    },
  },
  termsAndConditions: "[data-cy=terms-and-conditions-container]",
  wooNotice:
    "#checkout > div.woocommerce-NoticeGroup.woocommerce-NoticeGroup-checkout",
  finishButton: "#place_order",
};
