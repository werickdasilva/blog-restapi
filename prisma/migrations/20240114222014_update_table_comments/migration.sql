-- AlterTable
ALTER TABLE `comments` ADD COLUMN `create_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
