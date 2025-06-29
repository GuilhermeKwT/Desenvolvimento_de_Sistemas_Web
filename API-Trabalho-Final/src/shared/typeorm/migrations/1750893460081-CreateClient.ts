import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClient1750893460081 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "clients",
            columns: [
                {name: "id", type: "uuid", isPrimary: true, generationStrategy: "uuid", default: "uuid_generate_v4()"},
                { name: "name", type: "varchar" },
                { name: "email", type: "varchar", isUnique: true },
                { name: "password", type: "varchar" },
                { name: "avatar", type: "varchar", isNullable: true},
                { name: "phone_number", type: "varchar", isNullable: true},
                { name: "created_at", type: "timestamp", default: "now()" },
                { name: "updated_at", type: "timestamp", default: "now()" },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("clients")
    }

}
