/*
 Navicat Premium Data Transfer

 Source Server         : friendforum
 Source Server Type    : MySQL
 Source Server Version : 50562
 Source Host           : localhost:3306
 Source Schema         : friendforum

 Target Server Type    : MySQL
 Target Server Version : 50562
 File Encoding         : 65001

 Date: 07/07/2019 16:05:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `adminname` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL,
  `adminid` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `announcetime` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`adminid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for collect
-- ----------------------------
DROP TABLE IF EXISTS `collect`;
CREATE TABLE `collect`  (
  `collectid` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增收藏表id',
  `userid` int(11) NULL DEFAULT NULL COMMENT '收藏者id',
  `postid` int(11) NULL DEFAULT NULL COMMENT '帖子id',
  `collecttime` datetime NULL DEFAULT NULL COMMENT '收藏时间',
  PRIMARY KEY (`collectid`) USING BTREE,
  INDEX `userid`(`userid`) USING BTREE,
  INDEX `postid`(`postid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for follow
-- ----------------------------
DROP TABLE IF EXISTS `follow`;
CREATE TABLE `follow`  (
  `followid` int(11) NOT NULL AUTO_INCREMENT COMMENT '关注表自增',
  `fansid` int(11) NOT NULL COMMENT '粉丝id',
  `followedid` int(11) NULL DEFAULT NULL COMMENT '被关注者id',
  `followtime` datetime NULL DEFAULT NULL COMMENT '关注时间',
  PRIMARY KEY (`followid`) USING BTREE,
  INDEX `fansid`(`fansid`) USING BTREE,
  INDEX `followedid`(`followedid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for guest
-- ----------------------------
DROP TABLE IF EXISTS `guest`;
CREATE TABLE `guest`  (
  `guestid` int(11) NOT NULL AUTO_INCREMENT COMMENT '回帖id\r\n',
  `postid` int(11) NULL DEFAULT NULL COMMENT '帖子id',
  `replyfloor` int(11) NULL DEFAULT NULL COMMENT '帖子楼层',
  `floorerid` int(11) NULL DEFAULT NULL COMMENT '层主id',
  `reciverid` int(11) NULL DEFAULT NULL COMMENT '被回复人的id',
  `guesterid` int(11) NULL DEFAULT NULL COMMENT '回复者id',
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '回帖内容',
  `replytime` datetime NULL DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`guestid`) USING BTREE,
  INDEX `postid`(`postid`) USING BTREE,
  INDEX `replyfloor`(`replyfloor`) USING BTREE,
  INDEX `floorerid`(`floorerid`) USING BTREE,
  INDEX `reciverid`(`reciverid`) USING BTREE,
  INDEX `guesterid`(`guesterid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 65 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for innermessage
-- ----------------------------
DROP TABLE IF EXISTS `innermessage`;
CREATE TABLE `innermessage`  (
  `innermailid` int(11) NOT NULL AUTO_INCREMENT COMMENT '站内信id自增',
  `userid` int(11) NULL DEFAULT NULL COMMENT '用户的id',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '发送的内容',
  `sendtime` datetime NULL DEFAULT NULL COMMENT '发送时间',
  `mailtitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '主题',
  `isread` int(11) NULL DEFAULT 0 COMMENT '是否读过',
  PRIMARY KEY (`innermailid`) USING BTREE,
  INDEX `userid`(`userid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `postid` int(11) NOT NULL AUTO_INCREMENT COMMENT '帖子id自增',
  `postsubject` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '帖子版块',
  `posttitle` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '帖子题目',
  `posttime` datetime NULL DEFAULT NULL COMMENT '发帖时间',
  `lastreplyid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '最后回复人id',
  `lastreplytime` datetime NULL DEFAULT NULL COMMENT '最后回复人时间',
  `postcontent` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '回复内容',
  `postauthorid` int(11) NULL DEFAULT NULL COMMENT '帖子作者id',
  `clicknum` int(11) NULL DEFAULT 1 COMMENT '点击数',
  `replynum` int(11) NULL DEFAULT 0 COMMENT '回复数',
  `poststate` int(11) NULL DEFAULT 1 COMMENT '帖子状态存在1，不存在0',
  PRIMARY KEY (`postid`) USING BTREE,
  INDEX `postauthorid`(`postauthorid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 48 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`  (
  `replyid` int(11) NOT NULL AUTO_INCREMENT COMMENT '回复id',
  `replyfloor` int(11) NULL DEFAULT NULL COMMENT '回复得楼层',
  `postid` int(11) NULL DEFAULT NULL COMMENT '帖子id',
  `content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '回复内容',
  `replytime` datetime NULL DEFAULT NULL COMMENT '回复时间',
  `floorerid` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '回复者的id',
  PRIMARY KEY (`replyid`) USING BTREE,
  INDEX `floorerid`(`floorerid`) USING BTREE,
  INDEX `replyfloor`(`replyfloor`) USING BTREE,
  INDEX `postid`(`postid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL COMMENT '密码',
  `useremail` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL COMMENT '用户邮箱',
  `gender` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '未填写' COMMENT '性别',
  `headphoto` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '头像url',
  `userid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id主键',
  `registertime` datetime NULL DEFAULT NULL COMMENT '注册时间',
  `userstate` int(11) NULL DEFAULT 1 COMMENT '用户的状态是否被删除，0是删除1是存在',
  PRIMARY KEY (`userid`) USING BTREE,
  INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 37 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

SET FOREIGN_KEY_CHECKS = 1;
