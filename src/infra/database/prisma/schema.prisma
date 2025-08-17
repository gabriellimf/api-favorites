generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Customer {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  favorites Favorite[]

  @@map("customers")
}

model Favorite {
  id         String   @id @default(uuid())
  customerId String
  productId  Int
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  customer Customer @relation(fields: [customerId], references: [id], onDelete: Cascade)

  @@unique([customerId, productId])
  @@map("favorites")
}