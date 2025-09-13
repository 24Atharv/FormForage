-- CreateTable
CREATE TABLE "public"."ResponseAnswer" (
    "id" SERIAL NOT NULL,
    "responseId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "ResponseAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ResponseAnswer" ADD CONSTRAINT "ResponseAnswer_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "public"."Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ResponseAnswer" ADD CONSTRAINT "ResponseAnswer_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "public"."FormField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
