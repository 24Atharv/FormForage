-- CreateTable
CREATE TABLE "public"."Forms" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Forms_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Forms" ADD CONSTRAINT "Forms_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
