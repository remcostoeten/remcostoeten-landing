-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "views" (
    "slug" VARCHAR(128) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "views_pkey" PRIMARY KEY ("slug")
);

-- CreateTable
CREATE TABLE "Guestbook" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_by" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guestbook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
