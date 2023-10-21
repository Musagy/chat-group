CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `username` VARCHAR(100) NOT NULL UNIQUE,
    `user_alias` VARCHAR(100),
    `password` VARCHAR(100) NOT NULL,
    `role` VARCHAR(10) DEFAULT 'USER',
    PRIMARY KEY (`id`)
);