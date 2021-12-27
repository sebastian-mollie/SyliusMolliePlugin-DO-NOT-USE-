<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Form\Type;

use BitBag\SyliusMolliePlugin\Entity\MollieSubscriptionInterface;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

final class MollieSubscriptionStateGridFilterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add(
            'state',
            ChoiceType::class,
            [
                'label' => false,
                'choices' => [
                    MollieSubscriptionInterface::STATE_NEW,
                    MollieSubscriptionInterface::STATE_ACTIVE,
                    MollieSubscriptionInterface::STATE_PROCESSING,
                    MollieSubscriptionInterface::STATE_CANCELED,
                    MollieSubscriptionInterface::STATE_COMPLETED,
                ],
                'choice_label' => function (string $value) {
                    return sprintf('bitbag_sylius_mollie_plugin.ui.subscription.state.%s', $value);
                },
                'expanded' => true,
                'multiple' => true,
            ]
        );
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver
            ->setDefaults([
                'state' => null,
            ])
            ->setAllowedTypes('state', ['array', 'null'])
        ;
    }
}