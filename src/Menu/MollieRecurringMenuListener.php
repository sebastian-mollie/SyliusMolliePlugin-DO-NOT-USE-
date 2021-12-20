<?php
declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Menu;

use Sylius\Bundle\UiBundle\Menu\Event\MenuBuilderEvent;

final class MollieRecurringMenuListener
{
    public function buildMenu(MenuBuilderEvent $menuBuilderEvent): void
    {
        $menu = $menuBuilderEvent->getMenu();
        $menuItem =
            $menu
                ->getChild('mollie');

        $menuItem
            ->addChild('mollie_recurring_payments', [
                'route' => 'bitbag_sylius_mollie_plugin_admin_product_type_index',
            ])
            ->setLabel('bitbag_sylius_mollie_plugin.ui.mollie_recurring_payments')
            ->setLabelAttribute('icon', 'payment')
        ;

        $menuItem
            ->addChild('mollie_recurring_orders', [
                'route' => 'bitbag_sylius_mollie_plugin_admin_product_type_index',
            ])
            ->setLabel('bitbag_sylius_mollie_plugin.ui.mollie_recurring_orders')
            ->setLabelAttribute('icon', 'cart')
        ;
    }
}
