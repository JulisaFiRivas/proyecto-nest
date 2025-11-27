# 🧪 Guía de Testing de Endpoints

## 🚀 Testing con Postman

### Configuración Inicial

1. **Importar colección** o crear requests manualmente
2. **Configurar variables de entorno:**
   - `baseUrl`: `http://localhost:3000`
   - `userToken`: "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFAZW1haWwuY29tIiwidXNlcm5hbWUiOiJhbmFfbGVjdG9yYSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY0MjA0NzMzLCJleHAiOjE3NjQyOTExMzN9.XkRC5JPu-Y9Ng49YK8mjkNQiykDZV5merdanAgtSV24"
   - `adminToken`: "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjYXJsYUBlbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxhX2FkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY0MjA0NzY2LCJleHAiOjE3NjQyOTExNjZ9.qlPLM1tP4heeDabfRPUUsVz1FCkgFBHXKzRTSiet8So"

### Paso 1: Obtener Tokens

#### Login como USER
```
POST {{baseUrl}}/auth/login
Content-Type: application/json

Body (raw JSON):
{
  "email": "ana@email.com",
  "password": "password123"
}

Response:
{
  "user": { ... },
  "access_token": "eyJhbGc..."
}

✅ Copiar el access_token y guardarlo en la variable {{userToken}}
```

#### Login como ADMIN
```
POST {{baseUrl}}/auth/login
Content-Type: application/json

Body (raw JSON):
{
  "email": "carla@email.com",
  "password": "admin123"
}

Response:
{
  "user": { ... },
  "access_token": "eyJhbGc..."
}

✅ Copiar el access_token y guardarlo en la variable {{adminToken}}
```

### Paso 2: Usar Tokens en Requests

Para endpoints protegidos, agregar en **Headers**:
```
Authorization: Bearer {{userToken}}
```
o
```
Authorization: Bearer {{adminToken}}
```

---

## 📌 Credenciales del Seed

```bash
# USER (Ana)
Email: ana@email.com
Password: password123

# USER (Benito)
Email: benito@email.com
Password: password123

# ADMIN (Carla)
Email: carla@email.com
Password: admin123
```

---

## 🔐 1. AUTENTICACIÓN (`/auth`)

### 1.1 Registrar nuevo usuario
```powershell
$body = @{
    username = "nuevo_usuario"
    email = "nuevo@email.com"
    password = "password123"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/auth/register -Method POST -Body $body -ContentType 'application/json'
```

### 1.2 Login (obtener token)
```powershell
# Login como USER
$body = @{email='ana@email.com'; password='password123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method POST -Body $body -ContentType 'application/json'
$userToken = $response.access_token
Write-Host "Token USER: $userToken"

# Login como ADMIN
$body = @{email='carla@email.com'; password='admin123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method POST -Body $body -ContentType 'application/json'
$adminToken = $response.access_token
Write-Host "Token ADMIN: $adminToken"
```

### 1.3 Ver perfil (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/auth/profile -Method GET -Headers $headers
```

### 1.4 Ruta privada solo ADMIN
```powershell
$headers = @{Authorization="Bearer $adminToken"}
Invoke-RestMethod -Uri http://localhost:3000/auth/private1 -Method GET -Headers $headers

# ❌ Probar con USER (debe dar 403)
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/auth/private1 -Method GET -Headers $headers
```

---

## 📚 2. LIBROS (`/books`)

### 2.1 Listar todos los libros (público)
```powershell
curl http://localhost:3000/books
```

### 2.2 Ver un libro por ID (público)
```powershell
curl http://localhost:3000/books/1
```

### 2.3 Crear libro (solo ADMIN)
```powershell
$headers = @{Authorization="Bearer $adminToken"}
$body = @{
    title = "Nuevo Libro de Prueba"
    synopsis = "Una historia fascinante"
    author = "Autor Test"
    genre = "Ficción"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/books -Method POST -Body $body -ContentType 'application/json' -Headers $headers

# ❌ Probar con USER (debe dar 403)
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/books -Method POST -Body $body -ContentType 'application/json' -Headers $headers
```

### 2.4 Actualizar libro (solo ADMIN)
```powershell
$headers = @{Authorization="Bearer $adminToken"}
$body = @{
    title = "Título Actualizado"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/books/1 -Method PATCH -Body $body -ContentType 'application/json' -Headers $headers
```

### 2.5 Eliminar libro (solo ADMIN)
```powershell
$headers = @{Authorization="Bearer $adminToken"}
Invoke-RestMethod -Uri http://localhost:3000/books/6 -Method DELETE -Headers $headers
```

---

## 💬 3. COMENTARIOS (`/comments`)

### 3.1 Ver todos los comentarios (público)
```powershell
curl http://localhost:3000/comments
```

### 3.2 Ver comentarios de un libro (público)
```powershell
curl http://localhost:3000/comments?book_id=1
```

### 3.3 Ver un comentario específico (público)
```powershell
curl http://localhost:3000/comments/1
```

### 3.4 Crear comentario (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
$body = @{
    content = "Este libro es increíble!"
    book_id = 1
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/comments -Method POST -Body $body -ContentType 'application/json' -Headers $headers
```

### 3.5 Actualizar comentario propio (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
$body = @{
    content = "Comentario actualizado"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/comments/1 -Method PATCH -Body $body -ContentType 'application/json' -Headers $headers
```

### 3.6 Eliminar comentario propio (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/comments/1 -Method DELETE -Headers $headers
```

---

## ⭐ 4. RATINGS (`/ratings`)

### 4.1 Ver rating promedio de un libro (público)
```powershell
curl http://localhost:3000/ratings/1/rating
```

### 4.2 Crear/Actualizar rating (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
$body = @{
    score = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/ratings/1/rating -Method POST -Body $body -ContentType 'application/json' -Headers $headers
```

---

## 📋 5. LISTAS DE USUARIO (`/lists`)

### 5.1 Ver todas las listas (público)
```powershell
curl http://localhost:3000/lists
```

### 5.2 Crear entrada en lista (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
$body = @{
    book_id = 2
    status = "reading"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/lists -Method POST -Body $body -ContentType 'application/json' -Headers $headers
```

### 5.3 Ver lista de un usuario (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/lists/1 -Method GET -Headers $headers
```

### 5.4 Actualizar estado de libro en lista (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
$body = @{
    status = "completed"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/lists/1/2 -Method PATCH -Body $body -ContentType 'application/json' -Headers $headers
```

### 5.5 Eliminar libro de lista (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/lists/1/2 -Method DELETE -Headers $headers
```

---

## 👥 6. USUARIOS (`/users`)

### 6.1 Crear usuario (público - via auth/register es mejor)
```powershell
$body = @{
    username = "test_user"
    email = "test@email.com"
    password = "password123"
    role = "USER"
} | ConvertTo-Json

Invoke-RestMethod -Uri http://localhost:3000/users -Method POST -Body $body -ContentType 'application/json'
```

### 6.2 Listar todos los usuarios (solo ADMIN)
```powershell
$headers = @{Authorization="Bearer $adminToken"}
Invoke-RestMethod -Uri http://localhost:3000/users -Method GET -Headers $headers

# ❌ Probar con USER (debe dar 403)
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/users -Method GET -Headers $headers
```

### 6.3 Ver un usuario (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/users/1 -Method GET -Headers $headers
```

### 6.4 Buscar usuario por username (solo ADMIN)
```powershell
$headers = @{Authorization="Bearer $adminToken"}
Invoke-RestMethod -Uri "http://localhost:3000/users?username=ana_lectora" -Method GET -Headers $headers
```

### 6.5 Buscar usuario por email (solo ADMIN)
```powershell
$headers = @{Authorization="Bearer $adminToken"}
Invoke-RestMethod -Uri "http://localhost:3000/users?email=ana@email.com" -Method GET -Headers $headers
```

### 6.6 Eliminar usuario (requiere autenticación)
```powershell
$headers = @{Authorization="Bearer $userToken"}
Invoke-RestMethod -Uri http://localhost:3000/users/1 -Method DELETE -Headers $headers
```

---

## 🌱 7. SEED (`/seed`)

### 7.1 Poblar base de datos (público - debería protegerse)
```powershell
curl http://localhost:3000/seed
```

---

## 🔍 Resumen de Protecciones

| Endpoint | Método | Protección | Roles Permitidos |
|----------|--------|-----------|------------------|
| **AUTH** |
| `/auth/register` | POST | ❌ Público | Todos |
| `/auth/login` | POST | ❌ Público | Todos |
| `/auth/profile` | GET | ✅ JWT | Todos autenticados |
| `/auth/private1` | GET | ✅ JWT + Role | Solo ADMIN |
| **BOOKS** |
| `/books` | GET | ❌ Público | Todos |
| `/books/:id` | GET | ❌ Público | Todos |
| `/books` | POST | ✅ JWT + Role | Solo ADMIN |
| `/books/:id` | PATCH | ✅ JWT + Role | Solo ADMIN |
| `/books/:id` | DELETE | ✅ JWT + Role | Solo ADMIN |
| **COMMENTS** |
| `/comments` | GET | ❌ Público | Todos |
| `/comments/:id` | GET | ❌ Público | Todos |
| `/comments` | POST | ✅ JWT | USER + ADMIN |
| `/comments/:id` | PATCH | ✅ JWT | USER + ADMIN (propio) |
| `/comments/:id` | PUT | ✅ JWT | USER + ADMIN (propio) |
| `/comments/:id` | DELETE | ✅ JWT | USER + ADMIN (propio) |
| **RATINGS** |
| `/ratings/:book_id/rating` | GET | ❌ Público | Todos |
| `/ratings/:book_id/rating` | POST | ✅ JWT | USER + ADMIN |
| **LISTS** |
| `/lists` | GET | ❌ Público | Todos |
| `/lists` | POST | ✅ JWT | USER + ADMIN |
| `/lists/:userId` | GET | ✅ JWT | USER + ADMIN (propio) |
| `/lists/:userId/:bookId` | PATCH | ✅ JWT | USER + ADMIN (propio) |
| `/lists/:userId/:bookId` | DELETE | ✅ JWT | USER + ADMIN (propio) |
| **USERS** |
| `/users` | POST | ❌ Público | Todos |
| `/users` | GET | ✅ JWT + Role | Solo ADMIN |
| `/users/:id` | GET | ✅ JWT | USER + ADMIN |
| `/users/:id` | DELETE | ✅ JWT | USER + ADMIN (propio) |
| **SEED** |
| `/seed` | GET | ❌ Público | Todos (⚠️ debería protegerse) |

---

## 🧪 Script de Testing Completo

```powershell
# Guardar tokens en variables globales
$body = @{email='ana@email.com'; password='password123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method POST -Body $body -ContentType 'application/json'
$global:userToken = $response.access_token

$body = @{email='carla@email.com'; password='admin123'} | ConvertTo-Json
$response = Invoke-RestMethod -Uri http://localhost:3000/auth/login -Method POST -Body $body -ContentType 'application/json'
$global:adminToken = $response.access_token

Write-Host "✅ Tokens guardados en `$global:userToken y `$global:adminToken" -ForegroundColor Green

# Usar en requests
$headers = @{Authorization="Bearer $global:userToken"}
Invoke-RestMethod -Uri http://localhost:3000/auth/profile -Method GET -Headers $headers
```

---

## 📮 Colección de Postman - Ejemplos Completos

### 🔧 Configuración de Variables en Postman

1. Click en el ícono de ⚙️ (Settings) → **Environments**
2. Crear nuevo environment: `Libroteca Local`
3. Agregar variables:
   - `baseUrl`: `http://localhost:3000`
   - `userToken`: (vacío por ahora)
   - `adminToken`: (vacío por ahora)

### 📝 Ejemplos de Requests

#### 1️⃣ AUTH - Login USER

```
Method: POST
URL: {{baseUrl}}/auth/login
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "email": "ana@email.com",
  "password": "password123"
}

Tests (Scripts para auto-guardar token):
pm.test("Login exitoso", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("userToken", jsonData.access_token);
});
```

#### 2️⃣ AUTH - Login ADMIN

```
Method: POST
URL: {{baseUrl}}/auth/login
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "email": "carla@email.com",
  "password": "admin123"
}

Tests:
pm.test("Login ADMIN exitoso", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("adminToken", jsonData.access_token);
});
```

#### 3️⃣ AUTH - Ver Perfil (Autenticado)

```
Method: GET
URL: {{baseUrl}}/auth/profile
Headers:
  Authorization: Bearer {{userToken}}

Expected Response (200):
{
  "id": 1,
  "email": "ana@email.com",
  "username": "ana_lectora",
  "role": "USER"
}
```

#### 4️⃣ AUTH - Ruta Privada ADMIN

```
Method: GET
URL: {{baseUrl}}/auth/private1
Headers:
  Authorization: Bearer {{adminToken}}

Expected Response (200):
{
  "ok": true,
  "message": "Hola Admin.",
  "user": { ... }
}

❌ Con {{userToken}} debe dar 403 Forbidden
```

#### 5️⃣ BOOKS - Listar Libros (Público)

```
Method: GET
URL: {{baseUrl}}/books
Headers: (ninguno necesario)

Expected Response (200):
[
  {
    "id": 1,
    "title": "Cien años de soledad",
    "synopsis": "...",
    ...
  },
  ...
]
```

#### 6️⃣ BOOKS - Crear Libro (Solo ADMIN)

```
Method: POST
URL: {{baseUrl}}/books
Headers:
  Authorization: Bearer {{adminToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "title": "Nuevo Libro desde Postman",
  "synopsis": "Una historia fascinante sobre...",
  "author": "Autor Test",
  "genre": "Ficción"
}

Expected Response (201):
{
  "id": 6,
  "title": "Nuevo Libro desde Postman",
  "synopsis": "Una historia fascinante sobre...",
  "author": "Autor Test",
  "genre": "Ficción",
  ...
}

❌ Sin token o con {{userToken}} debe dar 401/403
```

#### 7️⃣ BOOKS - Actualizar Libro (Solo ADMIN)

```
Method: PATCH
URL: {{baseUrl}}/books/1
Headers:
  Authorization: Bearer {{adminToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "title": "Título Actualizado desde Postman"
}
```

#### 8️⃣ BOOKS - Eliminar Libro (Solo ADMIN)

```
Method: DELETE
URL: {{baseUrl}}/books/6
Headers:
  Authorization: Bearer {{adminToken}}

Expected Response (200): void
```

#### 9️⃣ COMMENTS - Listar Comentarios (Público)

```
Method: GET
URL: {{baseUrl}}/comments

// O filtrar por libro:
URL: {{baseUrl}}/comments?book_id=1
```

#### 🔟 COMMENTS - Crear Comentario (Autenticado)

```
Method: POST
URL: {{baseUrl}}/comments
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "content": "Excelente libro, lo recomiendo mucho!",
  "book_id": 1
}

Expected Response (201):
{
  "id": 6,
  "content": "Excelente libro, lo recomiendo mucho!",
  "book_id": 1,
  "user": { ... }
}
```

#### 1️⃣1️⃣ COMMENTS - Actualizar Comentario (Propio)

```
Method: PATCH
URL: {{baseUrl}}/comments/6
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "content": "Actualicé mi opinión sobre este libro"
}

⚠️ Solo puede actualizar sus propios comentarios
```

#### 1️⃣2️⃣ COMMENTS - Eliminar Comentario (Propio)

```
Method: DELETE
URL: {{baseUrl}}/comments/6
Headers:
  Authorization: Bearer {{userToken}}

⚠️ Solo puede eliminar sus propios comentarios
```

#### 1️⃣3️⃣ RATINGS - Ver Rating de Libro (Público)

```
Method: GET
URL: {{baseUrl}}/ratings/1/rating

Expected Response (200):
{
  "book_id": 1,
  "averageRating": 4.5,
  "totalRatings": 3
}
```

#### 1️⃣4️⃣ RATINGS - Crear/Actualizar Rating (Autenticado)

```
Method: POST
URL: {{baseUrl}}/ratings/1/rating
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "score": 5
}

Expected Response (201):
{
  "id": 6,
  "score": 5,
  "book_id": 1,
  "user_id": 1
}

⚠️ Si el usuario ya calificó, actualiza el rating existente
```

#### 1️⃣5️⃣ LISTS - Ver Todas las Listas (Público)

```
Method: GET
URL: {{baseUrl}}/lists
```

#### 1️⃣6️⃣ LISTS - Crear Entrada en Lista (Autenticado)

```
Method: POST
URL: {{baseUrl}}/lists
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "book_id": 2,
  "status": "reading"
}

Valores válidos para status:
- "reading" (leyendo)
- "completed" (completado)
- "want_to_read" (quiero leer)
```

#### 1️⃣7️⃣ LISTS - Ver Lista de Usuario (Autenticado)

```
Method: GET
URL: {{baseUrl}}/lists/1
Headers:
  Authorization: Bearer {{userToken}}

⚠️ Solo puede ver su propia lista (userId debe coincidir con token)
```

#### 1️⃣8️⃣ LISTS - Actualizar Estado (Autenticado)

```
Method: PATCH
URL: {{baseUrl}}/lists/1/2
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "status": "completed"
}

Params:
- 1 = userId
- 2 = bookId
```

#### 1️⃣9️⃣ LISTS - Eliminar de Lista (Autenticado)

```
Method: DELETE
URL: {{baseUrl}}/lists/1/2
Headers:
  Authorization: Bearer {{userToken}}

Params:
- 1 = userId
- 2 = bookId
```

#### 2️⃣0️⃣ USERS - Listar Usuarios (Solo ADMIN)

```
Method: GET
URL: {{baseUrl}}/users
Headers:
  Authorization: Bearer {{adminToken}}

// Filtrar por username:
URL: {{baseUrl}}/users?username=ana_lectora

// Filtrar por email:
URL: {{baseUrl}}/users?email=ana@email.com

❌ Con {{userToken}} debe dar 403 Forbidden
```

#### 2️⃣1️⃣ USERS - Ver Usuario (Autenticado)

```
Method: GET
URL: {{baseUrl}}/users/1
Headers:
  Authorization: Bearer {{userToken}}
```

#### 2️⃣2️⃣ SEED - Poblar Base de Datos

```
Method: GET
URL: {{baseUrl}}/seed

Expected Response (200):
{
  "success": true,
  "message": "Base de datos poblada exitosamente",
  "data": {
    "users": 3,
    "books": 5,
    "ratings": 5,
    "comments": 5,
    "lists": 6
  }
}

⚠️ Esto limpia y repuebla la base de datos
```

---

## 🎯 Tips para Postman

### Auto-guardar Tokens con Scripts

En la pestaña **Tests** de los requests de login, agregar:

```javascript
// Para login USER
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Save user token", function () {
    var jsonData = pm.response.json();
    pm.environment.set("userToken", jsonData.access_token);
    console.log("User Token saved:", jsonData.access_token);
});
```

```javascript
// Para login ADMIN
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Save admin token", function () {
    var jsonData = pm.response.json();
    pm.environment.set("adminToken", jsonData.access_token);
    console.log("Admin Token saved:", jsonData.access_token);
});
```

### Validar Respuestas

```javascript
// Validar status code
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Validar estructura de respuesta
pm.test("Response has access_token", function () {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('access_token');
});

// Validar error 403 cuando no tiene permisos
pm.test("Forbidden for USER role", function () {
    pm.response.to.have.status(403);
});
```

### Organizar Colección

```
📁 Libroteca API
  📂 Auth
    - Register
    - Login USER
    - Login ADMIN
    - Profile
    - Private Route (ADMIN)
  📂 Books
    - List Books
    - Get Book
    - Create Book (ADMIN)
    - Update Book (ADMIN)
    - Delete Book (ADMIN)
  📂 Comments
    - List Comments
    - Get Comment
    - Create Comment
    - Update Comment
    - Delete Comment
  📂 Ratings
    - Get Rating
    - Create/Update Rating
  📂 Lists
    - List All
    - Create Entry
    - Get User List
    - Update Status
    - Remove from List
  📂 Users
    - List Users (ADMIN)
    - Get User
    - Delete User
  📂 Seed
    - Populate DB
```

---

## ⚠️ Errores Comunes

| Error | Código | Causa | Solución |
|-------|--------|-------|----------|
| Unauthorized | 401 | No se envió token o es inválido | Hacer login y usar token válido |
| Forbidden | 403 | Token válido pero sin permisos de rol | Usar token con rol correcto (ADMIN) |
| Bad Request | 400 | Datos inválidos en el body | Verificar estructura del JSON |
| Not Found | 404 | Recurso no existe | Verificar ID correcto |

---

## 📥 Importar Colección a Postman

Puedes crear un archivo JSON con la colección completa. En Postman:

1. Click en **Import**
2. Seleccionar el archivo JSON
3. Configurar el environment con `baseUrl`, `userToken`, `adminToken`
4. Ejecutar primero los logins para poblar los tokens
5. ¡Listo para testear!

