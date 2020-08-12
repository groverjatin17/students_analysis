-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2020 at 04:46 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `students`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `citizenship` text,
  `count` bigint(21) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`citizenship`, `count`) VALUES
('Afghanistan', 7),
('Albania', 2),
('Algeria', 7),
('Antigua and Barbuda', 150),
('Argentina', 2),
('Aruba', 1),
('Australia', 13),
('Austria', 4),
('Azerbaijan', 1),
('Bahamas', 421),
('Bahrain', 2),
('Bangladesh', 393),
('Barbados', 44),
('Belarus', 3),
('Belgium', 6),
('Belize', 5),
('Benin', 1),
('Bermuda', 130),
('Bhutan', 3),
('Bolivia', 4),
('Bosnia and Herzegovina', 2),
('Botswana', 5),
('Brazil', 68),
('Brunei Darussalam', 1),
('Bulgaria', 2),
('Burkina Faso', 6),
('Burundi', 4),
('Cambodia', 2),
('Cameroon', 7),
('Canada', 20289),
('Cayman Islands', 3),
('Chile', 4),
('Colombia', 37),
('Costa Rica', 3),
('Croatia', 2),
('Cuba', 6),
('Czech Republic', 5),
('Democratic Republic of Congo', 8),
('Denmark', 4),
('Dominica', 2),
('Dominican Republic', 8),
('Ecuador', 13),
('Egypt', 138),
('El Salvador', 3),
('England', 26),
('Estonia', 1),
('Ethiopia', 10),
('Finland', 23),
('France', 66),
('Gambia', 14),
('Georgia', 2),
('Germany', 435),
('Ghana', 91),
('Greece', 2),
('Grenada', 1),
('Guatemala', 2),
('Guinea', 3),
('Guyana', 2),
('Honduras', 4),
('Hong Kong', 9),
('Hungary', 2),
('Iceland', 5),
('India', 627),
('Indonesia', 9),
('Iran', 82),
('Iraq', 31),
('Israel', 12),
('Italy', 9),
('Ivory Coast', 8),
('Jamaica', 77),
('Japan', 503),
('Jordan', 87),
('Kazakhstan', 6),
('Kenya', 59),
('Kosovo', 1),
('Kuwait', 74),
('Kyrgyzstan', 1),
('Lebanon', 58),
('Liberia', 1),
('Libya', 31),
('Lithuania', 3),
('Luxembourg', 1),
('Macedonia', 3),
('Madagascar', 3),
('Malawi', 1),
('Malaysia', 9),
('Mali', 18),
('Mauritania', 1),
('Mauritius', 81),
('Mexico', 88),
('Mongolia', 1),
('Morocco', 13),
('Nepal', 58),
('Netherlands', 21),
('Netherlands Antilles', 9),
('New Zealand', 3),
('Nicaragua', 1),
('Niger', 2),
('Nigeria', 201),
('Northern Ireland', 1),
('Norway', 18),
('Oman', 10),
('Pakistan', 95),
('Palestine', 21),
('Paraguay', 1),
('Peoples Republic of China', 3625),
('Peru', 4),
('Philippines', 51),
('Poland', 6),
('Portugal', 4),
('Qatar', 11),
('Republic of China (DO NOT USE)', 19),
('Republic of Congo', 1),
('Republic of Ireland', 14),
('Republic of Moldova', 2),
('Romania', 11),
('Russia', 18),
('Rwanda', 36),
('Saint Kitts and Nevis', 24),
('Saint Lucia', 91),
('Saint Vincent and Grenadines', 3),
('Saudi Arabia', 854),
('Scotland', 7),
('Senegal', 5),
('Serbia', 2),
('Serbia and Montenegro', 1),
('Sierra Leone', 3),
('Singapore', 4),
('Slovakia', 4),
('Slovenia', 1),
('Somalia', 5),
('South Africa', 9),
('South Korea', 167),
('Spain', 11),
('Sri Lanka', 25),
('Sudan', 12),
('Suriname', 3),
('Sweden', 10),
('Switzerland', 5),
('Syria', 55),
('Taiwan', 36),
('Tajikistan', 1),
('Thailand', 12),
('Togo', 1),
('Trinidad and Tobago', 12),
('Tunisia', 6),
('Turkey', 101),
('Turks and Caicos Islands', 1),
('Uganda', 70),
('Ukraine', 12),
('United Arab Emirates', 32),
('United Kingdom', 57),
('United Republic of Tanzania', 10),
('United States of America', 279),
('Uzbekistan', 3),
('Venezuela', 17),
('Vietnam', 39),
('Wales', 1),
('Yemen', 72),
('Zambia', 37),
('Zimbabwe', 90);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
