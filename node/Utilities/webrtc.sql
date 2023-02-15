/*
SQLyog Professional v13.1.1 (64 bit)
MySQL - 5.7.28-0ubuntu0.18.04.4 : Database - webrtc
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `tbl_personal_chat` */

DROP TABLE IF EXISTS `tbl_personal_chat`;

CREATE TABLE `tbl_personal_chat` (
  `chat_id` int(11) NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `files` varchar(255) DEFAULT NULL,
  `type` varchar(35) DEFAULT NULL,
  `read_status` enum('Y','N') NOT NULL DEFAULT 'N',
  `deleted` enum('Y','N') DEFAULT 'N',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`chat_id`),
  KEY `from_user_Id` (`from_user_id`),
  KEY `to_user_Id` (`to_user_id`),
  CONSTRAINT `tbl_personal_chat_ibfk_1` FOREIGN KEY (`from_user_id`) REFERENCES `tbl_user` (`user_id`),
  CONSTRAINT `tbl_personal_chat_ibfk_2` FOREIGN KEY (`to_user_id`) REFERENCES `tbl_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=823 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_personal_chat` */

LOCK TABLES `tbl_personal_chat` WRITE;

insert  into `tbl_personal_chat`(`chat_id`,`from_user_id`,`to_user_id`,`message`,`files`,`type`,`read_status`,`deleted`,`created_date`) values 
(819,2,3,'dd',NULL,NULL,'N','N','2020-01-17 09:37:11'),
(820,3,2,'dd',NULL,NULL,'N','N','2020-01-17 09:37:15'),
(821,3,2,'dd',NULL,NULL,'N','N','2020-01-17 09:39:11'),
(822,2,3,'dd',NULL,NULL,'N','N','2020-01-17 09:39:13');

UNLOCK TABLES;

/*Table structure for table `tbl_user` */

DROP TABLE IF EXISTS `tbl_user`;

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `user_type` enum('admin','user') DEFAULT 'user',
  `email_id` varchar(50) DEFAULT NULL,
  `mobile_no` varchar(20) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gcm_id` varchar(255) DEFAULT NULL,
  `device_type` enum('A','I') DEFAULT NULL,
  `deleted` enum('Y','N') DEFAULT 'N' COMMENT 'Y->deleted Record,N->active Record',
  `socket_id` varchar(40) NOT NULL,
  `online_status` varchar(35) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `deleted` (`deleted`),
  KEY `created_by` (`created_by`),
  FULLTEXT KEY `first_name` (`first_name`),
  FULLTEXT KEY `last_name` (`last_name`),
  FULLTEXT KEY `email_id` (`email_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_user` */

LOCK TABLES `tbl_user` WRITE;

insert  into `tbl_user`(`user_id`,`first_name`,`last_name`,`user_type`,`email_id`,`mobile_no`,`password`,`gcm_id`,`device_type`,`deleted`,`socket_id`,`online_status`,`created_by`,`created_date`,`updated_by`,`updated_date`) values 
(1,'Raj','Pal','admin','admin@gmail.com','+91-9667472268','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','','offline',NULL,'2019-09-29 14:33:47',1,'2019-10-25 11:12:58'),
(2,'Akirti','Techugo','user','test.techugo@gmail.com','+91-8630943809','e10adc3949ba59abbe56e057f20f883e','','','N','Cjldt4CMbVOEduB9AAAF','online',NULL,'2019-10-03 11:34:46',1,'2019-10-25 11:12:58'),
(3,'QA','Tester','user','deep@techugo.com','+91-8383838383','e10adc3949ba59abbe56e057f20f883e','','','N','oViN6TMFWs5C6CGZAAAE','online',NULL,'2019-10-04 17:15:54',3,'2019-11-18 16:25:44'),
(4,'Abdur','Rehman','user','abrehmangaur@live.com','+91-9898989898','d41d8cd98f00b204e9800998ecf8427e',NULL,NULL,'N','','offline',NULL,'2019-10-08 12:24:39',4,'2019-11-18 15:18:33'),
(5,'Vivek','Indra','user','vivek@techugo.com','+91-9334383027','e10adc3949ba59abbe56e057f20f883e','eplnn-QgE4E:APA91bF2sXK9SDxspiiMhE3MDdLlHV_94GCsi0N4bU0rv9pg9vOIS7oU59rYtc6hBYbVxdPp7a1xiUYyUqy7kju6lMeS0TPMfHwRUwPr3q9pjBoXTAg95T9eWDlOrX1pwO-5e9adQ4eB','I','N','','offline',NULL,'2019-10-09 11:50:37',5,'2019-11-09 18:12:42'),
(6,'Raj','Pal','user','rajpalpy@gmail.com','+91-1231231231','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','','offline',NULL,'2019-10-12 16:11:10',6,'2019-11-18 15:42:41'),
(7,'Test1','Test2','user','test1@gmail.com','+91-1212121212','e10adc3949ba59abbe56e057f20f883e','dJi-Fzmc0vw:APA91bGhfQhei2hbcOrc4v_N7nw_UCiIO2_XTgbQ3MIlvoVHLEiaL6E_oCNMiViFZMQw9rmZwlaLxF2yJdJXD4CAOPUI8Bixh_98UnI3Ngoxq-JIWvn_8fILQdyEh9LMsn7s8Nu2sjXD','A','N','','offline',NULL,'2019-10-25 09:15:53',7,'2019-11-14 18:04:29'),
(8,NULL,NULL,'user',NULL,'+91-8810537309','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','','offline',NULL,'2019-10-25 10:07:10',NULL,NULL),
(9,'Brandon','Pickett','user','brandonpickett@msn.com ','+1-6138780070','d0d2b883ffe11676af7e678cf45a36fa','dgeDGhHIT-s:APA91bHUwK3fEuWlOz4yMQQxF2PSQH4NBEQLTTVDCXnXuOz7kBAlqhqd7e9_g6b0P5sQa1ICiAhj5_-35OBztSC9VRRaXx8qBc0WugytcikPvHMwnnxF98AF8SOxrhFl69zTpDXtDae5','A','N','','offline',NULL,'2019-11-01 07:44:54',9,'2019-11-01 13:59:28'),
(10,NULL,NULL,'user',NULL,'+1-6134102955','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 08:01:35',NULL,NULL),
(11,NULL,NULL,'user',NULL,'+1-123456789','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 11:23:49',NULL,NULL),
(12,NULL,NULL,'user',NULL,'+91-9582089810','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 11:59:18',NULL,NULL),
(13,'Lucky','Tester','user','test.techugo@gmail.com','+91-837584866823','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 12:04:43',13,'2019-11-01 17:40:30'),
(14,'Harry','Harjot','user','harjot.jot37@gmail.com','+91-83758486683','e10adc3949ba59abbe56e057f20f883e','','','N','','offline',NULL,'2019-11-01 12:31:41',14,'2019-11-01 18:04:05'),
(15,NULL,NULL,'user',NULL,'+91-8375848668','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','','offline',NULL,'2019-11-01 16:09:26',NULL,NULL),
(16,NULL,NULL,'user',NULL,'+1-7669212151','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','','offline',NULL,'2019-11-01 16:44:16',NULL,NULL),
(17,NULL,NULL,'user',NULL,'+1-8787878787','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 16:46:09',NULL,NULL),
(18,NULL,NULL,'user',NULL,'+1-7669212141','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 16:54:22',NULL,NULL),
(19,NULL,NULL,'user',NULL,'+1-787787877887','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 16:59:26',NULL,NULL),
(20,NULL,NULL,'user',NULL,'+1-7878787878','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:02:56',NULL,NULL),
(21,NULL,NULL,'user',NULL,'+1-78787878787','e10adc3949ba59abbe56e057f20f883e','','','N','','offline',NULL,'2019-11-01 17:05:41',NULL,NULL),
(22,NULL,NULL,'user',NULL,'+1-89898989898','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:06:57',NULL,NULL),
(23,NULL,NULL,'user',NULL,'+1-12345678','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:08:40',NULL,NULL),
(24,NULL,NULL,'user',NULL,'+1-55555556555','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:09:11',NULL,NULL),
(25,NULL,NULL,'user',NULL,'+919998989898','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:12:17',NULL,NULL),
(26,NULL,NULL,'user',NULL,'+1-9898989898','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','','offline',NULL,'2019-11-01 17:13:14',NULL,NULL),
(27,NULL,NULL,'user',NULL,'+1-78789789789','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:18:55',NULL,NULL),
(28,NULL,NULL,'user',NULL,'+1-7676767676','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:20:08',NULL,NULL),
(29,NULL,NULL,'user',NULL,'+1-78778787878','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:22:10',NULL,NULL),
(30,NULL,NULL,'user',NULL,'+1-6363636363','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-01 17:23:10',NULL,NULL),
(31,'Shah','Altamash','user','shahaltamash93@gmail.com','+91-9582588029','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'Y','',NULL,NULL,'2019-11-02 10:57:10',31,'2019-11-07 15:04:56'),
(32,NULL,NULL,'user',NULL,'+1-45678909876543','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-04 09:00:30',NULL,NULL),
(33,NULL,NULL,'user',NULL,'+1-9765434567','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-04 09:10:49',NULL,NULL),
(34,NULL,NULL,'user',NULL,'+1-97654345678','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-04 09:11:09',NULL,NULL),
(35,NULL,NULL,'user',NULL,'+91-7428612346','e10adc3949ba59abbe56e057f20f883e',NULL,NULL,'N','',NULL,NULL,'2019-11-05 09:28:56',NULL,NULL),
(36,NULL,NULL,'user',NULL,'+91-7669212151','e10adc3949ba59abbe56e057f20f883e','c7qsYoO0_JI:APA91bEm9i17-yJfADzOcGliWdZefk2v_YOhq_4U_TyhMGzIugkzNK-Geypv9gNtWzmQK4GGUo_mjjGxDv6xSnj4n6VAppmHX1J1ZWJmBKP2ZAIWPOz4b5NmZCNFS4jvot9BVEi0k9xe','A','N','',NULL,NULL,'2019-11-05 16:43:35',NULL,NULL),
(37,NULL,NULL,'user',NULL,'+91-9711340700',NULL,NULL,NULL,'N','',NULL,NULL,'2019-11-07 16:37:53',NULL,NULL);

UNLOCK TABLES;

/*Table structure for table `tbl_user_image` */

DROP TABLE IF EXISTS `tbl_user_image`;

CREATE TABLE `tbl_user_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `images` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `verify_pic` enum('Y','N','S') DEFAULT 'N',
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `deleted` enum('Y','N') DEFAULT 'N',
  PRIMARY KEY (`id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `tbl_user_image_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `tbl_user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=247 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_user_image` */

LOCK TABLES `tbl_user_image` WRITE;

UNLOCK TABLES;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
