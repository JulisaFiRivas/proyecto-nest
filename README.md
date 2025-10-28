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
│   ├── entities/
│   │   └── book.entity.ts
│   ├── books.controller.ts
│   ├── books.service.ts
│   └── books.module.ts
├── comments/
│   ├── dto/
│   │   ├── create-comment.dto.ts
│   │   └── update-comment.dto.ts
│   ├── entities/
│   │   └── comment.entity.ts
│   ├── comments.controller.ts
│   ├── comments.service.ts
│   └── comments.module.ts
├── lists/
│   ├── dto/
│   │   ├── create-list.dto.ts
│   │   └── update-list.dto.ts
│   ├── entities/
│   │   └── user-book-list.entity.ts
│   ├── lists.controller.ts
│   ├── lists.service.ts
│   └── lists.module.ts
├── ratings/
│   ├── dto/
│   │   ├── create-rating.dto.ts
│   │   └── update-rating.dto.ts
│   ├── entities/
│   │   └── rating.entity.ts
│   ├── ratings.controller.ts
│   ├── ratings.service.ts
│   └── ratings.module.ts
├── seed/
│   ├── data/
│   │   ├── book.seed.ts
│   │   ├── comment.seed.ts
│   │   └── rating.seed.ts
│   ├── seed.controller.ts
│   ├── seed.service.ts
│   └── seed.module.ts
├── users/
│   ├── dto/
│   │   ├── create-user.dto.ts
│   │   └── update-user.dto.ts
│   ├── entities/
│   │   └── user.entity.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```
