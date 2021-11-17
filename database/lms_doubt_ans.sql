-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: lms
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `doubt_ans`
--

DROP TABLE IF EXISTS `doubt_ans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doubt_ans` (
  `doubt_ansId` bigint NOT NULL AUTO_INCREMENT,
  `doubtId` bigint NOT NULL,
  `doubt_ans` text NOT NULL,
  `replierId` bigint NOT NULL,
  PRIMARY KEY (`doubt_ansId`),
  KEY `fk_doubtAns_doubtId_idx` (`doubtId`),
  KEY `fk_doubtAns_replierId_idx` (`replierId`),
  CONSTRAINT `fk_doubtAns_doubtId` FOREIGN KEY (`doubtId`) REFERENCES `doubt` (`doubtId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_doubtAns_replierId` FOREIGN KEY (`replierId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doubt_ans`
--

LOCK TABLES `doubt_ans` WRITE;
/*!40000 ALTER TABLE `doubt_ans` DISABLE KEYS */;
INSERT INTO `doubt_ans` VALUES (1,1,'In a database management system, a transaction is a single unit of logic or work, sometimes made up of multiple operations. Any logical calculation done in a consistent mode in a database is known as a transaction.Database practitioners often refer to these properties of database transactions using the acronym ACID.',8),(2,1,'Transactions are a set of operations used to perform a logical set of work. A transaction usually means that the data in the database has changed. The transaction is any one execution of the user program in a DBMS. Executing the same program multiple times will generate multiple transactions.',8),(3,3,'You are right, Bori. Extension that can be found in chrome store is without hover bar. So, you just need to go to github page of a project pesticide here https://github.com/mrmrs/pesticide\n\nThen download all code as zip file (I don\'t know if it possible to download only \"pesticide_for_chrome\" directory)\n\n',1),(4,4,'Your \"contact-me.html\" file and \"hobbies.html\" file look to be saved under your \"Web Development Folder\" instead of being in your project folder of \"HTML - Personal site\". You may have created files on wrong folder by right clicking top folder instead of project working in folder as per above saved detail.\n\nI would move the files to correct folder so it is the same as her project, than do confusing edit to href. To make it the same as course as you want.',1),(7,2,'You should read documentation',1);
/*!40000 ALTER TABLE `doubt_ans` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-17 16:54:49
