# Migration `20200318131106-auth`

This migration has been generated by Mina Saleeb at 3/18/2020, 1:11:06 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `hds`.`Employee` CHANGE role role ENUM('MODERATOR', 'ADMIN')

ALTER TABLE `hds`.`Customer` ADD COLUMN `createdAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
ADD COLUMN `updatedAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ;

ALTER TABLE `hds`.`Employee` DROP COLUMN `name`,
ADD COLUMN `createdAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
ADD COLUMN `firstName` varchar(191) NOT NULL DEFAULT '' ,
ADD COLUMN `jwtUserSecret` varchar(191) NOT NULL DEFAULT '' ,
ADD COLUMN `lastName` varchar(191) NOT NULL DEFAULT '' ,
ADD COLUMN `password` varchar(191) NOT NULL DEFAULT '' ,
ADD COLUMN `updatedAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ;

ALTER TABLE `hds`.`ProductOrder` ADD COLUMN `orderDate` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ;

ALTER TABLE `hds`.`Supplier` ADD COLUMN `createdAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
ADD COLUMN `updatedAt` datetime(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200317161751-init..20200318131106-auth
--- datamodel.dml
+++ datamodel.dml
@@ -1,26 +1,28 @@
 datasource mysql {
   provider = "mysql"
-  url = "***"
+  url      = env("MYSQL_URL")
 }
 generator client {
   provider = "prisma-client-js"
 }
 enum Role {
-  USER ADMIN
+  MODERATOR ADMIN
 }
 model Supplier {
-  id      Int    @id @default(autoincrement())
-  name    String
-  address String
-  city    String
-  state   String
-  zip     Int
-  phone   String
-  email   String @unique
+  id        Int      @id @default(autoincrement())
+  name      String
+  address   String
+  city      String
+  state     String
+  zip       Int
+  phone     String
+  email     String   @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
 model Product {
   id              Int      @id @default(autoincrement())
@@ -41,9 +43,10 @@
   supplierId        Supplier
   quantityPurchased Int
   costEach          Int
   extendedCost      Int
-  dueDate           DateTime  @default(now())
+  dueDate           DateTime
+  orderDate         DateTime  @default(now())
 }
 model Location {
   id      Int    @id @default(autoincrement())
@@ -54,18 +57,23 @@
   phone   String
 }
 model Employee {
-  id         Int      @id @default(autoincrement())
-  locationId Location
-  role       Role     @default(USER)
-  name       String
-  address    String
-  city       String
-  state      String
-  zip        Int
-  phone      String
-  email      String   @unique
+  id            Int      @id @default(autoincrement())
+  locationId    Location
+  role          Role     @default(value: MODERATOR)
+  firstName     String
+  lastName      String
+  address       String
+  city          String
+  state         String
+  zip           Int
+  phone         String
+  email         String   @unique
+  password      String
+  jwtUserSecret String
+  createdAt     DateTime @default(now())
+  updatedAt     DateTime @updatedAt
 }
 model Inventory {
   id           Int        @id @default(autoincrement())
@@ -75,18 +83,20 @@
   bin          String
   serialNumber Int
 }
-
+// todo will customer need authentication?
 model Customer {
-  id      Int    @id @default(autoincrement())
-  name    String
-  address String
-  city    String
-  state   String
-  zip     Int
-  phone   String
-  email   String @unique
+  id        Int      @id @default(autoincrement())
+  name      String
+  address   String
+  city      String
+  state     String
+  zip       Int
+  phone     String
+  email     String   @unique
+  createdAt DateTime @default(now())
+  updatedAt DateTime @updatedAt
 }
 model Job {
   id             Int       @id @default(autoincrement())
```

