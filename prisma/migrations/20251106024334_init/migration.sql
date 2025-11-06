/*
  Warnings:

  - You are about to drop the `_PostAccounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `media` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `social_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Made the column `handle` on table `social_accounts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "_PostAccounts_B_index";

-- DropIndex
DROP INDEX "_PostAccounts_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostAccounts";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "imageUrl" TEXT,
    "scheduledAt" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_posts" ("content", "createdAt", "id", "imageUrl", "scheduledAt", "status", "updatedAt", "userId") SELECT "content", "createdAt", "id", "imageUrl", "scheduledAt", "status", "updatedAt", "userId" FROM "posts";
DROP TABLE "posts";
ALTER TABLE "new_posts" RENAME TO "posts";
CREATE TABLE "new_social_accounts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_social_accounts" ("createdAt", "handle", "id", "name", "platform", "updatedAt", "userId") SELECT "createdAt", "handle", "id", "name", "platform", "updatedAt", "userId" FROM "social_accounts";
DROP TABLE "social_accounts";
ALTER TABLE "new_social_accounts" RENAME TO "social_accounts";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_users" ("createdAt", "email", "id", "name", "password", "updatedAt") SELECT "createdAt", "email", "id", "name", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
