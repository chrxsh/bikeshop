-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 25, 2025 at 01:36 PM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bikeshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `name`) VALUES
(1, 'Mountain Bicycle'),
(2, 'Road Bicycle'),
(3, 'Folding Bicycle');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int NOT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `product_desc` longtext,
  `product_price` int DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `selling_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_desc`, `product_price`, `image_url`, `category_id`, `selling_id`) VALUES
(1, 'Mountain Hitam Cihuy', 'A rugged mountain bike with dual suspension, perfect for trail riding.', 350, 'assets/mountain1.jpg', 1, 1),
(2, 'Mountain Ahoy', 'A durable mountain bike built for rough trails and off-road adventures.', 240, 'assets/mountain2.jpg', 1, 1),
(3, 'Yaha Mountain', 'A lightweight aluminum frame, 21-speed gear system, front suspension fork, and all-terrain tires—perfect for conquering both trails and rocky paths.', 124, 'assets/mountain3.jpg', 1, 1),
(4, 'Meong Mountain', 'Designed for adventure, this mountain bike features a durable alloy frame, wide knobby tires for superior grip, and a smooth-shifting 24-speed drivetrain—built to handle steep climbs and rough trails with ease.', 987, 'assets/mountain4.jpg', 1, 2),
(5, 'FUYOH Mountain', 'Tackle any terrain with this rugged mountain bike, equipped with front suspension, powerful disc brakes, and a lightweight frame for maximum control and comfort on off-road rides.', 882, 'assets/mountain5.jpg', 1, 2),
(6, 'Mount Mountain', 'This mountain bike features a durable alloy frame, 21-speed drivetrain, and grippy all-terrain tires—perfect for climbs, descents, and everything in between.', 112, 'assets/mountain6.jpg', 1, 3),
(7, 'Mountain Sheesh', 'Conquer rugged trails with confidence—this mountain bike is equipped with a lightweight aluminum frame, front suspension fork, and precision disc brakes for ultimate control in any terrain.', 648, 'assets/mountain7.jpg', 1, 3),
(8, 'Kiwkiw Bicycle', 'Built for speed and endurance, this road bike features a sleek aerodynamic frame, lightweight components, and smooth-shifting gears—perfect for long rides and high performance on pavement.', 154, 'assets/road1.jpg', 2, 1),
(9, 'PRo max 243 Bicycle', 'Engineered with a lightweight aluminum frame and carbon fork, this road bike features a 2x11 Shimano 105 drivetrain, integrated shifters, and high-pressure 700x25c tires for optimal speed, efficiency, and responsive handling on asphalt.', 753, 'assets/road2.jpg', 2, 1),
(10, 'Bicycle Clean Tring 2', 'This road bike includes a full carbon frame, electronic Shimano Ultegra Di2 shifting, hydraulic disc brakes, and aerodynamic 700x28c tubeless tires to deliver precise control, quick acceleration, and superior braking in all conditions.', 733, 'assets/road3.jpg', 2, 2),
(11, 'Classic Bicycle x0', 'Engineered with a lightweight aluminum frame and carbon fork, this road bike features a 22-speed Shimano 105 drivetrain, hydraulic disc brakes, and aero-profile wheels for optimal speed, handling, and endurance on long-distance rides.', 902, 'assets/road4.jpg', 2, 2),
(12, 'Shimano Bicycle', 'This road bike boasts a full carbon fiber frame, integrated cable routing, a Shimano Ultegra groupset, and tubeless-ready clincher wheels—designed to deliver maximum stiffness and efficient power transfer for competitive racing.', 355, 'assets/road5.jpg', 2, 3),
(13, 'Aexy Bicycle', 'Equipped with an aerodynamic aluminum frame, lightweight carbon fork, SRAM Apex 1 drivetrain, and hydraulic disc brakes, this road bike ensures precise handling and reliable stopping power on varied terrain.', 756, 'assets/road6.jpg', 2, 3),
(14, 'Aslat Bicycle', 'This road bike features a full carbon frame, integrated cable routing, Shimano Ultegra 11-speed groupset, and tubeless-ready wheels for enhanced speed, stiffness, and control on every ride.', 236, 'assets/road7.jpg', 2, 3),
(15, 'Dla 7403 Combo', 'Compact steel frame with a dual-lock folding system, 6-speed Shimano gears, and puncture-resistant 16-inch tires for smooth urban rides and easy storage.', 345, 'assets/fold1.jpg', 3, 1),
(16, 'OISP N21 Relaxing Take', 'Lightweight aluminum construction, quick-release folding hinges, 7-speed drivetrain, and ergonomic grips designed for efficient commuting and portability.', 846, 'assets/fold2.jpg', 3, 1),
(17, 'Grandeur 30x', 'Durable chromoly frame, magnetic latch folding mechanism, single-speed setup, and 20-inch wheels optimized for stability and fast folding.', 982, 'assets/fold3.jpg', 3, 2),
(18, 'Cuteir Paoiea2', 'High-tensile steel frame, compact fold in under 10 seconds, 8-speed Shimano shifting, and cushioned saddle for comfortable city cruising.', 736, 'assets/fold4.jpg', 3, 2),
(19, 'Ajs Aeroex Bike', 'Aerospace-grade aluminum frame, patented fold-lock system, 5-speed internal hub, and puncture-resistant tires built for quick folds and hassle-free rides.', 375, 'assets/fold5.jpg', 3, 2),
(20, 'Mihae Bicycle', 'Robust steel frame with reinforced joints, 6-speed derailleur, compact folding pedals, and lightweight wheels perfect for multi-modal commuting.', 938, 'assets/fold6.jpg', 3, 3),
(21, 'Ohjeka Bicycle', 'Light alloy frame with dual-fold design, smooth 3-speed internal hub, and adjustable handlebar stem for customizable fit and easy transport.', 351, 'assets/fold7.jpg', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `selling_type`
--

CREATE TABLE `selling_type` (
  `selling_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `selling_type`
--

INSERT INTO `selling_type` (`selling_id`, `name`) VALUES
(1, 'Promo'),
(2, 'New Product'),
(3, 'Best Seller');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `selling_id` (`selling_id`);

--
-- Indexes for table `selling_type`
--
ALTER TABLE `selling_type`
  ADD PRIMARY KEY (`selling_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `selling_type`
--
ALTER TABLE `selling_type`
  MODIFY `selling_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`selling_id`) REFERENCES `selling_type` (`selling_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
