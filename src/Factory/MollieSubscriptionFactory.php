<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Factory;

use BitBag\SyliusMolliePlugin\Entity\MollieSubscriptionInterface;
use BitBag\SyliusMolliePlugin\Entity\OrderInterface;
use Sylius\Component\Resource\Factory\FactoryInterface;

final class MollieSubscriptionFactory implements MollieSubscriptionFactoryInterface
{
    /** @var FactoryInterface */
    private $decoratedFactory;

    public function __construct(FactoryInterface $decoratedFactory)
    {
        $this->decoratedFactory = $decoratedFactory;
    }

    public function createNew(): MollieSubscriptionInterface
    {
        /** @var MollieSubscriptionInterface $subscriptionTemplate */
        $subscriptionTemplate = $this->decoratedFactory->createNew();

        return $subscriptionTemplate;
    }

    public function createFromFirstOrder(OrderInterface $order): MollieSubscriptionInterface
    {
        $subscriptionTemplate = $this->createNew();

        $subscriptionTemplate->setUser($order->getUser());
        $subscriptionTemplate->addOrder($order);

        foreach ($order->getPayments() as $payment) {
            $subscriptionTemplate->addPayment($payment);
        }

        return $subscriptionTemplate;
    }
}
