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
  "profile_picture": "url", 
  "role": "USER" 
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
  "description": "Descripción del libro"
}
```

### Eliminar un libro
# Documentación de Endpoints - Libroteca API

Base URL: `http://localhost:3000`

---

## Seed (Datos de Prueba)

### Poblar base de datos
```
GET /seed
```

---

## Autenticación

### Registrar usuario
```
POST /auth/register
```
Body:
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "123456",
  "profile_picture": "url",
  "role": "USER"
}
```

### Iniciar sesión
```
POST /auth/login
```
Body:
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
Respuesta:
```json
{ "access_token": "<JWT>" }
```

### Obtener perfil (requiere token)
```
GET /auth/profile
Authorization: Bearer {token}
```

### Ruta privada solo ADMIN
```
GET /auth/private1
Authorization: Bearer {token}
Roles: ADMIN
```

---

## Libros (Books)

- `GET /books` — Público
- `GET /books/:id` — Público
- `POST /books` — Requiere token + role `ADMIN`
- `PATCH /books/:id` — Requiere token + role `ADMIN`
- `DELETE /books/:id` — Requiere token + role `ADMIN`

Ejemplo (crear libro como ADMIN):
```
curl -X POST http://localhost:3000/books \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Mi Libro","author":"Autor","genre":"Ficción"}'
```

---

## Calificaciones (Ratings)

- `POST /ratings/:book_id/rating` — Requiere token (cualquier usuario)
- `GET /ratings/:book_id/rating` — Público (promedio)

Ejemplo (calificar libro):
```
curl -X POST http://localhost:3000/ratings/1/rating \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"score":5}'
```

---

## Comentarios (Comments)

- `POST /comments` — Requiere token (cualquier usuario)
- `GET /comments` — Público
- `GET /comments?book_id=1` — Público
- `GET /comments/:id` — Público
- `PUT /comments/:id` — Requiere token (propietario)
- `PATCH /comments/:id` — Requiere token (propietario)
- `DELETE /comments/:id` — Requiere token (propietario)

Ejemplo (crear comentario):
```
curl -X POST http://localhost:3000/comments \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"content":"Excelente!","book_id":1}'
```

---

## Listas de Lectura (Lists)

- `GET /lists` — Público
- `POST /lists` — Requiere token (crear lista/entrada para usuario autenticado)
- `GET /lists/:userId` — Requiere token (consulta de listas; el guard controla acceso según implementación)
- `PATCH /lists/:userId/:bookId` — Requiere token (propietario)
- `DELETE /lists/:userId/:bookId` — Requiere token (propietario)

Ejemplo (agregar a lista):
```
curl -X POST http://localhost:3000/lists \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"bookId":2,"status":"DESEO_LEER"}'
```

---

## Usuarios (Users)

- `POST /users` — Público (registro)
- `GET /users` — Requiere token + role `ADMIN` (lista completa)
- `GET /users?username=...` — Requiere token + role `ADMIN` or según implementación
- `GET /users/:id` — Requiere token
- `PUT /users/:id` — Requiere token (propietario o admin según servicio)
- `PATCH /users/:id` — Requiere token
- `DELETE /users/:id` — Requiere token

---

## Errores frecuentes (401 / 403)

- 401 Unauthorized: Cuando no se envía token o el token es inválido/expirado.
  - Ejemplo: respuesta HTTP 401
  ```json
  { "statusCode": 401, "message": "Unauthorized" }
  ```

- 403 Forbidden: Cuando el usuario autenticado no tiene el rol necesario.
  - Ejemplo (guardas de roles retornan mensaje):
  ```json
  { "statusCode": 403, "message": "User carla_admin needs a valid role: [ADMIN]", "error": "Forbidden" }
  ```

---

## Ejemplo de flujo rápido (cURL)

1) Login (obtener token)
```
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"carla@email.com","password":"admin123"}'
```

2) Usar token para acceder a ruta protegida
```
curl -H "Authorization: Bearer <JWT>" http://localhost:3000/auth/profile
```

---
