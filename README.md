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

3. **clonar la base de datos con el archivo libroteca.sql**
 (este proyecto usa xampp con phpmyadmin)

4. **Levantar el proyecto**
```bash
npm start
```

5. **Reconstruir la base de datos con la semilla**
```bash
GET http://localhost:3000/seed
```


## Stack Tecnológico

- **Backend:** NestJS
- **Lenguaje:** TypeScript
- **Frontend:** Angular
- **Base de datos:** MySQL

## Estructura del Proyecto

```
src/
├── auth/
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   ├── strategies/
│   │   └── jwt.strategy.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── books/
│   ├── dto/
│   │   └── create-book.dto.ts
**Libroteca - API (NestJS)**

Resumen corto: API para administrar libros, comentarios, listas y calificaciones.

**Requisitos previos:**
- `Node >= 18` y `npm` o `pnpm`/`yarn`
- `Docker` y `docker-compose` (si usas contenedores)
- MySQL (si no usas Docker)

**Instalación rápida (desarrollo local)**
1. Clonar el repositorio
```
git clone https://github.com/JulisaFiRivas/proyecto-nest.git
cd proyecto-nest
```
2. Instalar dependencias
```
npm install
```
3. Crear la base de datos o usar `libroteca.sql` incluido (o usar Docker).
4. Ejecutar en modo desarrollo
```
npm run start:dev
```

**Usar con Docker (recomendado para reproducibilidad)**
- Levantar la stack (MySQL + App):
```
docker-compose up --build
```
- Variables de contenedor importantes (puedes verlas en `docker-compose.yml`):
  - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `JWT_SECRET`

**Credenciales de prueba (seed)**
Estos usuarios están incluidos en la semilla `src/seed/data/user.seed.ts`:
- Admin: `email: carla@email.com`, `password: admin123`, role: `ADMIN`
- Usuario: `email: ana@email.com`, `password: password123`, role: `USER`

Para (re)crear los datos de prueba:
```
GET http://localhost:3000/seed
```

**Cómo obtener un token (login)**
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "carla@email.com",
  "password": "admin123"
}
```
Respuesta: `{ "access_token": "<JWT>" }`.
Usa ese token en `Authorization: Bearer <JWT>` para endpoints protegidos.

**Resumen rápido de endpoints y seguridad**
- Público: `GET /`, `GET /books`, `GET /books/:id`, `GET /ratings/:book_id/rating`, `GET /seed`
- Protegidos (cualquier usuario autenticado): `POST /comments`, `POST /ratings/:book_id/rating`, rutas de `lists`, `users/:id` (GET/PUT/PATCH/DELETE requieren autenticación)
- Solo ADMIN: `POST /books`, `DELETE /books/:id`, `PATCH /books/:id`, `GET /users` (lista completa)

Para la lista completa de endpoints y ejemplos, consulte `ENDPOINTS.md`.

**Pruebas de seguridad y manual testing**
- He incluido un plan de pruebas con cURL y ejemplos en `SECURITY_TESTING.md`.

**Tabla de permisos (rol)**
- `ADMIN`:
  - Acceso: creación/edición/borrado de libros, ver lista completa de usuarios, acciones de administración.
- `USER`:
  - Acceso: crear comentarios, calificar libros, gestionar sus propias listas y perfil. No puede crear/editar libros ni listar usuarios.


