<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * You can find more information about us on https://bitbag.io and write us
 * an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Sylius\Component\Core\Model\PaymentInterface;
use Sylius\Component\User\Model\UserInterface;
use Sylius\Component\Core\Model\OrderInterface as SyliusOrder;

class MollieSubscription implements MollieSubscriptionInterface
{
    /** @var int|null */
    protected $id;

    /** @var string */
    protected $state = MollieSubscriptionInterface::STATE_NEW;

    /** @var int */
    protected $interval = MollieSubscriptionInterface::INTERVAL_DEFAULT;

    /** @var Collection<int, PaymentInterface> */
    protected $payments;

    /** @var Collection<int, SyliusOrder> */
    protected $orders;

    /** @var Collection<int, MollieSubscriptionProductInterface> */
    protected $products;

    /** @var UserInterface */
    protected $user;

    /** @var \DateTime */
    protected $createdAt;

    /** @var \DateTime|null */
    protected $startedAt;

    /** @var string|null */
    protected $subscriptionId;

    /** @var string|null */
    protected $customerId;

    public function __construct()
    {
        $this->payments = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->products = new ArrayCollection();
        $this->createdAt = new \DateTime();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getState(): string
    {
        return $this->state;
    }

    public function setState(string $state): void
    {
        $this->state = $state;
    }

    public function getIntervalDays(): int
    {
        return $this->interval;
    }

    public function setIntervalDays(int $interval): void
    {
        $this->interval = $interval;
    }

    public function getPayments(): Collection
    {
        return $this->payments;
    }

    public function addPayment(PaymentInterface $payment): void
    {
        if (false === $this->payments->contains($payment)) {
            $this->payments->add($payment);
        }
    }

    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(SyliusOrder $order): void
    {
        if (false === $this->orders->contains($order)) {
            $this->orders->add($order);
        }
    }

    public function getUser(): UserInterface
    {
        return $this->user;
    }

    public function setUser(UserInterface $user): void
    {
        $this->user = $user;
    }

    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(MollieSubscriptionProductInterface $product): void
    {
        if (false === $this->products->contains($product)) {
            $this->products->add($product);
            $product->setSubscription($this);
        }
    }

    public function getInterval(): int
    {
        return $this->interval;
    }

    public function setInterval(int $interval): void
    {
        $this->interval = $interval;
    }

    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    public function getStartedAt(): ?\DateTime
    {
        return $this->startedAt;
    }

    public function setStartedAt(?\DateTime $startedAt = null): void
    {
        $this->startedAt = $startedAt;
    }

    public function getSubscriptionId(): ?string
    {
        return $this->subscriptionId;
    }

    public function setSubscriptionId(?string $subscriptionId = null): void
    {
        $this->subscriptionId = $subscriptionId;
    }

    public function getCustomerId(): ?string
    {
        return $this->customerId;
    }

    public function setCustomerId(?string $customerId = null): void
    {
        $this->customerId = $customerId;
    }

    public function getLastOrder(): ?SyliusOrder
    {
        return $this->orders->last();
    }
}
