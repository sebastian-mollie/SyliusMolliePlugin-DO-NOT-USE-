<?php

declare(strict_types=1);

namespace Tests\BitBag\SyliusMolliePlugin\PHPUnit\Functional;

use ApiTestCase\JsonApiTestCase;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Webmozart\Assert\Assert;

class FunctionalTestCase extends JsonApiTestCase
{
    public function __construct(
        ?string $name = null,
        array $data = [],
        string $dataName = ''
    )
    {
        parent::__construct($name, $data, $dataName);

        $this->dataFixturesPath = __DIR__ . '/DataFixtures';
    }

    protected function getContainerByVersion(): ContainerInterface
    {
        /**
         * Function getContainer is not available before Symfony 5.3
         */
        if (method_exists(KernelTestCase::class, 'getContainer')) {
            $container = self::getContainer();
        } else {
            $container = self::$container;
        }

        Assert::isInstanceOf($container, ContainerInterface::class);

        return $container;
    }
}
