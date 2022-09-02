export const model = {
    appendIntervalLabel: (container, interval) => {
        const __everyDaysLabel = document.getElementById('sylius-variants-recurring-interval-days').innerText;
        const __everyWeeksLabel = document.getElementById('sylius-variants-recurring-interval-weeks').innerText;
        const __everyMonthsLabel = document.getElementById('sylius-variants-recurring-interval-months').innerText;

        const [amount, step] = interval.split(/\s+/g);
        let everyLabel = '';

        switch (step) {
            case 'days':
                everyLabel = __everyDaysLabel;
                break;
            case 'weeks':
                everyLabel = __everyWeeksLabel;
                break;
            case 'months':
                everyLabel = __everyMonthsLabel;
                break;
        }

        if (everyLabel !== '') {
            const __intervalElementContainer = document.getElementById('sylius-variants-recurring-interval-label').firstChild;
            const __everyLabel = document.createElement('div');
            __everyLabel.id = 'every-label';
            __everyLabel.className = 'item mollie-every-label-container';
            __intervalElementContainer.textContent = everyLabel.replace(/\%amount\%/, amount);
            __everyLabel.appendChild(__intervalElementContainer);
            container.appendChild(__everyLabel);
        }

    },
    appendRecurringLabel: (container) => {
        const __productNameRecurringPrefix = document.getElementById('sylius-variants-recurring-label').firstChild;
        const __prefixLabel = document.createElement('span');
        __prefixLabel.id = 'recurring-label';
        __prefixLabel.className = 'item';
        __prefixLabel.appendChild(__productNameRecurringPrefix);
        container.appendChild(__prefixLabel);
    },
    appendTimesLabel: (container, times) => {
        const __recurringTimes = document.getElementById('sylius-variants-recurring-times-label').firstChild;
        const __recurringTimesLabel = document.createElement('span');
        __recurringTimesLabel.id = 'recurring-times';
        __recurringTimesLabel.className = 'item';
        __recurringTimesLabel.appendChild(__recurringTimes);
        Array.from(__recurringTimesLabel.children).forEach((e) => {
            __recurringTimesLabel.prepend(times + ' ')
        })
        container.appendChild(__recurringTimesLabel);
    },
    addRecurringDetailsLabels: (itemContainer, totalContainer, interval, times) => {
        const __recurringContainer = document.createElement('div');

        // recurring label
        model.appendRecurringLabel(__recurringContainer);

        // times label
        model.appendTimesLabel(__recurringContainer, times);

        itemContainer.appendChild(__recurringContainer);

        model.appendIntervalLabel(totalContainer, interval);
    },
    clearLabels: () => {
        let recurringLabel = document.getElementById('recurring-label');
        if(recurringLabel) {
            recurringLabel.remove();
        }

        let recurringInterval = document.getElementById('recurring-interval');
        if(recurringInterval) {
            recurringInterval.remove();
        }

        let everyLabel = document.getElementById('every-label');
        if(everyLabel) {
            everyLabel.remove();
        }
    }
}
