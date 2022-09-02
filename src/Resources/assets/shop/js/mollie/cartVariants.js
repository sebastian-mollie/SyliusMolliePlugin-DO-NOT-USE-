import {model} from './cartTableRecurringVariants';

document.addEventListener("DOMContentLoaded", () => {
    const cartVariantDetails = document.getElementById('cart-variant-details');

    if (!cartVariantDetails) return;

    const cartItemsTableRows = document.querySelectorAll('#sylius-cart-items tr');

    Array.from(cartVariantDetails.children).forEach((child) => {
        let elements = child.querySelectorAll('div[data-recurring]');
        if (elements.length > 0) {
            elements.forEach((variantDetailsElement) => {
                const index = variantDetailsElement.getAttribute('data-index');
                const recurring = variantDetailsElement.getAttribute('data-recurring');
                const interval = variantDetailsElement.getAttribute('data-interval');
                const times = variantDetailsElement.getAttribute('data-times');

                if (1 === parseInt(recurring)) {
                    //FIXME: Check si tout va bien
                    let [item, unitPrice, quantity, remove, total] = cartItemsTableRows[index + 1].children;

                    model.addRecurringDetailsLabels(item, total, interval, times);
                }
            })
        }
    })
});

