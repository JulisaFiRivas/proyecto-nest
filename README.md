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

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Copiar .env.example a .env y ajustar valores

# 3. Importar base de datos
# Usar libroteca.sql en MySQL

# 4. Ejecutar en modo desarrollo
npm run start:dev
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

Ver `docker-compose.yml` para la configuración completa. Variables principales:

- `DB_HOST` - Host de MySQL (default: mysql)
- `DB_PORT` - Puerto de MySQL (default: 3306)
- `DB_USER` - Usuario de base de datos
- `DB_PASS` - Contraseña de base de datos
- `DB_NAME` - Nombre de la base de datos
- `JWT_SECRET` - Secreto para firmar tokens JWT
- `PORT` - Puerto de la aplicación (default: 3000)

---