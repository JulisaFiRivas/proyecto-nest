# Guía de Testing - Postman

## Configuración Inicial

### 1. Configurar Variables de Entorno

En Postman, crear un nuevo Environment con estas variables:

- `baseUrl`: `http://localhost:3000`
- `userToken`: (vacío inicialmente)
- `adminToken`: (vacío inicialmente)

### 2. Credenciales de Prueba

```
USER (Ana)
Email: ana@email.com
Password: password123

USER (Benito)
Email: benito@email.com
Password: password123

ADMIN (Carla)
Email: carla@email.com
Password: admin123
```

---

## Endpoints Disponibles

### 1. AUTENTICACIÓN

#### 1.1 Login como USER

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

Tests (Auto-guardar token):
pm.test("Login exitoso", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("userToken", jsonData.access_token);
});
```

#### 1.2 Login como ADMIN

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

Tests (Auto-guardar token):
pm.test("Login ADMIN exitoso", function () {
    pm.response.to.have.status(200);
    var jsonData = pm.response.json();
    pm.environment.set("adminToken", jsonData.access_token);
});
```

#### 1.3 Ver Perfil (Autenticado)

```
Method: GET
URL: {{baseUrl}}/auth/profile
Headers:
  Authorization: Bearer {{userToken}}
```

#### 1.4 Ruta Privada ADMIN

```
Method: GET
URL: {{baseUrl}}/auth/private1
Headers:
  Authorization: Bearer {{adminToken}}

Nota: Con userToken debe dar 403 Forbidden
```

---

### 2. LIBROS

#### 2.1 Listar Libros (Público)

```
Method: GET
URL: {{baseUrl}}/books
```

#### 2.2 Ver Libro por ID (Público)

```
Method: GET
URL: {{baseUrl}}/books/1
```

#### 2.3 Crear Libro (Solo ADMIN)

```
Method: POST
URL: {{baseUrl}}/books
Headers:
  Authorization: Bearer {{adminToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "title": "Nuevo Libro",
  "synopsis": "Una historia fascinante",
  "author": "Autor Test",
  "genre": "Ficción"
}

Nota: Con userToken debe dar 403
```

#### 2.4 Actualizar Libro (Solo ADMIN)

```
Method: PATCH
URL: {{baseUrl}}/books/1
Headers:
  Authorization: Bearer {{adminToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "title": "Título Actualizado"
}
```

#### 2.5 Eliminar Libro (Solo ADMIN)

```
Method: DELETE
URL: {{baseUrl}}/books/6
Headers:
  Authorization: Bearer {{adminToken}}
```

---

### 3. COMENTARIOS

#### 3.1 Listar Comentarios (Público)

```
Method: GET
URL: {{baseUrl}}/comments

Filtrar por libro:
URL: {{baseUrl}}/comments?book_id=1
```

#### 3.2 Ver Comentario (Público)

```
Method: GET
URL: {{baseUrl}}/comments/1
```

#### 3.3 Crear Comentario (Autenticado)

```
Method: POST
URL: {{baseUrl}}/comments
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "content": "Excelente libro!",
  "book_id": 1
}
```

#### 3.4 Actualizar Comentario (Propio)

```
Method: PATCH
URL: {{baseUrl}}/comments/6
Headers:
  Authorization: Bearer {{userToken}}
  Content-Type: application/json

Body (raw JSON):
{
  "content": "Comentario actualizado"
}

Nota: Solo puede actualizar sus propios comentarios
```

#### 3.5 Eliminar Comentario (Propio)

```
Method: DELETE
URL: {{baseUrl}}/comments/6
Headers:
  Authorization: Bearer {{userToken}}

Nota: Solo puede eliminar sus propios comentarios
```

---

### 4. VALORACIONES

#### 4.1 Ver Rating de Libro (Público)

```
Method: GET
URL: {{baseUrl}}/ratings/1/rating
```

#### 4.2 Crear/Actualizar Rating (Autenticado)

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

Nota: Score debe ser entre 1 y 5
```

---

### 5. LISTAS

#### 5.1 Ver Todas las Listas (Público)

```
Method: GET
URL: {{baseUrl}}/lists
```

#### 5.2 Crear Entrada en Lista (Autenticado)

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

Status válidos: "reading", "completed", "want_to_read"
```

#### 5.3 Ver Lista de Usuario (Autenticado)

```
Method: GET
URL: {{baseUrl}}/lists/1
Headers:
  Authorization: Bearer {{userToken}}

Nota: Solo puede ver su propia lista
```

#### 5.4 Actualizar Estado (Autenticado)

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

Params: /lists/{userId}/{bookId}
```

#### 5.5 Eliminar de Lista (Autenticado)

```
Method: DELETE
URL: {{baseUrl}}/lists/1/2
Headers:
  Authorization: Bearer {{userToken}}

Params: /lists/{userId}/{bookId}
```

---

### 6. USUARIOS

#### 6.1 Listar Usuarios (Solo ADMIN)

```
Method: GET
URL: {{baseUrl}}/users
Headers:
  Authorization: Bearer {{adminToken}}

Filtrar por username:
URL: {{baseUrl}}/users?username=ana_lectora

Filtrar por email:
URL: {{baseUrl}}/users?email=ana@email.com

Nota: Con userToken debe dar 403
```

#### 6.2 Ver Usuario (Autenticado)

```
Method: GET
URL: {{baseUrl}}/users/1
Headers:
  Authorization: Bearer {{userToken}}
```

#### 6.3 Eliminar Usuario (Autenticado)

```
Method: DELETE
URL: {{baseUrl}}/users/1
Headers:
  Authorization: Bearer {{userToken}}
```

---

### 7. SEED

#### 7.1 Poblar Base de Datos

```
Method: GET
URL: {{baseUrl}}/seed

Nota: Limpia y recrea todos los datos de prueba
```

---

## Scripts de Auto-Guardado de Tokens

Agregar en la pestaña "Tests" de los requests de login:

**Para Login USER:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Save user token", function () {
    var jsonData = pm.response.json();
    pm.environment.set("userToken", jsonData.access_token);
});
```

**Para Login ADMIN:**
```javascript
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Save admin token", function () {
    var jsonData = pm.response.json();
    pm.environment.set("adminToken", jsonData.access_token);
});
```

---

## Tabla de Permisos

| Endpoint | Método | Acceso |
|----------|--------|--------|
| `/auth/register` | POST | Público |
| `/auth/login` | POST | Público |
| `/auth/profile` | GET | Autenticado |
| `/auth/private1` | GET | Solo ADMIN |
| `/books` | GET | Público |
| `/books/:id` | GET | Público |
| `/books` | POST | Solo ADMIN |
| `/books/:id` | PATCH | Solo ADMIN |
| `/books/:id` | DELETE | Solo ADMIN |
| `/comments` | GET | Público |
| `/comments/:id` | GET | Público |
| `/comments` | POST | Autenticado |
| `/comments/:id` | PATCH | Autenticado (propio) |
| `/comments/:id` | DELETE | Autenticado (propio) |
| `/ratings/:book_id/rating` | GET | Público |
| `/ratings/:book_id/rating` | POST | Autenticado |
| `/lists` | GET | Público |
| `/lists` | POST | Autenticado |
| `/lists/:userId` | GET | Autenticado (propio) |
| `/lists/:userId/:bookId` | PATCH | Autenticado (propio) |
| `/lists/:userId/:bookId` | DELETE | Autenticado (propio) |
| `/users` | GET | Solo ADMIN |
| `/users/:id` | GET | Autenticado |
| `/users/:id` | DELETE | Autenticado (propio) |
| `/seed` | GET | Público |

---

## Errores Comunes

| Código | Causa | Solución |
|--------|-------|----------|
| 401 | Token no enviado o inválido | Hacer login y usar token válido |
| 403 | Sin permisos de rol | Usar token con rol correcto |
| 400 | Datos inválidos | Verificar estructura del JSON |
| 404 | Recurso no existe | Verificar ID correcto |

