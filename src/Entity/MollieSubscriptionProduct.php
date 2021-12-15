<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * You can find more information about us on https://bitbag.io and write us
 * an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Entity;

use Sylius\Component\Core\Model\ProductInterface as SyliusProduct;

final class MollieSubscriptionProduct implements MollieSubscriptionProductInterface
{
    /** @var int|null */
    private $id;

    /** @var \Sylius\Component\Core\Model\ProductInterface */
    private $product;

    /** @var int */
    private $productAmount = 1;

    /** @var MollieSubscriptionInterface */
    private $subscription;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): SyliusProduct
    {
        return $this->product;
    }

    public function getProductAmount(): int
    {
        return $this->productAmount;
    }

    public function getSubscription(): MollieSubscriptionInterface
    {
        return $this->subscription;
    }

    public function setProduct(SyliusProduct $product): void
    {
        $this->product = $product;
    }

    public function setProductAmount(int $productAmount): void
    {
        $this->productAmount = $productAmount;
    }

    public function setSubscription(MollieSubscriptionInterface $subscription): void
    {
        $this->subscription = $subscription;
    }
}
