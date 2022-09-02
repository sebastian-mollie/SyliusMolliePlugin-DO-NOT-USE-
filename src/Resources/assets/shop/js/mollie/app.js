const { Mollie } = window;

document.addEventListener("DOMContentLoaded", () => {
    let selectedValue = false;
    let mollieData = document.querySelector('.online-online-payment__container');
    let summary = document.getElementById('sylius-summary-grand-total');
    if(!mollieData || !summary) return;
    const initialOrderTotal = summary.textContent;
    const cardActiveClass = 'online-payment__item--active';
    const orderTotalRow = document.getElementById('sylius-summary-grand-total');
    if(!orderTotalRow) return;
    const components = Boolean(mollieData.getAttribute('data-components'));

    document.querySelectorAll('input[id*="sylius_checkout_select_payment_"][type=radio]').forEach((input) => {
        input.addEventListener('change', function (evt) {
            if (!input.classList.contains('mollie-payments')) {
                restoreOrderTotalValue();
                document.querySelectorAll(`.${cardActiveClass} input[type="radio"]`).forEach((radio) => {
                    radio.checked = false;
                });
                document.querySelectorAll(`.${cardActiveClass}`).forEach((element) => {
                    element.classList.remove(cardActiveClass);
                });
            }
        })
    })

    document.querySelectorAll('.online-payment__input').forEach((input) => {
       input.addEventListener('change', function(evt) {
           let currentItem = input.parentElement;
           currentItem.parentElement.querySelectorAll('.online-payment__item--active')
               .forEach((element) => element.classList.remove('online-payment__item--active'))
           currentItem.classList.add('online-payment__item--active');
           selectedValue = input.value;

           let payment = document.querySelector('.mollie-payments');
           if (!payment.checked) {
               payment.checked = true;
           }

           if (currentItem.getAttribute('data-feeurl')) {
               getPaymentFee(currentItem.getAttribute('data-feeurl'));
           }
       })
    });

    function getPaymentFee(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const paymentFeeRow = document.getElementById('bitbag-paymentFee-row');

                if (paymentFeeRow && data.view) {
                    let div = document.createElement('div');
                    div.innerHTML = data.view.trim();
                    paymentFeeRow.replaceWith(div.firstChild);
                    orderTotalRow.textContent = data.orderTotal;
                } else if (data.view) {
                    document.querySelector('#sylius-checkout-subtotal .ui.large.header').insertAdjacentHTML('beforebegin', data.view);
                    orderTotalRow.textContent = data.orderTotal;
                } else {
                    restoreOrderTotalValue();
                }
            });
    }

    function restoreOrderTotalValue() {
        let fee = document.getElementById('bitbag-paymentFee-row');
        if(fee) fee.replaceWith('');
        orderTotalRow.textContent = initialOrderTotal;
    }

    if (mollieData.length > 0 && true === components) {
        initializeCreditCartFields(selectedValue);
    }

    function initializeCreditCartFields(selectedValue) {
        const environment = mollieData.getAttribute('data-environment');
        let testmode = true;

        if (environment === 1) {
            testmode = false;
        }

        const mollie = Mollie(mollieData.getAttribute('data-profile_id'), {
            locale: mollieData.getAttribute('data-locale'),
            testmode: testmode,
        });

        const form = document.getElementsByName('sylius_checkout_select_payment')[0];

        const formError = document.getElementById('form-error');
        const submitButton = document.getElementById('next-step') || document.getElementById('sylius-pay-link');
        const tokenField = document.querySelector('[id*="_details_cartToken"]');

        const cardHolder = mollie.createComponent('cardHolder');

        cardHolder.mount('#card-holder');

        const cardHolderError = document.getElementById('card-holder-error');
        cardHolder.addEventListener('change', (event) => {
            if (event.error && event.touched) {
                cardHolderError.textContent = event.error;
            } else {
                cardHolderError.textContent = '';
            }
        });

        const cardNumber = mollie.createComponent('cardNumber');
        cardNumber.mount('#card-number');

        const cardNumberError = document.getElementById('card-number-error');

        cardNumber.addEventListener('change', (event) => {
            if (event.error && event.touched) {
                cardNumberError.textContent = event.error;
            } else {
                cardNumberError.textContent = '';
            }
        });

        const expiryDate = mollie.createComponent('expiryDate');
        expiryDate.mount('#expiry-date');

        const expiryDateError = document.getElementById('expiry-date-error');

        expiryDate.addEventListener('change', (event) => {
            if (event.error && event.touched) {
                expiryDateError.textContent = event.error;
            } else {
                expiryDateError.textContent = '';
            }
        });

        const verificationCode = mollie.createComponent('verificationCode');
        verificationCode.mount('#verification-code');

        const verificationCodeError = document.getElementById('verification-code-error');

        verificationCode.addEventListener('change', (event) => {
            if (event.error && event.touched) {
                verificationCodeError.textContent = event.error;
            } else {
                verificationCodeError.textContent = '';
            }
        });

        function disableForm() {
            submitButton.disabled = true;
        }

        function enableForm() {
            submitButton.disabled = false;
        }

        form.addEventListener('submit', async (event) => {
            let radio = document.querySelector('.online-payment__input:checked')
            if (radio && radio.value === 'creditcard') {
                event.preventDefault();
                disableForm();

                formError.textContent = '';

                const {token, error} = await mollie.createToken();

                if (error) {
                    enableForm();
                    formError.textContent = error.message;
                    form.classList.remove('loading');

                    return;
                }

                tokenField.value = token;

                form.submit();
            }
        });
    }

    const applePay = document.getElementById('applepay');

    if (applePay) {
        if (window.ApplePaySession && (ApplePaySession && ApplePaySession.canMakePayments())) {
            applePay.style.display = 'block';
        }
    }
});
