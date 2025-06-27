import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddClientIdToTickets1750994589158 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tickets', 
            new TableColumn({
                name: 'clientId',
                type: 'uuid',
                isNullable: true
            })
        )
        await queryRunner.createForeignKey('tickets',
            new TableForeignKey({
                name: 'ClientTicket',
                columnNames: ['clientId'],
                referencedTableName: 'clients',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tickets', 'TicketsClient');
        await queryRunner.dropColumn('tickets', 'clientId');
    }

}
