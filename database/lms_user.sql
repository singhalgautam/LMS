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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `photo` varchar(5000) DEFAULT NULL,
  `contact` bigint DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user` (`role`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Student','kbc@gmail.com','$2b$10$cGS8d9LjfxrJWtDcMI.gq.JbO0XKe1LFR0KXaENSjCXrRI5FmieEm','http://localhost:3002/images/1635083917889.png',8989894444,'Kabir Bansal'),(4,'Teacher','durgeshsingh@gmail.com','$2b$10$RLN/eWTMKmm17L4XWtMs0evk3DauOQUTnK0YeARXthW6dfMr55dHC',NULL,6353857230,'Durgesh Singh'),(5,'Student','durgeshsingh@gmail.com','$2b$10$CUqAAtiHvij7jFaPKOb8I.jBByxUwk/mMN.8ohRx8RPyKVrayhwE6',NULL,6353857230,'Durgesh Singh'),(7,'Student','pkhana@gmail.com','$2b$10$cuSha9I1alSm94nvVzsj8uIqB2Q/YRL0vTW1wCkz8GQrKBtPq9puC',NULL,6353857230,'Preetie Khana'),(8,'Teacher','pkhana@gmail.com','$2b$10$QusaiFheJ9xg/kFte.11ROl0Ku7Hp2pgMyZSJfQ8T.I2tH5CWTz/u','http://localhost:3002/images/1635358209914.jpg',6353857230,'Preetie Khana'),(9,'Teacher','mkb@gmail.com','$2b$10$PsOhCPnO4ircxQcWEgGH6OMXd8clLywPmTGhspjAcgcjheGIhVCBK',NULL,6353857230,'Manish Kumar Bajpai'),(11,'Student','abhishekram@gmail.com','$2b$10$9xZGY.FIrwlIooDWCbOLKeuaRw.RkGiLzV0nzlS27F1pdERI3tsVm','http://localhost:3002/images/1637038380127.png',6353857230,'Abhishek Ramgoliyan'),(12,'Student','20bcs008@iiitdmj.ac.in',NULL,'http://localhost:3002/images/1634918468140.jpg',9353800008,'Abhinav Singh'),(14,'Student','abhinavsingh0520@gmail.com',NULL,'https://lh3.googleusercontent.com/a/AATXAJwRT6lbrrw6fSST0SbxLG0bmL-uZLy0_4IWFoiA=s96-c',6353857230,'Abhinav Singh'),(17,'Student','diksha.psingh16@gmail.com',NULL,'https://lh3.googleusercontent.com/a-/AOh14Gja89Wda896wdOONOxHyx6qti3PmYuYy7V168M51g=s96-c',6353857230,'Diksha Singh'),(18,'Student','singhabhinav020@gmail.com',NULL,'http://localhost:3002/images/1636980654470.jpg',8866112111,'Abhinav Singh'),(23,'Teacher','samir@gmail.com','$2b$10$qHwveHaBChLZ631gkSoXRuTYia/4CJQrXL4.vQfZZXAaY1RVwZ7cy',NULL,8811112222,'samir jain'),(25,'Student','prem@gmail.com','$2b$10$gXifXHotyK9.EzGM0Pg0Qui8qeihYEU9S3w7DSwXse8pW245FENoy',NULL,NULL,'prem'),(26,'Student','gautam@gmail.com','$2b$10$O4xg3PoreTC//18U0u26WeiMjjEwrGGqpbPI2DINBI6oP0lT79k8S','http://localhost:3002/images/1637145409565.jpg',58585858,'Gautam Singhal'),(27,'Student','gaurang@gmail.com','$2b$10$No8u.6WG13Js3f1knKXln.iSM8T5HeMrg7EqjnXeBt1IH.7LmZq.G',NULL,NULL,'Gaurang Jain');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
