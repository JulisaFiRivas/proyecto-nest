-- 1. CREACIÓN DE LA BASE DE DATOS
-- --------------------------------------------------
-- Creamos la base de datos si no existe, usando utf8mb4 para soporte completo de caracteres (incluyendo emojis)
CREATE DATABASE IF NOT EXISTS libroteca
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

-- Seleccionamos la base de datos para usarla
USE libroteca;


-- 2. TABLAS PRINCIPALES (SIN DEPENDENCIAS)
-- --------------------------------------------------

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Guardar siempre hasheada
    profile_picture VARCHAR(255) NULL,
    role ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Autores
CREATE TABLE IF NOT EXISTS Author (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Géneros
CREATE TABLE IF NOT EXISTS Genre (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Libros
CREATE TABLE IF NOT EXISTS Book (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    synopsis TEXT NULL,
    cover_image_url VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 3. TABLAS PIVOT (RELACIONES M:N)
-- --------------------------------------------------

-- Tabla Pivot para Libros y Autores (M:N)
CREATE TABLE IF NOT EXISTS Book_Author (
    book_id INT NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Author(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla Pivot para Libros y Géneros (M:N)
CREATE TABLE IF NOT EXISTS Book_Genre (
    book_id INT NOT NULL,
    genre_id INT NOT NULL,
    PRIMARY KEY (book_id, genre_id),
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    FOREIGN KEY (genre_id) REFERENCES Genre(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- 4. TABLAS CON DEPENDENCIAS (FOREIGN KEYS)
-- --------------------------------------------------

-- Tabla de Puntuaciones (Rating)
CREATE TABLE IF NOT EXISTS Rating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    score INT NOT NULL CHECK (score >= 1 AND score <= 5),
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    
    -- Restricción: Un usuario solo puede puntuar un libro una vez
    UNIQUE KEY uk_user_book_rating (user_id, book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Listas de Lectura (Leído / Deseo Leer)
CREATE TABLE IF NOT EXISTS UserBookList (
    id INT AUTO_INCREMENT PRIMARY KEY,
    status ENUM('LEIDO', 'DESEO_LEER') NOT NULL,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    
    -- Restricción: Un libro solo puede estar en una lista por usuario
    UNIQUE KEY uk_user_book_list (user_id, book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla de Comentarios
CREATE TABLE IF NOT EXISTS Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    parent_comment_id INT NULL, -- Para respuestas (referencia a sí misma)
    
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES Book(id) ON DELETE CASCADE,
    
    -- Si se borra un comentario padre, las respuestas no se borran, solo pierden la referencia
    FOREIGN KEY (parent_comment_id) REFERENCES Comment(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;