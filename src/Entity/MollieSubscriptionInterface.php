<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Entity;

use Doctrine\Common\Collections\Collection;
use Sylius\Component\Core\Model\PaymentInterface;
use Sylius\Component\Resource\Model\ResourceInterface;
use Sylius\Component\User\Model\UserInterface;

interface MollieSubscriptionInterface extends ResourceInterface
{
    public const STATUS_PENDING = 'pending';
    public const STATUS_ACTIVE = 'active';
    public const STATUS_CANCELED = 'canceled';
    public const STATUS_COMPLETED = 'completed';

    public function getState(): string;
    public function setState(string $status): void;

    public function getIntervalDays(): int;
    public function setIntervalDays(int $interval): void;

    /** @return Collection<int, PaymentInterface> */
    public function getPayments(): Collection;
    public function addPayment(PaymentInterface $payment): void;

    /** @return Collection<int, OrderInterface> */
    public function getOrders(): Collection;
    public function addOrder(OrderInterface $order): void;

    public function getUser(): UserInterface;
    public function setUser(UserInterface $user): void;
}
