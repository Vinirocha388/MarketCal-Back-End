-- CreateTable
CREATE TABLE "_PostToSocialAccount" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PostToSocialAccount_A_fkey" FOREIGN KEY ("A") REFERENCES "posts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PostToSocialAccount_B_fkey" FOREIGN KEY ("B") REFERENCES "social_accounts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "social_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_social_accounts" ("createdAt", "handle", "id", "name", "platform", "updatedAt", "userId") SELECT "createdAt", "handle", "id", "name", "platform", "updatedAt", "userId" FROM "social_accounts";
DROP TABLE "social_accounts";
ALTER TABLE "new_social_accounts" RENAME TO "social_accounts";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_PostToSocialAccount_AB_unique" ON "_PostToSocialAccount"("A", "B");

-- CreateIndex
CREATE INDEX "_PostToSocialAccount_B_index" ON "_PostToSocialAccount"("B");
