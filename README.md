<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Libroteca - API de Críticas de Libros

API REST para administrar libros, comentarios, valoraciones y listas de lectura con autenticación JWT y control de roles.

## Inicio Rápido con Docker

```bash
# 1. Clonar el repositorio
git clone https://github.com/JulisaFiRivas/proyecto-nest.git
cd proyecto-nest

# 2. Levantar la aplicación con Docker
docker-compose up --build

# 3. Acceder a la aplicación
# http://localhost:3000
```

La aplicación levantará automáticamente:
- **MySQL** en puerto 3306 (con la base de datos `libroteca.sql` precargada)
- **NestJS API** en puerto 3000

### Cargar Datos de Prueba

```bash
GET http://localhost:3000/seed
```

Esto creará:
- 3 usuarios (2 USER, 1 ADMIN)
- 5 libros
- 5 valoraciones
- 5 comentarios
- 6 listas de lectura

---

## Desarrollo Local (Sin Docker)

### Prerrequisitos
- Node.js 18 o superior
- MySQL 8.0
- npm o yarn

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL locales

# 3. Crear base de datos
mysql -u root -p
CREATE DATABASE libroteca;
exit;

# 4. Importar schema
mysql -u root -p libroteca < libroteca.sql

# 5. Ejecutar en modo desarrollo
npm run start:dev

# La aplicación estará disponible en http://localhost:3000
```

---

## Autenticación y Roles

### Credenciales de Prueba

| Email | Password | Rol |
|-------|----------|-----|
| `carla@email.com` | `admin123` | ADMIN |
| `ana@email.com` | `password123` | USER |
| `benito@email.com` | `password123` | USER |

### Obtener Token de Acceso

```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "carla@email.com",
  "password": "admin123"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Usar Token en Peticiones Protegidas

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Endpoints Principales

### Públicos (Sin autenticación)
- `GET /books` - Listar todos los libros
- `GET /books/:id` - Obtener un libro por ID
- `GET /seed` - Cargar datos de prueba

### Autenticación
- `POST /auth/register` - Registrar nuevo usuario
- `POST /auth/login` - Iniciar sesión

### Solo ADMIN
- `POST /books` - Crear nuevo libro
- `PATCH /books/:id` - Actualizar libro
- `DELETE /books/:id` - Eliminar libro
- `GET /users` - Listar todos los usuarios

### Usuarios Autenticados
- `POST /ratings/:book_id/rating` - Valorar un libro
- `POST /comments` - Comentar en un libro
- `GET /lists` - Ver mis listas
- `POST /lists` - Crear lista de lectura
- `GET /users/:id` - Ver perfil (propio)
- `PATCH /users/:id` - Actualizar perfil (propio)

**Documentación completa:** Ver `GUIA-TESTING-ENDPOINTS.md` y `ENDPOINTS.md`

---

## Guía de Uso por Funcionalidad

### 1. Registro e Inicio de Sesión

**Registrar nuevo usuario:**
```bash
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "username": "nuevo_usuario",
  "email": "nuevo@email.com",
  "password": "mipassword123"
}
```

**Iniciar sesión:**
```bash
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "nuevo@email.com",
  "password": "mipassword123"
}
```

Guarda el `access_token` recibido para usarlo en endpoints protegidos.

---

### 2. Listar y Buscar Libros (Público)

**Ver todos los libros:**
```bash
GET http://localhost:3000/books
```

**Ver un libro específico:**
```bash
GET http://localhost:3000/books/1
```

---

### 3. Valorar Libros (Requiere autenticación)

**Crear/actualizar valoración:**
```bash
POST http://localhost:3000/books/1/rating
Content-Type: application/json
Authorization: Bearer {tu_access_token}

{
  "score": 5
}
```

El score debe estar entre 1 y 5.

---

### 4. Comentar en Libros (Requiere autenticación)

**Crear comentario:**
```bash
POST http://localhost:3000/comments
Content-Type: application/json
Authorization: Bearer {tu_access_token}

{
  "bookId": 1,
  "content": "Excelente libro, muy recomendado"
}
```

**Responder a un comentario:**
```bash
POST http://localhost:3000/comments
Content-Type: application/json
Authorization: Bearer {tu_access_token}

{
  "bookId": 1,
  "content": "Totalmente de acuerdo",
  "parentCommentId": 3
}
```

---

### 5. Listas de Lectura (Requiere autenticación)

**Ver mis listas:**
```bash
GET http://localhost:3000/lists
Authorization: Bearer {tu_access_token}
```

**Agregar libro a lista:**
```bash
POST http://localhost:3000/lists
Content-Type: application/json
Authorization: Bearer {tu_access_token}

{
  "bookId": 2,
  "status": "LEYENDO"
}
```

Estados disponibles: `LEIDO`, `LEYENDO`, `DESEO_LEER`

**Actualizar estado:**
```bash
PATCH http://localhost:3000/lists/1
Content-Type: application/json
Authorization: Bearer {tu_access_token}

{
  "status": "LEIDO"
}
```

---

### 6. Gestión de Libros (Solo ADMIN)

**Crear libro:**
```bash
POST http://localhost:3000/books
Content-Type: application/json
Authorization: Bearer {token_de_admin}

{
  "title": "Don Quijote de la Mancha",
  "synopsis": "Las aventuras de un caballero andante",
  "coverImageUrl": "https://ejemplo.com/imagen.jpg"
}
```

**Actualizar libro:**
```bash
PATCH http://localhost:3000/books/1
Content-Type: application/json
Authorization: Bearer {token_de_admin}

{
  "title": "Título actualizado"
}
```

**Eliminar libro:**
```bash
DELETE http://localhost:3000/books/1
Authorization: Bearer {token_de_admin}
```

---

### 7. Ver Logros de Usuario (Requiere autenticación)

**Obtener logros del usuario autenticado:**
```bash
GET http://localhost:3000/achievements
Authorization: Bearer {tu_access_token}
```

Los logros se desbloquean automáticamente al cumplir condiciones (5 valoraciones, 10 comentarios, etc.)

---

## Stack Tecnológico

- **Backend:** NestJS 10
- **Lenguaje:** TypeScript
- **Base de datos:** MySQL 8.0
- **ORM:** TypeORM
- **Autenticación:** JWT (Passport)
- **Validación:** class-validator
- **Contenedores:** Docker & Docker Compose

---

## Estructura del Proyecto

```
src/
├── auth/          # Autenticación JWT y decoradores de roles
├── books/         # CRUD de libros (protegido por roles)
├── comments/      # Comentarios en libros
├── ratings/       # Valoraciones de libros
├── lists/         # Listas de lectura personalizadas
├── users/         # Gestión de usuarios
├── seed/          # Datos de prueba
└── config/        # Validación de variables de entorno
```

---

## Testing

Guía completa de testing en `GUIA-TESTING-ENDPOINTS.md` que incluye:
- 22 ejemplos de peticiones en Postman
- Scripts PowerShell para testing automatizado
- Flujos completos de autenticación
- Casos de prueba para cada rol

---

## Variables de Entorno

Copia el archivo `.env.example` a `.env` y ajusta los valores:

```bash
cp .env.example .env
```

### Variables Requeridas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `NODE_ENV` | Entorno de ejecución | `development` o `production` |
| `PORT` | Puerto de la aplicación | `3000` |
| `DB_HOST` | Host de MySQL | `localhost` o `mysql` (Docker) |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_USER` | Usuario de base de datos | `root` |
| `DB_PASS` | Contraseña de base de datos | `tu_password` |
| `DB_NAME` | Nombre de la base de datos | `libroteca` |
| `JWT_SECRET` | Secreto para firmar tokens JWT (mínimo 32 caracteres) | `mi_secreto_super_seguro_cambiar_en_produccion` |
| `CORS_ORIGIN` | Dominio permitido para CORS | `*` (desarrollo) o dominio específico (producción) |

### Ejemplo de archivo .env

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=mi_password_mysql
DB_NAME=libroteca

JWT_SECRET=mi_secreto_jwt_super_seguro_cambiar_en_produccion_2024
CORS_ORIGIN=*
```

⚠️ **Importante:** 
- Nunca subas el archivo `.env` al repositorio
- Cambia `JWT_SECRET` en producción
- En producción, especifica el dominio exacto en `CORS_ORIGIN`

---