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
-- Table structure for table `announce`
--

DROP TABLE IF EXISTS `announce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announce` (
  `courseId` bigint NOT NULL,
  `announcementId` bigint NOT NULL AUTO_INCREMENT,
  `announcement` text,
  `my_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`announcementId`),
  KEY `fk_announce_idx` (`courseId`),
  CONSTRAINT `fk_announce` FOREIGN KEY (`courseId`) REFERENCES `courses` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announce`
--

LOCK TABLES `announce` WRITE;
/*!40000 ALTER TABLE `announce` DISABLE KEYS */;
INSERT INTO `announce` VALUES (1,1,'Reminder for the Quiz tomorrow at 10 AM. ','2021-10-26 18:54:59'),(1,2,'Okay , for you guys I will not take exam and all will get 10cgpa','2021-10-26 18:54:59'),(1,3,'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda tempore error eum aspernatur at, ad vero. Accusamus reprehenderit blanditiis eius, corporis mollitia, possimus recusandae nobis labore impedit voluptatem, veniam temporibus?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda tempore error eum aspernatur at, ad vero. Accusamus reprehenderit blanditiis eius, corporis mollitia, possimus recusandae nobis labore impedit voluptatem, veniam temporibus?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda tempore error eum aspernatur at, ad vero. Accusamus reprehenderit blanditiis eius, corporis mollitia, possimus recusandae nobis labore impedit voluptatem, veniam temporibus?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda tempore error eum aspernatur at, ad vero. Accusamus reprehenderit blanditiis eius, corporis mollitia, possimus recusandae nobis labore impedit voluptatem, veniam temporibus?','2021-10-26 18:54:59'),(1,4,'hi its new announcement','2021-10-26 18:54:59'),(8,14,'Be prepared for exams','2021-11-17 11:17:24');
/*!40000 ALTER TABLE `announce` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-17 16:54:48
