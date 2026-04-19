CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`status` enum('pending','approved','rejected','cancelled') NOT NULL DEFAULT 'pending',
	`paymentId` varchar(255),
	`preferenceId` varchar(255),
	`downloadToken` varchar(128),
	`amount` decimal(10,2) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_downloadToken_unique` UNIQUE(`downloadToken`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`title` varchar(255) NOT NULL,
	`shortDescription` text,
	`price` decimal(10,2) NOT NULL,
	`originalPrice` decimal(10,2),
	`features` json DEFAULT ('[]'),
	`badge` varchar(100),
	`isHighlight` boolean DEFAULT false,
	`isFeatured` boolean DEFAULT false,
	`fileUrl` text,
	`sortOrder` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`),
	CONSTRAINT `products_slug_unique` UNIQUE(`slug`)
);
