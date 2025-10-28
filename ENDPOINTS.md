# Documentación de Endpoints - Libroteca API

Base URL: `http://localhost:3000`

---

## Seed (Datos de Prueba)

### Poblar base de datos
```
GET /seed
```

## Autenticación

**Para usar un endpoint protegido:**
1. Registrarse o iniciar sesión
2. Copiar el `access_token` de la respuesta
3. En Postman: Authorization → Type: Bearer Token → Pegar token

---

### Registrar usuario
```
POST /auth/register
```
**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456",
  "profile_picture": "url", // Opcional
  "role": "USER" // Opcional: USER o ADMIN
}
```

### Iniciar sesión
```
POST /auth/login
```
**Body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Obtener perfil (requiere token)
```
GET /auth/profile
Authorization: Bearer {token}
```

---

## Libros (Books)

### Obtener todos los libros
```
GET /books
```

### Obtener un libro por ID
```
GET /books/:id
```
**Ejemplo:** `GET /books/1`

### Crear un libro
```
POST /books
```
**Body:**
```json
{
  "title": "El Quijote",
  "author": "Cervantes",
  "genre": "Novela",
  "description": "Descripción del libro" // Opcional
}
```

### Eliminar un libro
```
DELETE /books/:id
```
**Ejemplo:** `DELETE /books/1`

---

## Calificaciones (Ratings)

### Calificar un libro (requiere token)
```
POST /ratings/:book_id/rating
Authorization: Bearer {token}
```
**Body:**
```json
{
  "score": 5
}
```
**Nota:** Score debe ser entre 1 y 5

### Obtener promedio de calificaciones
```
GET /ratings/:book_id/rating
```
**Ejemplo:** `GET /ratings/1/rating`

---

## Comentarios (Comments)

### Obtener todos los comentarios
```
GET /comments
```

### Obtener comentarios de un libro
```
GET /comments?book_id=1
```

### Obtener un comentario por ID
```
GET /comments/:id
```
**Ejemplo:** `GET /comments/1`

### Crear un comentario
```
POST /comments
```
**Body:**
```json
{
  "content": "Excelente libro!",
  "user_id": 1,
  "book_id": 1,
  "parent_comment_id": 5 // Opcional (para respuestas)
}
```

### Actualizar comentario (reemplazo completo)
```
PUT /comments/:id
```
**Body:**
```json
{
  "content": "Nuevo contenido",
  "user_id": 1,
  "book_id": 1
}
```

### Actualizar comentario (parcial)
```
PATCH /comments/:id
```
**Body:**
```json
{
  "content": "Contenido actualizado"
}
```

### Eliminar comentario
```
DELETE /comments/:id
```

---

## Listas de Lectura (Lists)

### Obtener todas las listas
```
GET /lists
```

### Obtener listas de un usuario
```
GET /lists/:userId
```
**Ejemplo:** `GET /lists/1`

### Agregar libro a lista
```
POST /lists
```
**Body:**
```json
{
  "userId": 1,
  "bookId": 2,
  "status": "DESEO_LEER"
}
```
**Status:** `LEIDO` o `DESEO_LEER`

### Actualizar estado de un libro en lista
```
PATCH /lists/:userId/:bookId
```
**Ejemplo:** `PATCH /lists/1/2`

**Body:**
```json
{
  "status": "LEIDO"
}
```

### Eliminar libro de lista
```
DELETE /lists/:userId/:bookId
```
**Ejemplo:** `DELETE /lists/1/2`

---

## Usuarios (Users)

### Obtener todos los usuarios
```
GET /users
```

### Buscar usuario por username
```
GET /users?username=johndoe
```

### Buscar usuario por email
```
GET /users?email=john@example.com
```

### Obtener un usuario por ID
```
GET /users/:id
```
**Ejemplo:** `GET /users/1`

### Crear usuario
```
POST /users
```
**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456",
  "profile_picture": "url", // Opcional
  "role": "USER" // Opcional: USER o ADMIN
}
```

### Actualizar usuario (reemplazo completo)
```
PUT /users/:id
```
**Body:**
```json
{
  "username": "newusername",
  "email": "newemail@example.com",
  "password": "newpassword"
}
```

### Actualizar usuario (parcial)
```
PATCH /users/:id
```
**Body:**
```json
{
  "username": "updated_username"
}
```

### Eliminar usuario
```
DELETE /users/:id
```

---
