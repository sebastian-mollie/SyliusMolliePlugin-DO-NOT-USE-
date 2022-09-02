import {model} from './cartTableRecurringVariants';

document.addEventListener("DOMContentLoaded", () => {
    const cartVariantDetails = document.querySelectorAll('#cart-variant-details');

    if (1 !== cartVariantDetails.length) {
        return;
    }

    const cartItemsTableRows = document.querySelectorAll('#sylius-order tr');
    cartItemsTableRows.forEach((a) => {
        Array.from(a.children).forEach((b) => {
            let elements = b.querySelectorAll('div[data-recurring]');
            if (elements.length > 0) {
                elements.forEach((variantDetailsElement) => {
                    const index = variantDetailsElement.getAttribute('data-index');
                    const recurring = variantDetailsElement.getAttribute('data-recurring');
                    const interval = variantDetailsElement.getAttribute('data-interval');
                    const times = variantDetailsElement.getAttribute('data-times');

                    if (1 === parseInt(recurring)) {
                        //FIXME: Check si tout va bien
                        let [item, unitPrice, quantity, total] = cartItemsTableRows[index + 1].children;

                        model.addRecurringDetailsLabels(item, total, interval, times);
                    }
                })
            }
        })
    });
});
