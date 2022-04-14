<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * another great project.
 * You can find more information about us on https://bitbag.shop and write us
 * an email on mikolaj.krol@bitbag.pl.
 */

declare(strict_types=1);

namespace Tests\BitBag\SyliusMolliePlugin\Behat\Context\Setup;

use Behat\Behat\Context\Context;
use BitBag\SyliusMolliePlugin\Entity\GatewayConfigInterface;
use BitBag\SyliusMolliePlugin\Entity\MollieGatewayConfigInterface;
use BitBag\SyliusMolliePlugin\Factory\MollieGatewayFactory;
use BitBag\SyliusMolliePlugin\Factory\MollieSubscriptionGatewayFactory;
use BitBag\SyliusMolliePlugin\Purifier\MolliePaymentMethodPurifierInterface;
use BitBag\SyliusMolliePlugin\Resolver\MollieMethodsResolverInterface;
use Doctrine\ORM\EntityManager;
use Sylius\Behat\Service\SharedStorageInterface;
use Sylius\Bundle\CoreBundle\Fixture\Factory\ExampleFactoryInterface;
use Sylius\Bundle\ResourceBundle\Doctrine\ORM\EntityRepository;
use Sylius\Component\Core\Model\PaymentMethodInterface;
use Sylius\Component\Core\Repository\PaymentMethodRepositoryInterface;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

final class MollieContext implements Context
{
    /** @var SharedStorageInterface */
    private $sharedStorage;

    /** @var PaymentMethodRepositoryInterface */
    private $paymentMethodRepository;

    /** @var ExampleFactoryInterface */
    private $paymentMethodExampleFactory;

    /** @var EntityManager */
    private $paymentMethodManager;

    private string $mollieApiKeyTest;

    private string $mollieProfileId;

    private MollieMethodsResolverInterface $mollieMethodsResolver;

    private MolliePaymentMethodPurifierInterface $molliePaymentMethodPurifier;

    private EntityRepository $gatewayConfigRepository;

    private EntityRepository $mollieConfigurationRepository;

    public function __construct(
        SharedStorageInterface $sharedStorage,
        PaymentMethodRepositoryInterface $paymentMethodRepository,
        ExampleFactoryInterface $paymentMethodExampleFactory,
        EntityManager $paymentMethodManager,
        string $mollieApiKeyTest,
        string $mollieProfileId,
        MollieMethodsResolverInterface $mollieMethodsResolver,
        MolliePaymentMethodPurifierInterface $molliePaymentMethodPurifier,
        EntityRepository $gatewayConfigRepository,
        EntityRepository $mollieConfigurationRepository
    ) {
        $this->sharedStorage = $sharedStorage;
        $this->paymentMethodRepository = $paymentMethodRepository;
        $this->paymentMethodExampleFactory = $paymentMethodExampleFactory;
        $this->paymentMethodManager = $paymentMethodManager;
        $this->mollieApiKeyTest = $mollieApiKeyTest;
        $this->mollieProfileId = $mollieProfileId;
        $this->mollieMethodsResolver = $mollieMethodsResolver;
        $this->molliePaymentMethodPurifier = $molliePaymentMethodPurifier;
        $this->gatewayConfigRepository = $gatewayConfigRepository;
        $this->mollieConfigurationRepository = $mollieConfigurationRepository;
    }

    /**
     * @Given the store has a payment method :paymentMethodName with a code :paymentMethodCode and Mollie payment gateway
     */
    public function theStoreHasAPaymentMethodWithACodeAndMolliePaymentGateway(string $paymentMethodName, string $paymentMethodCode): void
    {
        $paymentMethod = $this->createPaymentMethodMollie(
            $paymentMethodName,
            $paymentMethodCode,
            MollieGatewayFactory::FACTORY_NAME,
            'Mollie'
        );

        $paymentMethod->getGatewayConfig()->setConfig([
            'api_key' => 'test',
            'payum.http_client' => '@bitbag_sylius_mollie_plugin.mollie_api_client',
            'api_key_test' => $this->mollieApiKeyTest,
            'profile_id' => $this->mollieProfileId,
            'environment' => null,
        ]);

        $this->paymentMethodManager->flush();
    }

    /**
     * @Given gateway :paymentMethodCode has all methods loaded and enabled
     */
    public function gatewayHasAllMethodsLoadedAndEnabled(string $paymentMethodCode): void
    {
        /** @var GatewayConfigInterface $gatewayConfig */
        $gatewayConfig = $this->gatewayConfigRepository
            ->findOneBy([
                'gatewayName' => $paymentMethodCode,
            ]);

        if (null === $gatewayConfig) {
            throw new ResourceNotFoundException('Gateway not found');
        }

        $this->loadMolliePaymentMethods($gatewayConfig);

        $this->enableAllMolliePaymentMethods();
    }

    /**
     * @Given the store has a payment method :paymentMethodName with a code :paymentMethodCode and Mollie Subscription payment gateway
     */
    public function theStoreHasAPaymentMethodWithACodeAndMollieSubscriptionPaymentGateway(string $paymentMethodName, string $paymentMethodCode): void
    {
        $paymentMethod = $this->createPaymentMethodMollie(
            $paymentMethodName,
            $paymentMethodCode,
            MollieSubscriptionGatewayFactory::FACTORY_NAME,
            'Mollie Subscription'
        );

        $paymentMethod->getGatewayConfig()->setConfig([
            'api_key' => 'test',
            'payum.http_client' => '@bitbag_sylius_mollie_plugin.mollie_api_client',
            'api_key_test' => $this->mollieApiKeyTest,
            'profile_id' => $this->mollieProfileId,
            'environment' => null,
        ]);

        $this->paymentMethodManager->flush();
    }

    private function loadMolliePaymentMethods(GatewayConfigInterface $gatewayConfig): void
    {
        $this->mollieMethodsResolver->createForGateway($gatewayConfig);

        $this->molliePaymentMethodPurifier->removeAllNoLongerSupportedMethods();
    }

    private function enableAllMolliePaymentMethods(): void
    {
        $molliePaymentMethods = $this->mollieConfigurationRepository->findAll();

        /** @var MollieGatewayConfigInterface $molliePaymentMethod */
        foreach ($molliePaymentMethods as $molliePaymentMethod) {
            $molliePaymentMethod->enable();
            $molliePaymentMethod->setCountryRestriction(MollieGatewayConfigInterface::ALL_COUNTRIES);
        }
    }

    private function createPaymentMethodMollie(
        string $name,
        string $code,
        string $factoryName,
        string $description = '',
        bool $addForCurrentChannel = true,
        int $position = null
    ): PaymentMethodInterface {
        /** @var PaymentMethodInterface $paymentMethod */
        $paymentMethod = $this->paymentMethodExampleFactory->create([
            'name' => ucfirst($name),
            'code' => $code,
            'description' => $description,
            'gatewayName' => $factoryName,
            'gatewayFactory' => $factoryName,
            'enabled' => true,
            'channels' => ($addForCurrentChannel && $this->sharedStorage->has('channel')) ? [$this->sharedStorage->get('channel')] : [],
        ]);

        if (null !== $position) {
            $paymentMethod->setPosition($position);
        }

        $this->sharedStorage->set('payment_method', $paymentMethod);
        $this->paymentMethodRepository->add($paymentMethod);

        return $paymentMethod;
    }
}
