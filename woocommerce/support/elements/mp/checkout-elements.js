export const MpCheckoutElements = {
    paymentMethods: {
        pix: {
            option: '#group_form_scroller > ul.options-list.ui-card.select_general_payment_options > li.options-list__item.item-pix',
        },
        creditCard: {
            option: '#group_form_scroller > ul.options-list.ui-card.select_general_payment_options > li.options-list__item.item-new_card_row',
        },
        accountMoney: {
            option: '#group_form_scroller > ul.options-list.ui-card.select_mp_login > li'
        }
    },
    finishButton: '#pay',
    nextButton : '#submit',
    continueButton: '#continue_button',
    cardForm: {
        cardNumber:'#card_number',
        expirationDate:'#input_expiration_date',
        holderName:'#fullname',
        cvv: '#cvv',
        document: '#number',
        installment: '#select_installments > ul > li.options-list__item.item-1'
    }, 
    emailInput: '#user_id',
    passwordInput: '#password',
    loginButton: '#action-complete'
}
