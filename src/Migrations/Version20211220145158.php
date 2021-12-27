<?php

declare(strict_types=1);

namespace BitBag\SyliusMolliePlugin\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20211220145158 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sylius_order ADD subscription_id INT DEFAULT NULL, ADD recurring TINYINT(1) DEFAULT 0, ADD recurring_sequence_index INT DEFAULT NULL');
        $this->addSql('ALTER TABLE sylius_order ADD CONSTRAINT FK_6196A1F99A1887DC FOREIGN KEY (subscription_id) REFERENCES bitbag_mollie_subscription (id) ON DELETE RESTRICT');
        $this->addSql('CREATE INDEX IDX_6196A1F99A1887DC ON sylius_order (subscription_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE sylius_order DROP FOREIGN KEY FK_6196A1F99A1887DC');
        $this->addSql('DROP INDEX IDX_6196A1F99A1887DC ON sylius_order');
        $this->addSql('ALTER TABLE sylius_order DROP subscription_id, DROP recurring, DROP recurring_sequence_index');
    }
}
