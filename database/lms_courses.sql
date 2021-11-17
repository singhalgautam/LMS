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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseId` bigint NOT NULL AUTO_INCREMENT,
  `courseName` varchar(100) NOT NULL,
  `credits` int DEFAULT NULL,
  `bio` text NOT NULL,
  `teacherId` bigint NOT NULL,
  `prerequisite` text NOT NULL,
  PRIMARY KEY (`courseId`),
  UNIQUE KEY `courseName_UNIQUE` (`courseName`),
  KEY `id_idx` (`teacherId`),
  CONSTRAINT `id` FOREIGN KEY (`teacherId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'DBMS',4,'Learn Fundamental Concepts of Database Management from scratch',8,'None'),(2,'Machine Learning',4,'Demystify Machine Learning and build foundational Data Science skills like regression & forecasting, without any code!',8,'Linear Algebra, Probability and Statistics, Calculus, Python'),(3,'Computer Organization and Architecture',4,'Learn the internals of computer, such as how actually computer runs and build',9,'Digital Logic and Design, Switching Theory'),(4,'Compiler',3,'Deep Dive in Lexical Analysis, Syntax Analysis (Top Down Parsers and Bottom Up Parsers).',9,'COA, OS'),(5,'C',3,'Learn your first programming language and its memory management',4,'None'),(6,'Graph Theory',3,'Master the Nuts and Bolts of Graph Theory: the Heart of Communication and Transportation Networks, Internet, GPS, ...',4,'Data Structure and Algorithm'),(8,'data science',2,'data science for beginners',23,'maths'),(9,'mongodb',3,'Master MongoDB Development for Web & Mobile Apps. CRUD Operations, Indexes, Aggregation Framework - All about MongoDB!',23,'DBMS'),(12,'Digital Logic',3,'Digital, or boolean, logic is the fundamental concept underpinning all modern computer systems.',9,'none'),(13,'Discrete Mathematics',4,'Discrete mathematics is the study of mathematical structures that are fundamentally discrete rather than continuous',23,'+2 maths');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
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
