<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Blog de Críticas de Libros - API

## Ejecutar en Desarrollo

### Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd proyecto-nest
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Levantar el proyecto**
```bash
npm start
```

4. **Reconstruir la base de datos con la semilla**
```bash
GET http://localhost:3000/seed
```

## ENDPOINTS DISPONIBLES

### Base URL: `http://localhost:3000`

### Books (Libros)

#### GET `/books`
- **Descripción:** Obtiene todos los libros disponibles
- **Método:** GET
- **URL:** `http://localhost:3000/books`
- **Respuesta:** Array de objetos Book
- **Ejemplo de respuesta:**
```json
[
  {
    "id": 1,
    "title": "Cien Años de Soledad",
    "author": "Gabriel García Márquez",
    "genre": "Realismo Mágico",
    "description": "Una novela emblemática de la literatura latinoamericana."
  }
]
```

#### GET `/books/:id`
- **Descripción:** Obtiene un libro específico por su ID
- **Método:** GET
- **URL:** `http://localhost:3000/books/1`
- **Parámetros:** 
  - `id` (number): ID del libro
- **Respuesta:** Objeto Book
- **Ejemplo de respuesta:**
```json
{
  "id": 1,
  "title": "Cien Años de Soledad",
  "author": "Gabriel García Márquez",
  "genre": "Realismo Mágico",
  "description": "Una novela emblemática de la literatura latinoamericana."
}
```

#### POST `/books`
- **Descripción:** Crea un nuevo libro
- **Método:** POST
- **URL:** `http://localhost:3000/books`
- **Headers:** `Content-Type: application/json`
- **Body (JSON):**
```json
{
  "title": "Nombre del libro",
  "author": "Autor del libro",
  "genre": "Género literario",
  "description": "Descripción opcional del libro"
}
```
- **Respuesta:** Objeto Book creado
- **Ejemplo de respuesta:**
```json
{
  "id": 16,
  "title": "Nombre del libro",
  "author": "Autor del libro",
  "genre": "Género literario",
  "description": "Descripción opcional del libro"
}
```

#### DELETE `/books/:id`
- **Descripción:** Elimina un libro específico por su ID
- **Método:** DELETE
- **URL:** `http://localhost:3000/books/1`
- **Parámetros:** 
  - `id` (number): ID del libro a eliminar
- **Respuesta:** Sin contenido (status 200)

### Seed

#### GET `/seed`
- **Descripción:** Reconstruye la base de datos con datos de prueba (15 libros predefinidos)
- **Método:** GET
- **URL:** `http://localhost:3000/seed`
- **Respuesta:** Mensaje de confirmación
- **Ejemplo de respuesta:**
```json
{
  "message": "Seed executed successfully",
  "booksCreated": 15
}
```

## Stack Tecnológico

- **Backend:** NestJS
- **Lenguaje:** TypeScript
- **Frontend:** Angular
- **Base de datos:** MySQL

## Estructura del Proyecto

```
src/
├── books/
│   ├── dto/
│   │   └── create-book.dto.ts
│   ├── entities/
│   │   └── book.entity.ts
│   ├── books.controller.ts
│   ├── books.service.ts
│   └── books.module.ts
├── seed/
│   ├── data/
│   │   └── book.seed.ts
│   ├── seed.controller.ts
│   ├── seed.service.ts
│   └── seed.module.ts
├── app.module.ts
└── main.ts
``