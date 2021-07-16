<?php

/*
 * This file has been created by developers from BitBag.
 * Feel free to contact us once you face any issues or want to start
 * You can find more information about us on https://bitbag.io and write us
 * an email on hello@bitbag.io.
 */

declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Controller\Action\Admin;

use BitBag\SyliusMolliePlugin\Entity\GatewayConfigInterface;
use Sylius\Component\Resource\Repository\RepositoryInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\Serializer;


final class MethodsListAction
{
    /** @var RepositoryInterface $gatewayConfigRepository */
    private $gatewayConfigRepository;

    /** @var Serializer */
    private $serializer;

    public function __construct(RepositoryInterface $gatewayConfigRepository, Serializer $serializer)
    {
        $this->gatewayConfigRepository = $gatewayConfigRepository;
        $this->serializer = $serializer;
    }

    public function __invoke(Request $request): Response
    {
        $gatewayName = $request->get('gatewayName');

        /** @var GatewayConfigInterface $gatewayConfig */
        $gatewayConfig = $this->gatewayConfigRepository->findOneBy([
            'gatewayName' => $gatewayName,
        ]);

        if (null === $gatewayConfig) {
            return new JsonResponse(['message' => sprintf("Gateway with name %s doesn't exist", $gatewayName)]);
        }

        $molliePaymentMethods = $this->serializer->serialize(
            $gatewayConfig->getMollieGatewayConfig(),
            'json',
            [AbstractNormalizer::IGNORED_ATTRIBUTES => ['mollieGatewayConfig']]
        );

        return new JsonResponse($molliePaymentMethods);
    }
}
