<?php

/*
    This file was created by developers working at BitBag
    Do you need more information about us and what we do? Visit our   website!
    We are hiring developers from all over the world. Join us and start your new, exciting adventure and become part of us: https://bitbag.io/career
*/

declare(strict_types=1);

namespace spec\BitBag\SyliusMolliePlugin\Cli;

use BitBag\SyliusMolliePlugin\Cli\SendAbandonedPaymentLink;
use BitBag\SyliusMolliePlugin\Creator\AbandonedPaymentLinkCreatorInterface;
use PhpSpec\ObjectBehavior;
use Symfony\Component\Console\Command\Command;

final class SendAbandonedPaymentLinkSpec extends ObjectBehavior
{
    function let(
        AbandonedPaymentLinkCreatorInterface $abandonedPaymentLinkCreator
    ): void {
        $this->beConstructedWith($abandonedPaymentLinkCreator);
    }

    function it_is_initializable(): void
    {
        $this->shouldHaveType(SendAbandonedPaymentLink::class);
    }

    function it_should_have_extends_command(): void
    {
        $this->shouldBeAnInstanceOf(Command::class);
    }
}
