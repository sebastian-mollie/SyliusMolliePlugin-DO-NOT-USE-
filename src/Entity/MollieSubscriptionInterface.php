<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * You can find more information about us on https://bitbag.io and write us
 * an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Entity;

use Doctrine\Common\Collections\Collection;
use Sylius\Component\Core\Model\PaymentInterface;
use Sylius\Component\Resource\Model\ResourceInterface;
use Sylius\Component\User\Model\UserInterface;
use Sylius\Component\Core\Model\OrderInterface as SyliusOrder;

interface MollieSubscriptionInterface extends ResourceInterface
{
    public const STATE_NEW = 'new';
    public const STATE_ACTIVE = 'active';
    public const STATE_PROCESSING = 'processing';
    public const STATE_CANCELED = 'canceled';
    public const STATE_COMPLETED = 'completed';

    public const INTERVAL_DEFAULT = 30;

    public function getState(): string;
    public function setState(string $state): void;

    /** @return Collection<int, PaymentInterface> */
    public function getPayments(): Collection;
    public function addPayment(PaymentInterface $payment): void;

    /** @return Collection<int, SyliusOrder> */
    public function getOrders(): Collection;
    public function addOrder(SyliusOrder $order): void;

    public function getUser(): UserInterface;
    public function setUser(UserInterface $user): void;

    /** @return Collection<int, MollieSubscriptionProductInterface> */
    public function getProducts(): Collection;
    public function addProduct(MollieSubscriptionProductInterface $product): void;

    public function getInterval(): int;
    public function setInterval(int $interval): void;

    public function getNumberOfRepetitions(): int;
    public function setNumberOfRepetitions(int $numberOfRepetitions): void;

    public function getCreatedAt(): \DateTime;

    public function getStartedAt(): ?\DateTime;
    public function setStartedAt(?\DateTime $startedAt = null): void;

    public function getSubscriptionId(): ?string;
    public function setSubscriptionId(?string $subscriptionId = null): void;

    public function getCustomerId(): ?string;
    public function setCustomerId(?string $customerId = null): void;

    public function getLastOrder(): ?SyliusOrder;
}
