/*
 Navicat Premium Data Transfer

 Source Server         : Ives
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : medicalsystem

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 01/08/2018 09:21:08
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for advisory
-- ----------------------------
DROP TABLE IF EXISTS `advisory`;
CREATE TABLE `advisory`  (
  `ad_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ad_content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ad_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ad_title` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ad_id`) USING BTREE,
  INDEX `fk_ad_pt_id`(`pt_id`) USING BTREE,
  INDEX `fk_ad_dt_id`(`dt_id`) USING BTREE,
  CONSTRAINT `fk_ad_dt_id` FOREIGN KEY (`dt_id`) REFERENCES `doctor` (`dt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_ad_pt_id` FOREIGN KEY (`pt_id`) REFERENCES `patient` (`pt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of advisory
-- ----------------------------
INSERT INTO `advisory` VALUES ('1', '18', '8', '失眠猝醒，且食欲不振，偶尔幻听', '2018-07-23 11:20:14', '失眠幻听该怎么解决');
INSERT INTO `advisory` VALUES ('2', '13', '1', '突然就呼吸困难，胸闷，已有一周时间', '2018-07-29 09:47:43', '突发性呼吸困难');
INSERT INTO `advisory` VALUES ('3', '41', '1', '人一多就呼吸困难', '2018-07-29 09:48:27', '在人群中呼吸困难怎么解决');
INSERT INTO `advisory` VALUES ('4', '17', '1', '被异性摸头会略微呼吸困难', '2018-07-29 09:49:42', '我怕异性摸头杀我');

-- ----------------------------
-- Table structure for clinic
-- ----------------------------
DROP TABLE IF EXISTS `clinic`;
CREATE TABLE `clinic`  (
  `cl_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cl_dept` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cl_part` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cl_place` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`cl_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of clinic
-- ----------------------------
INSERT INTO `clinic` VALUES ('0101', '内科', '呼吸门诊', '1栋101室');
INSERT INTO `clinic` VALUES ('0102', '内科', '消化门诊', '1栋102室');
INSERT INTO `clinic` VALUES ('0103', '内科', '内分泌门诊', '1栋103室');
INSERT INTO `clinic` VALUES ('0104', '内科', '血液门诊', '1栋104室');
INSERT INTO `clinic` VALUES ('0105', '内科', '口腔门诊', '1栋105室');
INSERT INTO `clinic` VALUES ('0201', '外科', '胃肠门诊', '1栋201室');
INSERT INTO `clinic` VALUES ('0202', '外科', '骨外科门诊', '1栋202室');
INSERT INTO `clinic` VALUES ('0203', '外科', '神经外科门诊', '1栋203室');
INSERT INTO `clinic` VALUES ('0301', '儿科', '儿科门诊', '2栋101室');

-- ----------------------------
-- Table structure for consumptionorder
-- ----------------------------
DROP TABLE IF EXISTS `consumptionorder`;
CREATE TABLE `consumptionorder`  (
  `co_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mr_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `co_price` double(10, 2) NOT NULL DEFAULT 0.00,
  `co_status` enum('unpay','pay') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`co_id`) USING BTREE,
  INDEX `fk_co_mr_id`(`mr_id`) USING BTREE,
  CONSTRAINT `fk_co_mr_id` FOREIGN KEY (`mr_id`) REFERENCES `medicalrecord` (`mr_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of consumptionorder
-- ----------------------------
INSERT INTO `consumptionorder` VALUES ('1', '1', 13.20, 'pay');
INSERT INTO `consumptionorder` VALUES ('2', '2', 27.45, 'pay');
INSERT INTO `consumptionorder` VALUES ('3', '3', 17.00, 'pay');
INSERT INTO `consumptionorder` VALUES ('4', '4', 18.30, 'unpay');
INSERT INTO `consumptionorder` VALUES ('5', '5', 8.00, 'pay');
INSERT INTO `consumptionorder` VALUES ('6', '6', 17.80, 'unpay');
INSERT INTO `consumptionorder` VALUES ('7', '7', 37.00, 'pay');

-- ----------------------------
-- Table structure for doctor
-- ----------------------------
DROP TABLE IF EXISTS `doctor`;
CREATE TABLE `doctor`  (
  `dt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '男',
  `cl_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_image` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `dt_tel` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_title` enum('住院医师','主治医师','副主任医师','主任医师') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '住院医师',
  `dt_introduction` varchar(600) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_money` double(10, 2) NOT NULL,
  PRIMARY KEY (`dt_id`) USING BTREE,
  INDEX `fk_cl_id`(`cl_id`) USING BTREE,
  CONSTRAINT `fk_cl_id` FOREIGN KEY (`cl_id`) REFERENCES `clinic` (`cl_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_dt_id` FOREIGN KEY (`dt_id`) REFERENCES `suser` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of doctor
-- ----------------------------
INSERT INTO `doctor` VALUES ('1', '杨别', '男', '0101', '', '13602799555', '主任医师', '中医世家杨家继承人，已攻克中医与新时代神经性疾病的天堑', 30.00);
INSERT INTO `doctor` VALUES ('10', 'Alice', '女', '0101', '', '13602799556', '住院医师', '国际护理学院毕业', 15.00);
INSERT INTO `doctor` VALUES ('11', 'Simth', '男', '0101', '', '13602799554', '副主任医师', '精研望闻问切', 25.00);
INSERT INTO `doctor` VALUES ('12', '宛儿', '女', '0102', '', '13602799561', '主治医师', '精通各种药物毒理，主攻消化性解毒剂', 30.00);
INSERT INTO `doctor` VALUES ('3', '雨行云', '男', '0103', '', '13602799541', '副主任医师', '主攻各种内分泌疾病，目前攻略后天性晕车的家用训练治疗方案', 25.00);
INSERT INTO `doctor` VALUES ('4', '季与凡', '男', '0103', '', '13602799543', '副主任医师', '主攻先天性内分泌疾病', 25.00);
INSERT INTO `doctor` VALUES ('40', '初羡仙', '女', '0104', '', '13602799531', '主任医师', '负责各类血液分析与血库调用', 30.00);
INSERT INTO `doctor` VALUES ('5', '穆空星', '女', '0201', '', '13602799677', '住院医师', '专攻各类食用性中毒等疾病', 15.00);
INSERT INTO `doctor` VALUES ('50', '傅蝶雨', '女', '0202', '', '13602799431', '副主任医师', '骨科后续治理专家', 25.00);
INSERT INTO `doctor` VALUES ('6', '吴比纲', '男', '0202', '', '13602799521', '主任医师', '国内首席骨科医治专家', 50.00);
INSERT INTO `doctor` VALUES ('7', '杨离', '男', '0203', '', '13602799888', '主任医师', '原为中医世家，结合中西医术，专职癫痫治疗', 45.00);
INSERT INTO `doctor` VALUES ('8', 'Jack', '男', '0105', '', '13602799523', '主任医师', '怪异黑杰克', 50.00);
INSERT INTO `doctor` VALUES ('9', '辛夷', '女', '0301', '', '13602799111', '副主任医师', '专攻儿科疾病', 30.00);

-- ----------------------------
-- Table structure for evaluation
-- ----------------------------
DROP TABLE IF EXISTS `evaluation`;
CREATE TABLE `evaluation`  (
  `ev_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ev_content` varchar(35) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ev_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ev_status` enum('unread','read') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rf_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ev_score` double(10, 2) NOT NULL,
  PRIMARY KEY (`ev_id`) USING BTREE,
  INDEX `fk_ev_rf_id`(`rf_id`) USING BTREE,
  INDEX `fk_ev_dt_id`(`dt_id`) USING BTREE,
  INDEX `fk_ev_pt_id`(`pt_id`) USING BTREE,
  CONSTRAINT `fk_ev_dt_id` FOREIGN KEY (`dt_id`) REFERENCES `doctor` (`dt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_ev_pt_id` FOREIGN KEY (`pt_id`) REFERENCES `patient` (`pt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_ev_rf_id` FOREIGN KEY (`rf_id`) REFERENCES `registrationform` (`rf_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluation
-- ----------------------------
INSERT INTO `evaluation` VALUES ('1', '给你打82分，剩下的用666给你', '2018-07-23 11:22:15', 'read', '1', '1', '13', 4.50);
INSERT INTO `evaluation` VALUES ('10', '给你打82分，剩下的用666给你', '2018-07-29 09:42:39', 'read', '9', '7', '14', 5.00);
INSERT INTO `evaluation` VALUES ('2', 'a', '2018-07-29 09:38:34', 'unread', '10', '7', '16', 3.00);
INSERT INTO `evaluation` VALUES ('3', '给你打82分，剩下的用666给你', '2018-07-29 09:39:29', 'unread', '11', '50', '17', 4.50);
INSERT INTO `evaluation` VALUES ('4', '给你打82分，剩下的用666给你', '2018-07-29 09:40:00', 'read', '2', '1', '14', 5.00);
INSERT INTO `evaluation` VALUES ('5', '给你打82分，剩下的用666给你', '2018-07-29 09:40:23', 'unread', '3', '9', '14', 5.00);
INSERT INTO `evaluation` VALUES ('6', '给你打82分，剩下的用666给你', '2018-07-29 09:40:44', 'read', '4', '11', '14', 3.20);
INSERT INTO `evaluation` VALUES ('7', '给你打82分，剩下的用666给你', '2018-07-29 09:41:19', 'unread', '6', '5', '2', 4.80);
INSERT INTO `evaluation` VALUES ('8', '给你打82分，剩下的用666给你', '2018-07-29 09:41:56', 'read', '7', '8', '41', 4.50);
INSERT INTO `evaluation` VALUES ('9', '给你打82分，剩下的用666给你', '2018-07-29 09:42:18', 'read', '8', '4', '16', 5.00);

-- ----------------------------
-- Table structure for illness
-- ----------------------------
DROP TABLE IF EXISTS `illness`;
CREATE TABLE `illness`  (
  `ill_id` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ill_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ill_symptom` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ill_treatment` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `cl_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`ill_id`) USING BTREE,
  INDEX `fk_ill_cl_id`(`cl_id`) USING BTREE,
  CONSTRAINT `fk_ill_cl_id` FOREIGN KEY (`cl_id`) REFERENCES `clinic` (`cl_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of illness
-- ----------------------------
INSERT INTO `illness` VALUES ('1', '风寒感冒', '浑身酸痛、鼻塞流涕、咳嗽有痰', '中成药可选用感冒清热冲剂、正柴胡饮冲剂、感冒软胶囊、川芎茶调散、通宣理肺丸等等。服药后可喝些热粥或热汤，微微出汗，以助药力驱散风寒', '0101');
INSERT INTO `illness` VALUES ('10', '手足口病', '多发生于5岁以下儿童，表现口痛、厌食、低热、手、足、口腔等部位出现小疱疹或小溃疡，多数患儿一周左右自愈，少数患儿可引起心肌炎、肺水肿、无菌性脑膜脑炎等并发症。个别重症患儿病情发展快，导致死亡。', '1.一般治疗\r\n本病如无并发症，预后一般良好，多在一周内痊愈。主要为对症治疗。\r\n（1）首先隔离患儿，接触者应注意消毒隔离,避免交叉感染。\r\n（2）对症治疗,做好口腔护理。\r\n（3）衣服、被褥要清洁，衣着要舒适、柔软，经常更换。\r\n（4）剪短宝宝的指甲，必要时包裹宝宝双手，防止抓破皮疹\r\n（5）臀部有皮疹的宝宝，应随时清理其大小便，保持臀部清洁干燥。\r\n（6）可服用抗病毒药物及清热解毒中草药，补充维生素B、C等。\r\n2.合并治疗\r\n（1）密切监测病情变化,尤其是脑、肺、心等重要脏器功能；危重病人特别注意监测血压、血气分析、血糖及胸片。\r\n（2）注意维持水、电解质、酸碱平衡及对重要脏器的保护。\r\n（3）有颅内压增高者给予相应处理。\r\n（4）出现低氧血症、呼吸困难等呼吸衰竭征象者,宜及早进行机械通气治疗。\r\n（5）维持血压稳定。\r\n其他重症处理：如出现DIC、肺水肿、心力衰竭等，应给予相应处理。\r\n3.抗病毒药物\r\n因为抗病毒药一般在发病24小时到48小时前使用才是最佳的。而往往我们确诊手足口病的时候，都已经过了最有效的治疗阶段，现在也不提倡用抗病毒的药物。', '0301');
INSERT INTO `illness` VALUES ('2', '风热感冒', '发热重、微恶风、头胀痛、有汗、咽喉红肿疼痛、咳嗽、痰黏或黄、鼻塞黄涕、口渴喜饮、舌尖边红、苔薄白微黄', '可用抗病毒口服液，板蓝根，银翘解毒片，牛黄解毒片', '0101');
INSERT INTO `illness` VALUES ('3', '流行感冒', '高热39°C～40°C，伴寒战，病程3-5天，全身症状明显，如头痛，全身肌肉酸痛、乏力，可有中耳炎、肺炎、脑炎等并发症', '通常以缓解症状治疗为主，包括退热药和止疼药等，一般1周后，患者可自然恢复。还可以服用增强抵抗力的药物，如在感冒早期服用大剂量的维生素C（成人1000毫克，儿童500毫克），可以减轻感冒症状，缩短感冒病程', '0101');
INSERT INTO `illness` VALUES ('4', '发烧', '口腔温度高于37.5 ℃，腋窝温度高于37℃，或一日之间体温相差在1℃以上', '高热患者可以使用的药物有：阿司匹林，0.3～0.6g，口服，必要时每4小时1次；安痛定注射液2ml，肌肉注射；柴胡注射液2ml，肌肉注射；还可选用安乃近滴鼻液滴鼻；高热不退的，还可考虑使用糖皮质激素如地塞米松等', '0101');
INSERT INTO `illness` VALUES ('5', '急性肠胃炎', '恶心、呕吐、腹痛、腹泻、发热', '尽量卧床休息，病情轻者口服葡萄糖--电解质液以补充体液的丢失。如果持续呕吐或明显脱水，则需静脉补充5%―10%葡萄糖盐水及其他相关电解质。鼓励摄入清淡流质或半流质食晶，以防止脱水或治疗轻微的脱水', '0201');
INSERT INTO `illness` VALUES ('6', '口腔溃疡', '唇内侧、舌头、舌腹、颊黏膜、前庭沟、软腭等部位，这些部位的黏膜缺乏角质化层或角化较差。舌头溃疡指发生于舌头、舌腹部位的口腔溃疡。口腔溃疡发作时疼痛剧烈，局部灼痛明显，严重者还会影响饮食、说话，对日常生活造成极大不便；可并发口臭、慢性咽炎、便秘、头痛、头晕、恶心、乏力、烦躁、发热、淋巴结肿大等全身症状。', '1、在医生指示下，涂抹药物或用药水漱口。\r\n2、注意口腔卫生，吃完食物要随时漱洗干净。 \r\n3、避免吃太硬或纤维太粗的食物，以免刺激伤口，加重疼痛。 \r\n4、食物不要挑口味过重，如太酸咸、太辛辣的食物，以免刺激黏膜。 \r\n5、少喝酒及碳酸饮料等刺激伤口的饮料。\r\n6、太烫或太冰的食物会加重口腔溃疡的疼痛感，宜避免。 \r\n7、在医生指示下，补充维生素B2、C及叶酸的摄取。', '0105');
INSERT INTO `illness` VALUES ('7', '甲状腺肿大', '病程早期为弥漫性甲状腺肿大，查体可见肿大甲状腺表面光滑，质软，随吞咽上下活动，无震颤及血管杂音，随着病程的发展，逐渐出现甲状腺结节性肿大，一般为不对称性、多结节性多个结节可聚集在一起，表现为颈部肿块。结节大小不等、质地不等、位置不一。甲状腺肿一般无疼痛，如有结节内出血则可出现疼痛。如体检发现甲状腺结节质硬活动度欠佳，应警惕恶变可能。', '在医生指导下用药，放射性碘治疗或手术', '0103');
INSERT INTO `illness` VALUES ('8', '骨裂', '骨裂处疼痛或红肿', '建议先进行x光拍摄后按医生治疗方案对骨裂处进行相应的固定或其他方案', '0202');
INSERT INTO `illness` VALUES ('9', '癫痫', '全面强直-阵挛性发作：以突发意识丧失和全身强直和抽搐为特征，典型的发作过程可分为强直期、阵挛期和发作后期。一次发作持续时间一般小于5分钟，常伴有舌咬伤、尿失禁等，并容易造成窒息等伤害。强直-阵挛性发作可见于任何类型的癫痫和癫痫综合征中。\r\n失神发作：典型失神表现为突然发生，动作中止，凝视，叫之不应，可有眨眼，但基本不伴有或伴有轻微的运动症状，结束也突然。通常持续5-20秒，罕见超过1 分钟者。主要见于儿童失神癫痫。\r\n强直发作：表现为发作性全身或者双侧肌肉的强烈持续的收缩，肌肉僵直，使肢体和躯体固定在一定的紧张姿势，如轴性的躯体伸展背屈或者前屈。常持续数秒至数十秒，但是一般不超过1分钟。强直发作多见于有弥漫性器质性脑损害的癫痫患者，一般为病情严重的标志，主要为儿童，如Lennox-Gastaut综合征。以及其他表现', '建议及时就诊，对不同类型的癫痫了解其病因，针对性治疗', '0203');

-- ----------------------------
-- Table structure for medicalrecord
-- ----------------------------
DROP TABLE IF EXISTS `medicalrecord`;
CREATE TABLE `medicalrecord`  (
  `mr_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ill_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mr_time` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mr_taken_times` int(3) NOT NULL,
  `mr_taken_days` int(3) NOT NULL,
  `mr_score` double(4, 1) NOT NULL,
  PRIMARY KEY (`mr_id`) USING BTREE,
  INDEX `fk_mr_dt_id`(`dt_id`) USING BTREE,
  INDEX `fk_mr_pt_id`(`pt_id`) USING BTREE,
  INDEX `fk_mr_ill_id`(`ill_id`) USING BTREE,
  CONSTRAINT `fk_mr_dt_id` FOREIGN KEY (`dt_id`) REFERENCES `doctor` (`dt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_mr_ill_id` FOREIGN KEY (`ill_id`) REFERENCES `illness` (`ill_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_mr_pt_id` FOREIGN KEY (`pt_id`) REFERENCES `patient` (`pt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medicalrecord
-- ----------------------------
INSERT INTO `medicalrecord` VALUES ('1', '13', '1', '1', '2018-07-23 11:05:06', 3, 3, 88.0);
INSERT INTO `medicalrecord` VALUES ('2', '14', '1', '2', '2018-07-18 11:03:13', 3, 3, 77.0);
INSERT INTO `medicalrecord` VALUES ('3', '14', '9', '10', '2018-07-20 15:02:09', 3, 3, 70.0);
INSERT INTO `medicalrecord` VALUES ('4', '14', '11', '3', '2018-07-10 16:04:17', 3, 3, 60.0);
INSERT INTO `medicalrecord` VALUES ('5', '18', '1', '4', '2018-07-03 16:05:05', 3, 3, 65.0);
INSERT INTO `medicalrecord` VALUES ('6', '2', '5', '5', '2018-07-04 10:05:49', 3, 3, 78.0);
INSERT INTO `medicalrecord` VALUES ('7', '41', '8', '6', '2018-06-12 09:06:43', 2, 2, 90.0);
INSERT INTO `medicalrecord` VALUES ('8', '16', '4', '7', '2018-06-21 17:19:22', 3, 3, 80.0);
INSERT INTO `medicalrecord` VALUES ('9', '17', '7', '9', '2018-06-28 15:08:33', 2, 2, 91.0);

-- ----------------------------
-- Table structure for medicine
-- ----------------------------
DROP TABLE IF EXISTS `medicine`;
CREATE TABLE `medicine`  (
  `md_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `md_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `md_is_prescription` enum('Rx','OTC') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `md_price` double(10, 2) NOT NULL,
  `md_inventory` int(10) NOT NULL,
  `md_details` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`md_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of medicine
-- ----------------------------
INSERT INTO `medicine` VALUES ('1', '复方丹参滴丸', 'Rx', 23.00, 3000, '用于冠心病，心绞痛');
INSERT INTO `medicine` VALUES ('10', '银翘解毒片', 'OTC', 8.30, 500, '清热散风，解表退烧。用于流行性感冒，发冷发烧，四肢酸懒，头痛咳嗽，咽喉肿痛');
INSERT INTO `medicine` VALUES ('11', '板蓝根颗粒', 'OTC', 10.00, 500, '清热散风，解表退烧。用于流行性感冒，发冷发烧，四肢酸懒，头痛咳嗽，咽喉肿痛');
INSERT INTO `medicine` VALUES ('12', '维生素C片', 'OTC', 8.00, 1100, '补充维生素c');
INSERT INTO `medicine` VALUES ('13', '抗病毒口服液', 'OTC', 9.00, 500, '清热祛湿，凉血解毒。用于风热感冒，流感');
INSERT INTO `medicine` VALUES ('2', '万爽力 盐酸曲美他嗪片', 'Rx', 46.00, 3000, '作为附加疗法对一线抗心绞痛疗法控制不佳或无法耐受的稳定型心绞痛患者进行对症治疗');
INSERT INTO `medicine` VALUES ('3', '白敬宇 复合维生素B片', 'Rx', 6.10, 1000, '预防和治疗B族维生素缺乏导致的营养不良，厌食，糙皮病');
INSERT INTO `medicine` VALUES ('4', '汤臣倍健 叶酸亚铁片', 'OTC', 109.00, 500, '补充铁，叶酸');
INSERT INTO `medicine` VALUES ('5', '小柴胡', 'OTC', 13.20, 400, '用于风寒感冒');
INSERT INTO `medicine` VALUES ('6', '西瓜霜喷剂', 'OTC', 9.80, 500, '用于口腔溃疡');
INSERT INTO `medicine` VALUES ('7', '牛黄解毒片', 'OTC', 7.15, 500, '清热解毒。用于火热内盛，咽喉肿痛，牙龈肿痛，口舌生疮，目赤肿痛。');
INSERT INTO `medicine` VALUES ('8', '葵花小儿感冒颗粒', 'OTC', 12.00, 1000, '疏风解表，清热解毒。本品用于小儿风热感冒，症见发热﹑头胀痛﹑咳嗽痰黏﹑咽喉肿痛；流感');
INSERT INTO `medicine` VALUES ('9', '优甲乐左甲状腺素片', 'OTC', 37.00, 300, '补碘性药物');

-- ----------------------------
-- Table structure for patient
-- ----------------------------
DROP TABLE IF EXISTS `patient`;
CREATE TABLE `patient`  (
  `pt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_sex` enum('男','女') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_born` date NOT NULL,
  `pt_IDCardNumber` varchar(19) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_tel` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_image` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`pt_id`) USING BTREE,
  CONSTRAINT `fk_pt_id` FOREIGN KEY (`pt_id`) REFERENCES `suser` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of patient
-- ----------------------------
INSERT INTO `patient` VALUES ('13', '谢知非', '女', '1995-01-25', '445121199501251112', '13502508211', NULL);
INSERT INTO `patient` VALUES ('14', '金钟', '男', '1976-04-25', '445121197604251235', '13502508111', NULL);
INSERT INTO `patient` VALUES ('15', '鱼羡之', '男', '1990-05-01', '445121199005012224', '13523458236', NULL);
INSERT INTO `patient` VALUES ('16', '华国郭', '男', '1980-07-23', '445121198007234561', '17902794520', NULL);
INSERT INTO `patient` VALUES ('17', '江邢昉', '男', '1974-10-23', '445115197410237910', '17944521342', NULL);
INSERT INTO `patient` VALUES ('18', '徐弦诗', '女', '1994-05-20', '443115199405204520', '13645204520', NULL);
INSERT INTO `patient` VALUES ('19', '萧琰', '女', '1996-07-27', '445121199607274520', '13602434066', NULL);
INSERT INTO `patient` VALUES ('2', '张彬听', '男', '1996-12-25', '445121199612257774', '13945316786', NULL);
INSERT INTO `patient` VALUES ('41', '袁纪辞', '女', '2000-01-01', '445121200001010101', '13946875823', NULL);

-- ----------------------------
-- Table structure for prescription
-- ----------------------------
DROP TABLE IF EXISTS `prescription`;
CREATE TABLE `prescription`  (
  `md_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mr_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pr_num` int(10) NOT NULL,
  PRIMARY KEY (`mr_id`, `md_id`) USING BTREE,
  INDEX `fk_pr_md_id`(`md_id`) USING BTREE,
  CONSTRAINT `fk_pr_md_id` FOREIGN KEY (`md_id`) REFERENCES `medicine` (`md_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_pr_mr_id` FOREIGN KEY (`mr_id`) REFERENCES `medicalrecord` (`mr_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of prescription
-- ----------------------------
INSERT INTO `prescription` VALUES ('5', '1', 9);
INSERT INTO `prescription` VALUES ('10', '2', 9);
INSERT INTO `prescription` VALUES ('7', '2', 9);
INSERT INTO `prescription` VALUES ('8', '2', 9);
INSERT INTO `prescription` VALUES ('12', '3', 9);
INSERT INTO `prescription` VALUES ('13', '3', 9);
INSERT INTO `prescription` VALUES ('10', '4', 9);
INSERT INTO `prescription` VALUES ('11', '4', 9);
INSERT INTO `prescription` VALUES ('12', '5', 9);
INSERT INTO `prescription` VALUES ('12', '6', 9);
INSERT INTO `prescription` VALUES ('6', '6', 9);
INSERT INTO `prescription` VALUES ('9', '7', 9);

-- ----------------------------
-- Table structure for registrationform
-- ----------------------------
DROP TABLE IF EXISTS `registrationform`;
CREATE TABLE `registrationform`  (
  `rf_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pt_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rf_status` enum('completed','uncompleted') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `rf_time` timestamp(0) NOT NULL,
  PRIMARY KEY (`rf_id`) USING BTREE,
  INDEX `fk_rf_dt_id`(`dt_id`) USING BTREE,
  INDEX `fk_rf_pt_id`(`pt_id`) USING BTREE,
  CONSTRAINT `fk_rf_dt_id` FOREIGN KEY (`dt_id`) REFERENCES `doctor` (`dt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_rf_pt_id` FOREIGN KEY (`pt_id`) REFERENCES `patient` (`pt_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of registrationform
-- ----------------------------
INSERT INTO `registrationform` VALUES ('1', '1', '13', 'completed', '2018-07-10 10:53:54');
INSERT INTO `registrationform` VALUES ('10', '7', '16', 'uncompleted', '2018-06-21 17:42:15');
INSERT INTO `registrationform` VALUES ('11', '50', '17', 'uncompleted', '2018-06-28 11:42:52');
INSERT INTO `registrationform` VALUES ('2', '1', '14', 'completed', '2018-07-28 14:38:29');
INSERT INTO `registrationform` VALUES ('3', '9', '14', 'completed', '2018-07-20 14:38:59');
INSERT INTO `registrationform` VALUES ('4', '11', '14', 'completed', '2018-07-18 10:39:35');
INSERT INTO `registrationform` VALUES ('5', '1', '18', 'uncompleted', '2018-07-03 17:39:25');
INSERT INTO `registrationform` VALUES ('6', '5', '2', 'completed', '2018-07-10 15:40:01');
INSERT INTO `registrationform` VALUES ('7', '8', '41', 'completed', '2018-07-03 15:40:54');
INSERT INTO `registrationform` VALUES ('8', '4', '16', 'uncompleted', '2018-07-04 09:41:19');
INSERT INTO `registrationform` VALUES ('9', '7', '17', 'uncompleted', '2018-06-12 08:41:50');

-- ----------------------------
-- Table structure for reply
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply`  (
  `re_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `ad_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `re_content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `re_time` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`re_id`) USING BTREE,
  INDEX `fk_re_suser_id`(`user_id`) USING BTREE,
  INDEX `fk_re_ad_id`(`ad_id`) USING BTREE,
  CONSTRAINT `fk_re_ad_id` FOREIGN KEY (`ad_id`) REFERENCES `advisory` (`ad_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_re_suser_id` FOREIGN KEY (`user_id`) REFERENCES `suser` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of reply
-- ----------------------------
INSERT INTO `reply` VALUES ('1', '8', '1', '耳鸣频率如何，是否有低血糖病史，作息时间如何', '2018-07-23 11:25:50');
INSERT INTO `reply` VALUES ('10', '1', '3', '现在情况越来越严重，对于出门有点害怕', '2018-07-29 09:52:00');
INSERT INTO `reply` VALUES ('11', '17', '4', '被摸头会脸红，会心跳加速，如果不赶紧躲开，会呼吸加快', '2018-07-29 09:52:28');
INSERT INTO `reply` VALUES ('12', '1', '4', '考虑下是否对该异性有好感，如果不是，可以咨询下心理医生', '2018-07-29 11:17:12');
INSERT INTO `reply` VALUES ('2', '18', '1', '大概一周一两次，不定时间，作息规律', '2018-07-23 11:27:21');
INSERT INTO `reply` VALUES ('3', '18', '1', '工作忙时两三天通宵熬夜，靠咖啡提神', '2018-07-23 11:28:19');
INSERT INTO `reply` VALUES ('4', '8', '1', '目测推断是压力导致的失眠，建议合理调整好作息时间，如果不能的话，建议离职，身体要紧', '2018-07-23 11:30:12');
INSERT INTO `reply` VALUES ('5', '1', '2', '请问是否有哮喘病史', '2018-07-29 09:51:08');
INSERT INTO `reply` VALUES ('6', '13', '2', '没吧', '2018-07-29 09:51:19');
INSERT INTO `reply` VALUES ('7', '13', '2', '哮喘症状如何', '2018-07-29 09:51:27');
INSERT INTO `reply` VALUES ('8', '1', '2', '哮喘又名支气管哮喘。支气管哮喘是由多种细胞及细胞组分参与的慢性气道炎症，此种炎症常伴随引起气道反应性增高，导致反复发作的喘息、气促、胸闷和（或）咳嗽等症状，多在夜间和（或）凌晨发生', '2018-07-29 09:51:35');
INSERT INTO `reply` VALUES ('9', '1', '3', '如果在人少的地方不会，有可能是社交恐惧症', '2018-07-29 09:51:51');

-- ----------------------------
-- Table structure for suser
-- ----------------------------
DROP TABLE IF EXISTS `suser`;
CREATE TABLE `suser`  (
  `user_id` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_password` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_level` int(4) NOT NULL DEFAULT 2,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of suser
-- ----------------------------
INSERT INTO `suser` VALUES ('0', '123456', 0);
INSERT INTO `suser` VALUES ('1', '123456', 1);
INSERT INTO `suser` VALUES ('10', '123456', 1);
INSERT INTO `suser` VALUES ('11', '123456', 1);
INSERT INTO `suser` VALUES ('12', '123456', 1);
INSERT INTO `suser` VALUES ('13', '123456', 2);
INSERT INTO `suser` VALUES ('14', '123456', 2);
INSERT INTO `suser` VALUES ('15', '123456', 2);
INSERT INTO `suser` VALUES ('16', '123456', 2);
INSERT INTO `suser` VALUES ('17', '123456', 2);
INSERT INTO `suser` VALUES ('18', '123456', 2);
INSERT INTO `suser` VALUES ('19', '123456', 2);
INSERT INTO `suser` VALUES ('2', '123456', 2);
INSERT INTO `suser` VALUES ('20', '123456', 2);
INSERT INTO `suser` VALUES ('3', 'asdfgh', 1);
INSERT INTO `suser` VALUES ('30', '123456', 2);
INSERT INTO `suser` VALUES ('4', 'asdfgh', 1);
INSERT INTO `suser` VALUES ('40', '123456', 1);
INSERT INTO `suser` VALUES ('41', '123456', 2);
INSERT INTO `suser` VALUES ('5', 'as', 1);
INSERT INTO `suser` VALUES ('50', '123456', 1);
INSERT INTO `suser` VALUES ('6', 'as', 1);
INSERT INTO `suser` VALUES ('7', 'az', 1);
INSERT INTO `suser` VALUES ('8', 'aq', 1);
INSERT INTO `suser` VALUES ('9', '123456', 1);

SET FOREIGN_KEY_CHECKS = 1;
