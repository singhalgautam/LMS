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
-- Table structure for table `doubt`
--

DROP TABLE IF EXISTS `doubt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doubt` (
  `doubtId` bigint NOT NULL AUTO_INCREMENT,
  `question` text NOT NULL,
  `title` varchar(100) NOT NULL,
  `topic` varchar(100) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '0',
  `askerId` bigint NOT NULL,
  PRIMARY KEY (`doubtId`),
  KEY `fk_doubtAns_replierId_idx` (`askerId`),
  CONSTRAINT `fk_doubt_askerId` FOREIGN KEY (`askerId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doubt`
--

LOCK TABLES `doubt` WRITE;
/*!40000 ALTER TABLE `doubt` DISABLE KEYS */;
INSERT INTO `doubt` VALUES (1,'My doubt is what actually transaction is? and how it is useful and benficial?','What is Transaction?','DBMS',0,8),(2,'I maked the folder css and also cut paste those css codes into  that and also I maked the link their in the index.html file but still it is not working..I am not getting the styles which i have made...','I did all steps right,to make an external CSS link but it is not working..','CSS',0,8),(3,'Great. Pesticide.io no longer exists, and the only Chrome extension in the web store is one without the hover bar. So practically useless.',' Pesticide no longer kills bugs','Web tool Extension',0,1),(4,'I completed this lesson, double checked the code against the instructor\'s but I\'ve run into a little issue. When I save my information I go to click the \"My Hobbies\" hyperlink but it brings up a page that says \"Your file was not found. It may have been moved or deleted.\" I made sure that the new .html page was saved under the website. Am I missing something simple?','HTML Links and Anchor Tags issue (hyper links not working)','HTML',0,1),(7,'I have just read what trigger is?\nI am confused with how to use it.\nPlease guide me and give some good resources to learn','What is triggers','Triggers',0,1),(8,'My app is on express, mongoDB. I add authorization by session. Don\'t work logout. There is the link on a page\na(href=\"/logout\") logout;\nIt\'s handler:\n\napp.get(\'/logout\',  function (req, res, next)  {\n  if (req.session) {\n    // delete session object\n    req.session.destroy(function (err) {\n      if (err) {\n        return next(err);\n      } else {\n        return res.redirect(\'/\');\n      }\n    });\n  }\n});\nWhen clicked, it displays this and redirect does not occur. If you delete everything except redirect, then redirect will work. But I need to delete the authorization session.','Logout in nodejs','express',0,12),(9,'I want to give dict_val dataframe a title that is placed in the center title. I am also trying to separate the each 3 digits with a comma on the Numbers column how would I be able to give a dataframe','Giving a data frame a title and styling columns with Pandas Python','Python',0,12);
/*!40000 ALTER TABLE `doubt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-17 16:54:47
