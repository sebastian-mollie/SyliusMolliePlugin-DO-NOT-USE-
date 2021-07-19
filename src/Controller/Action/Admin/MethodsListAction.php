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
use Sylius\Bundle\PaymentBundle\Form\Type\PaymentMethodType;
use Sylius\Component\Resource\Repository\RepositoryInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;


final class MethodsListAction extends AbstractController
{
    /** @var RepositoryInterface $gatewayConfigRepository */
    private $gatewayConfigRepository;

    /** @var Environment $twig */
    private $twig;

    public function __construct(RepositoryInterface $gatewayConfigRepository, Environment $twig)
    {
        $this->gatewayConfigRepository = $gatewayConfigRepository;
        $this->twig = $twig;
    }

    public function __invoke(Request $request): Response
    {
        $gatewayName = $request->get('gatewayName');

        /** @var GatewayConfigInterface $gatewayConfig */
        $gatewayConfig = $this->gatewayConfigRepository->findOneBy([
            'code' => $gatewayName,
        ]);

        $form = $this->createForm(PaymentMethodType::class, $gatewayConfig);

        $renderedForm = $this->twig->render(
            'bundles/SyliusAdminBundle/PaymentMethod/_mollieMethodsForm.html.twig',
            ['form' => $form->createView()]
        );

        if (null === $gatewayConfig) {
            return new JsonResponse(['message' => sprintf("Gateway with name %s doesn't exist", $gatewayName)]);
        }

        return new JsonResponse(['form' => $renderedForm]);
    }
}
