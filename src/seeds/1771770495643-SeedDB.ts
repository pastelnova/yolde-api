import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1771770495643 implements MigrationInterface {
  name = 'SeedDB1771770495643';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('programming'),
          ('webdev'),
          ('javascript'),
          ('ai'),
          ('design'),
          ('startup'),
          ('python'),
          ('ux'),
          ('career'),
          ('productivity'),
          ('rust'),
          ('data'),
          ('angular'),
          ('signals'),
          ('typescript')`,
    );

    await queryRunner.query(`
    INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$9B31SAVyJ6eUZoCO1zimke.Z1u60EO8DpkRB6zc7Z8ufJTuKzi0D.')`);

    await queryRunner.query(`
      INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First Article', 'This is the first article description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'programming,webdev', 1), ('second-article', 'Second Article', 'This is the second article description', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 'javascript,ai', 1)`);
  }

  public async down(): Promise<void> {}
}
