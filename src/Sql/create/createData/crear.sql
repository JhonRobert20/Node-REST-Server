-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema node_api
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema node_api
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `node_api` DEFAULT CHARACTER SET utf8 ;
USE `node_api` ;

-- -----------------------------------------------------
-- Table `node_api`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node_api`.`users` (
  `id` INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL DEFAULT 'ANONYMOUS',
  `times` INT(5) UNSIGNED NULL DEFAULT 0,
  `percent` DECIMAL(4,3) UNSIGNED NULL DEFAULT 0,
  `wins` INT(5) NULL DEFAULT 0,
  `date` TIMESTAMP NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `node_api`.`throws`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `node_api`.`throws` (
  `id` INT(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `result` INT(2) UNSIGNED NOT NULL,
  `id_user` INT(3) UNSIGNED NOT NULL,
  `win` CHAR(1) NULL,
  PRIMARY KEY (`id`, `id_user`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_throws_users_idx` (`id_user` ASC) VISIBLE,
  CONSTRAINT `fk_throws_users`
    FOREIGN KEY (`id_user`)
    REFERENCES `node_api`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;







SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
