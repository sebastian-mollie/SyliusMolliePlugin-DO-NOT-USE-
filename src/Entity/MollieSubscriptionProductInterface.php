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
use Sylius\Component\Resource\Model\ResourceInterface;

interface MollieSubscriptionProductInterface extends ResourceInterface
{
    public function getId(): ?int;

    public function getProduct(): SyliusProduct;

    public function getProductAmount(): int;

    public function getSubscription(): MollieSubscriptionInterface;

    public function setProduct(SyliusProduct $product): void;

    public function setProductAmount(int $productAmount): void;

    public function setSubscription(MollieSubscriptionInterface $subscription): void;
}
