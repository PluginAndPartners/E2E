class CheckoutElements {
    loginForm = () => { return '#checkout-personal-information-step > div > ul > li:nth-child(3) > a' }

    inputRadioMaleGender = () => { return 'input[name="id_gender"][value=1][type="radio"]' }

    inputRadioFemaleGender = () => { return 'input[name="id_gender"][value=2][type="radio"]' }

    inputFirstName = () => { return 'input[name="firstname"][type="text"]' }

    inputLastName = () => { return 'input[name="lastname"][type="text"]' }

    inputEmail = () => { return 'div.col-md-6 > input.form-control[name="email"][type="email"]' }

    inputPassword = () => { return 'input[name="password"][type="password"]' }

    inputBirthday = () => { return 'input[name="birthday"][type="text"]' } // YYYY-MM-DD

    inputAddress = () => { return 'input[name="address1"][type="text"]' }

    inputPostcode = () => { return 'input[name="postcode"][type="text"]' } // 00000000

    inputCity = () => { return 'input[name="city"][type="text"]' }

    continueButton = () => { return '.continue.btn.btn-primary.float-xs-right' }

    continueAddressButton = () => { return '#delivery-address > div > footer > button' }

    continueDeliveryOption = () => { return '#js-delivery > button' }

    inputRadioWebPay = () => { return '#payment-option-3' }

    inputTermsAndConditions = () => { return 'input.ps-shown-by-js[type="checkbox"][value=1]' }

    finishCheckoutButton = () => { return '.btn.btn-primary.center-block' }

    webpayContinueButton = () => { return 'button[type="primary"]' }
}
  
export default CheckoutElements;
