-- Script SQL para crear la tabla de logros/achievements

-- Tabla de achievements (logros)
CREATE TABLE IF NOT EXISTS `achievement` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `achievement_type` ENUM(
    'FIRST_COMMENT',
    'FIRST_RATING',
    'BOOKS_READ_5',
    'BOOKS_READ_10',
    'BOOKS_READ_25',
    'ACTIVE_COMMENTER_10',
    'ACTIVE_COMMENTER_50',
    'BOOK_CRITIC'
  ) NOT NULL,
  `name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(50) NULL,
  `unlocked_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `uk_user_achievement` UNIQUE (`user_id`, `achievement_type`),
  CONSTRAINT `fk_achievement_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Índice para consultas por usuario
CREATE INDEX `idx_achievement_user` ON `achievement` (`user_id`);

-- Índice para consultas por tipo de logro
CREATE INDEX `idx_achievement_type` ON `achievement` (`achievement_type`);
