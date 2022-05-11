<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * You can find more information about us on https://bitbag.io and write us
 * an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace Tests\BitBag\SyliusMolliePlugin\Behat\Context\Api;

use Behat\Behat\Context\Context;
use BitBag\SyliusMolliePlugin\Entity\OrderInterface;
use BitBag\SyliusMolliePlugin\Repository\OrderRepositoryInterface;
use Sylius\Component\Payment\Model\PaymentInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Component\HttpFoundation\Request;
use Webmozart\Assert\Assert;

final class MollieApiContext implements Context
{
    private OrderRepositoryInterface $orderRepository;

    private KernelBrowser $kernelBrowser;

    public function __construct(
        OrderRepositoryInterface $orderRepository,
        KernelBrowser $kernelBrowser
    ) {
        $this->orderRepository = $orderRepository;
        $this->kernelBrowser = $kernelBrowser;
    }

    /**
     * @When Mollie call notify webhook on newest recurring order
     */
    public function mollieCallRecurringPaymentWebhook(): void
    {
        $newestOrders = $this->orderRepository->findLatest(1);

        $newestOrder = $newestOrders[0];
        Assert::isInstanceOf($newestOrder, OrderInterface::class);

        $orderPayment = $newestOrder->getPayments()->first();
        Assert::isInstanceOf($orderPayment, PaymentInterface::class);

        $notifyWebhook = $orderPayment->getDetails()['webhookUrl'];

        $this->request(
            Request::METHOD_POST,
            $notifyWebhook,
            [],
            '',
            ['id' => 'tr_recurring_payment_paid' . '-' . $newestOrder->getId()]
        );
    }

    private function request(
        string $method,
        string $uri,
        array $server = [],
        string $requestBody = null,
        array $parameters = [],
        array $files = []
    ): void {
        $this->kernelBrowser->request($method, $uri, $parameters, $files, $server, $requestBody);
    }
}
