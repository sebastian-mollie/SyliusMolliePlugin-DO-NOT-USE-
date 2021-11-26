<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Repository;

use BitBag\SyliusMolliePlugin\Entity\MollieSubscriptionInterface;
use Sylius\Component\Resource\Repository\RepositoryInterface;
use Sylius\Component\User\Model\UserInterface;

interface MollieSubscriptionRepositoryInterface extends RepositoryInterface
{
    /** @return MollieSubscriptionInterface[] */
    public function findUserSubscriptions(UserInterface $user): array;
}
