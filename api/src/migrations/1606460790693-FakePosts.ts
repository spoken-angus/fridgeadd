import { MigrationInterface, QueryRunner } from "typeorm";

export class FakePosts1606460790693 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            insert into fridge (title, text, "creatorId") values ('City Center', 'This fridge is located on the north-east corner of 34th St and 9th Ave', 1);
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
