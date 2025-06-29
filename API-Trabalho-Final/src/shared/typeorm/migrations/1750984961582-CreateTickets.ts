import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTickets1750984961582 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "tickets",
            columns: [
                {name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()"},
                { name: "film", type: "varchar" },
                { name: "seats", type: "varchar" },
                { name: "room", type: "varchar" },
                { name: "session_date", type: "timestamp" },
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("tickets")
    }

}
