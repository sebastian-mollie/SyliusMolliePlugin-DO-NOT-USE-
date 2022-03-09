<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * You can find more information about us on https://bitbag.io and write us
 * an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Validator\Constraints;

use BitBag\SyliusMolliePlugin\Factory\MollieSubscriptionGatewayFactory;
use Sylius\Component\Core\Model\ChannelInterface;
use Sylius\Component\Core\Model\PaymentMethodInterface;
use Sylius\Component\Currency\Model\CurrencyInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Webmozart\Assert\Assert;

final class CurrencyValidator extends ConstraintValidator
{
    public function validate($paymentMethod, Constraint $constraint): void
    {
        Assert::isInstanceOf($paymentMethod, PaymentMethodInterface::class);

        Assert::isInstanceOf($constraint, Currency::class);

        $gatewayConfig = $paymentMethod->getGatewayConfig();

        if (
            null === $gatewayConfig ||
            (
                MollieSubscriptionGatewayFactory::FACTORY_NAME !== $gatewayConfig->getFactoryName()
            )
        ) {
            return;
        }

        /** @var ChannelInterface $channel */
        foreach ($paymentMethod->getChannels() as $channel) {
            /** @var CurrencyInterface $baseChannelCurrency */
            $baseChannelCurrency = $channel->getBaseCurrency();
            $currencyCode = $baseChannelCurrency->getCode();

            if (null === $currencyCode) {
                return;
            }

            if (
                false === in_array(
                    strtoupper($currencyCode),
                    MollieSubscriptionGatewayFactory::CURRENCIES_AVAILABLE,
                    true
                )
            ) {
                $message = $constraint->message ?? null;

                Assert::notNull($message);
                $this->context->buildViolation($message, [
                    '{{ currencies }}' => implode(', ', MollieSubscriptionGatewayFactory::CURRENCIES_AVAILABLE),
                ])->atPath('channels')->addViolation();

                return;
            }
        }
    }
}
