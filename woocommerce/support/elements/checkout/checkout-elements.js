export const CheckoutElements = {
    billingForm: {
        firstNameInput: '#billing_first_name',
        lastNameInput: '#billing_last_name',
        addressInput: '#billing_address_1',
        cityInput: '#billing_city',
        stateSelect: 'select#billing_state.state_select.select2-hidden-accessible',
        zipcodeInput: '#billing_postcode',
        phoneInput: '#billing_phone',
        emailInput: '#billing_email',
    },
    paymentMethods: {
        creditCard: {
            radio: '#payment_method_woo-mercado-pago-custom',
            numberInput: '#cardNumber',
            nameInput: '#form-checkout__cardholderName',
            expirationDateInput: '#expirationDate',
            cvvInput: '#securityCode',
            installmentsSelect: '#installment-1',
            documentInput: '[data-checkout=docNumber]',
        },
        checkoutPro: {
            radio: '#payment_method_woo-mercado-pago-basic',
        },
        checkoutTicket: {
            radio: '#payment_method_woo-mercado-pago-ticket',
            documentInput: '[name=mercadopago_ticket[docType]]',
            documentSelect: ''
        }
    },
    finishButton: '#place_order',
}
