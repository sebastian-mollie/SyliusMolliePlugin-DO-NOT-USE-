import axios from "axios";

document.addEventListener("DOMContentLoaded", () => {
    let applePaySession = () => {
        const version = 3;
        const divider = 100;

        const applePayButton = document.getElementById(
            'mollie_applepay_button'
        );

        const bitbagMollieValidateMerchantUrl =
            applePayButton.getAttribute('data-url-validate');
        const bitbagMolliePaymentUrl =
            applePayButton.getAttribute('data-url-payment');
        const bitbagMollieCurrency = applePayButton.getAttribute(
            'data-currency-order'
        );
        const bitbagMollieMerchantName =
            applePayButton.getAttribute('data-merchant-name');

        let bitbagMollieTotalOrder =
            applePayButton.getAttribute('data-total-order');
        bitbagMollieTotalOrder = bitbagMollieTotalOrder / divider;
        bitbagMollieTotalOrder = bitbagMollieTotalOrder.toString();

        const session = new ApplePaySession(
            version,
            request(
                'US',
                bitbagMollieCurrency,
                bitbagMollieMerchantName,
                bitbagMollieTotalOrder
            )
        );

        session.onvalidatemerchant = (applePayValidateMerchantEvent) => {
            let postRequest = axios.post(bitbagMollieValidateMerchantUrl, {
                validationUrl: applePayValidateMerchantEvent.validationURL,
            });

            postRequest.then((response) => {
                //FIXME: Pour moi la response n'a pas de success, soit elle réussi, soit elle échoue
                console.log('POST onvalidatemerchant')
                console.log(response);
                if (response.success === true) {
                    session.completeMerchantValidation(
                        JSON.parse(merchantSession.data)
                    );
                } else {
                    session.abort();
                }
            });
            postRequest.catch((error) => {
                session.abort();
            });
        };

        session.onpaymentauthorized = (ApplePayPayment) => {
            let postRequest = axios.post(bitbagMolliePaymentUrl, {
                token: ApplePayPayment.payment.token,
                shippingContact: ApplePayPayment.payment.shippingContact,
                billingContact: ApplePayPayment.payment.billingContact,
            });

            postRequest.then((authorization) => {
                //FIXME: Pour moi la response n'a pas de success, soit elle réussi, soit elle échoue
                console.log('POST onpaymentauthorized')
                console.log(authorization)
                let result = authorization.data;

                if (authorization.success === true) {
                    let redirectionUrl = result['returnUrl'];
                    session.completePayment(result['responseToApple']);
                    window.location.href = redirectionUrl;
                } else {
                    session.completePayment(result);
                }
            });

            postRequest.catch((error) => {
                session.abort();
            });
        };

        session.begin();
    };

    const applePayMethodElement = document.querySelector(
        '#mollie_applepay_button'
    );

    const canShowButton =
        applePayMethodElement &&
        window.ApplePaySession &&
        ApplePaySession?.canMakePayments();
    if (canShowButton) {
        applePayMethodElement.style.display = 'block';
    }
    if (applePayMethodElement) {
        applePayMethodElement.addEventListener('click', (evt) => {
            applePaySession();
        });
    }
});
