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
            numberInput: '#mp-card-number',
            nameInput: '#mp-card-holder-name',
            expirationDateInput: '#mp-card-expiration-date',
            cvvInput: '#mp-security-code',
            installmentsSelect: '#mp-installments',
            documentInput: '#docNumber',
        }
    },
    finishButton: '#place_order',
}
