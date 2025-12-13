-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2025 a las 01:47:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `libroteca`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `author`
--

CREATE TABLE `author` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `author`
--

INSERT INTO `author` (`id`, `name`) VALUES
(1, 'Gabriel García Márquez'),
(2, 'Isabel Allende'),
(3, 'J.K. Rowling'),
(4, 'George Orwell');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `synopsis` text DEFAULT NULL,
  `cover_image_url` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `book`
--

INSERT INTO `book` (`id`, `title`, `synopsis`, `cover_image_url`, `author`, `genre`, `description`) VALUES
(1, 'Cien años de soledad', 'La historia de la familia Buendía en el pueblo ficticio de Macondo.', 'https://images.example.com/cien_anos.png', NULL, NULL, NULL),
(2, 'La casa de los espíritus', 'Una saga familiar que sigue la vida de la familia Trueba.', 'https://images.example.com/la_casa.png', NULL, NULL, NULL),
(3, 'Harry Potter y la piedra filosofal', 'Un joven mago descubre su herencia mágica al asistir a una escuela de hechicería.', 'https://images.example.com/hp1.png', NULL, NULL, NULL),
(4, '1984', 'Una novela distópica sobre un futuro totalitario donde el \"Gran Hermano\" todo lo ve.', 'https://images.example.com/1984.png', NULL, NULL, NULL),
(5, 'El amor en los tiempos del cólera', 'La historia de amor de Florentino Ariza y Fermina Daza.', 'https://images.example.com/el_amor.png', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `book_author`
--

CREATE TABLE `book_author` (
  `book_id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `book_author`
--

INSERT INTO `book_author` (`book_id`, `author_id`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `book_genre`
--

CREATE TABLE `book_genre` (
  `book_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `book_genre`
--

INSERT INTO `book_genre` (`book_id`, `genre_id`) VALUES
(1, 1),
(2, 1),
(2, 3),
(3, 2),
(4, 4),
(4, 5),
(5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `parent_comment_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comment`
--

INSERT INTO `comment` (`id`, `content`, `created_at`, `user_id`, `book_id`, `parent_comment_id`) VALUES
(1, 'Reemplazo completo', '2025-10-26 22:40:51', 1, 1, NULL),
(3, 'Un libro que te cambia la perspectiva. Aterrador y brillante.', '2025-10-26 22:40:51', 3, 4, NULL),
(4, 'Totalmente de acuerdo, Ana. La prosa de GGM es inigualable.', '2025-10-26 22:40:51', 2, 1, 1),
(5, 'A mi hijo también le fascinó, Benito. Gran inicio de saga.', '2025-10-26 22:40:51', 1, 3, NULL),
(6, 'Maravilloso libro, lo recomiendo.', '2025-10-26 22:48:49', 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genre`
--

CREATE TABLE `genre` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `genre`
--

INSERT INTO `genre` (`id`, `name`) VALUES
(4, 'Ciencia Ficción'),
(5, 'Distopía'),
(2, 'Fantasía'),
(3, 'Novela Histórica'),
(1, 'Realismo Mágico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rating`
--

CREATE TABLE `rating` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL CHECK (`score` >= 1 and `score` <= 5),
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rating`
--

INSERT INTO `rating` (`id`, `score`, `user_id`, `book_id`) VALUES
(1, 5, 1, 1),
(2, 4, 1, 3),
(3, 4, 2, 1),
(4, 5, 2, 2),
(5, 5, 3, 4),
(6, 5, 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `profile_picture`, `role`) VALUES
(1, 'ana_lectora', 'ana@email.com', 'hash_simulado_bcrypt_ana', NULL, 'USER'),
(2, 'benito_books', 'benito@email.com', 'hash_simulado_bcrypt_benito', NULL, 'USER'),
(3, 'carla_admin', 'carla@email.com', 'hash_simulado_bcrypt_carla', NULL, 'ADMIN'),
(4, 'maria456', 'maria@example.com', 'password456', 'https://example.com/avatar/maria.jpg', 'USER'),
(5, 'testuser', 'test@example.com', '$2b$10$u4Sepaj83wiAxRtOlvyPVO.EIZUr2PEfHHUUnC8irE.KZPb8HAbZK', NULL, 'USER');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userbooklist`
--

CREATE TABLE `userbooklist` (
  `id` int(11) NOT NULL,
  `status` enum('LEIDO','DESEO_LEER','LEYENDO') NOT NULL,
  `user_id` int(11) NOT NULL,
  `book_id` int(11) NOT NULL,
  `added_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `userbooklist`
--

INSERT INTO `userbooklist` (`id`, `status`, `user_id`, `book_id`, `added_date`) VALUES
(1, 'LEIDO', 1, 1, CURRENT_TIMESTAMP),
(2, 'DESEO_LEER', 1, 2, CURRENT_TIMESTAMP),
(3, 'LEYENDO', 1, 4, CURRENT_TIMESTAMP),
(4, 'LEIDO', 2, 1, CURRENT_TIMESTAMP),
(5, 'LEYENDO', 2, 2, CURRENT_TIMESTAMP),
(6, 'LEIDO', 3, 4, CURRENT_TIMESTAMP);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `author`
--
ALTER TABLE `author`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `book_author`
--
ALTER TABLE `book_author`
  ADD PRIMARY KEY (`book_id`,`author_id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indices de la tabla `book_genre`
--
ALTER TABLE `book_genre`
  ADD PRIMARY KEY (`book_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indices de la tabla `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`),
  ADD KEY `parent_comment_id` (`parent_comment_id`);

--
-- Indices de la tabla `genre`
--
ALTER TABLE `genre`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_book_rating` (`user_id`,`book_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `userbooklist`
--
ALTER TABLE `userbooklist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_user_book_list` (`user_id`,`book_id`),
  ADD KEY `book_id` (`book_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `author`
--
ALTER TABLE `author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `genre`
--
ALTER TABLE `genre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `rating`
--
ALTER TABLE `rating`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `userbooklist`
--
ALTER TABLE `userbooklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `book_author`
--
ALTER TABLE `book_author`
  ADD CONSTRAINT `book_author_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `book_author_ibfk_2` FOREIGN KEY (`author_id`) REFERENCES `author` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `book_genre`
--
ALTER TABLE `book_genre`
  ADD CONSTRAINT `book_genre_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `book_genre_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`parent_comment_id`) REFERENCES `comment` (`id`) ON DELETE SET NULL;

--
-- Filtros para la tabla `rating`
--
ALTER TABLE `rating`
  ADD CONSTRAINT `rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rating_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `userbooklist`
--
ALTER TABLE `userbooklist`
  ADD CONSTRAINT `userbooklist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `userbooklist_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
