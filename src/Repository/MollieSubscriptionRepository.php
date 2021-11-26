<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Repository;

use Sylius\Bundle\ResourceBundle\Doctrine\ORM\EntityRepository;
use Sylius\Component\User\Model\UserInterface;

final class MollieSubscriptionRepository extends EntityRepository implements MollieSubscriptionRepositoryInterface
{
    public function findUserSubscriptions(UserInterface $user): array
    {
        return $this->findBy([
            'user' => $user,
        ]);
    }
}
