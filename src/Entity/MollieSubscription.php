<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Sylius\Component\Core\Model\PaymentInterface;
use Sylius\Component\User\Model\UserInterface;

class MollieSubscription implements MollieSubscriptionInterface
{
    /** @var int|null */
    protected $id;

    /** @var string */
    protected $state = MollieSubscriptionInterface::STATUS_PENDING;

    /** @var int */
    protected $interval;

    /** @var Collection<int, PaymentInterface> */
    protected $payments;

    /** @var Collection<int, OrderInterface> */
    protected $orders;

    /** @var UserInterface */
    protected $user;

    /** @var \DateTime */
    protected $createdAt;

    /** @var \DateTime */
    protected $startedAt;

    public function __construct()
    {
        $this->payments = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

}
