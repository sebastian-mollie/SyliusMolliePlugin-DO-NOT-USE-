<?php
/*
    This file was created by developers working at BitBag
    Do you need more information about us and what we do? Visit our   website!
    We are hiring developers from all over the world. Join us and start your new, exciting adventure and become part of us: https://bitbag.io/career
*/
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Factory;

use BitBag\SyliusMolliePlugin\Request\Api\CreateCustomer;

final class ApiCustomerFactory implements ApiCustomerFactoryInterface
{
    public function createNew(array $details): CreateCustomer
    {
        return new CreateCustomer($details);
    }
}
