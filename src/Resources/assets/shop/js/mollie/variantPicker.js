import {model} from './cartTableRecurringVariants';

document.addEventListener("DOMContentLoaded", () => {
    const __productContainer = document.getElementById('sylius-product-name');
    const __recurringContainer = __productContainer ? __productContainer.parentElement.querySelectorAll('.ui.text.menu') : null;
    const __productPriceContainer = document.getElementById('product-price');

    const getMatchSelector = () => {
        let selector = '';

        document.querySelectorAll('#sylius-product-adding-to-cart select[data-option]').forEach((select) => {
            const option = select.querySelector('option:checked').value;
            selector += `[data-${select.getAttribute('data-option')}="${option}"]`;
        });

        return selector;
    }

    const isChoice = () => {
        return document.querySelectorAll('#sylius-product-adding-to-cart input[type="radio"][name="sylius_add_to_cart[cartItem][variant]"]').length > 0;
    }

    const resolveSelector = () => {
        return isChoice() ? getChoiceSelector() : getMatchSelector();
    }

    const getChoiceSelector = () => {
        return `[data-variant="${document.querySelector('#sylius-product-adding-to-cart input[type="radio"][name="sylius_add_to_cart[cartItem][variant]"]:checked').value}"]`;
    }

    const getTimes = () => {
        let times = document.getElementById('sylius-variants-recurring-times');
        return times && times.querySelector(resolveSelector()).getAttribute('data-value');
    }

    const getInterval = () => {
        let interval = document.getElementById('sylius-variants-recurring-interval');
        return interval && interval.querySelector(resolveSelector()).getAttribute('data-value');
    }

    const checkRecurringMatch = () => {
        let match = document.getElementById('sylius-variants-recurring-match');
        return match && '1' === match.querySelector(resolveSelector()).getAttribute('data-value');
    }

    const checkRecurringChoice = () => {
        let choice = document.getElementById('sylius-variants-recurring-choice');
        return choice && '1' === choice.querySelector(resolveSelector()).getAttribute('data-value');
    }

    const removeRecurringDetailsLabels = () => {
        model.clearLabels();
    };

    const addRecurringDetailsLabels = () => {
        // recurring label
        model.appendRecurringLabel(__recurringContainer);

        // times label
        model.appendTimesLabel(__recurringContainer, getTimes());

        model.appendIntervalLabel(__productPriceContainer, getInterval());
    };

    const updateProductRecurringLabel = () => {
        removeRecurringDetailsLabels();

        if (checkRecurringMatch() || checkRecurringChoice()) {
            addRecurringDetailsLabels();
        }
    }

    document.querySelectorAll('form[name=sylius_add_to_cart]').forEach((form) => {
        form.addEventListener('change', updateProductRecurringLabel)
    });
    updateProductRecurringLabel();
});
