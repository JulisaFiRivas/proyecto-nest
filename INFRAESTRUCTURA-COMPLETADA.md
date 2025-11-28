# Docker & Infraestructura - COMPLETADO

## Archivos Creados

### 1. **Dockerfile** 
- Multi-stage build con 3 etapas (deps, builder, runner)
- Imagen optimizada de producción
- Usuario no-root para seguridad
- Node.js 20 Alpine (imagen ligera)

### 2. **docker-compose.yml**
- Servicio MySQL 8.0 con persistencia
- Servicio NestJS con health checks
- Variables de entorno configuradas
- Red privada para comunicación
- Puerto 3307 para MySQL (evita conflictos con MySQL local)
- Puerto 3000 para la aplicación

### 3. **.env.example** 
- Template de variables de entorno
- Documentadas todas las variables necesarias

### 4. **.dockerignore** 
- Excluye archivos innecesarios de la imagen Docker
- Reduce tamaño de la imagen

### 5. **.env**
- Archivo local para desarrollo
- Configurado para MySQL local (XAMPP)

## Archivos Modificados

### 1. **src/app.module.ts**
- ConfigModule.forRoot() implementado
- Validación de variables de entorno con Joi
- TypeORM usando ConfigService (sin process.env)
- isGlobal: true para disponibilidad global

### 2. **src/main.ts** 
- ValidationPipe global configurado
- whitelist, forbidNonWhitelisted, transform activados
- Puerto obtenido desde ConfigService

### 3. **src/auth/auth.module.ts** 
- JwtModule usando ConfigService
- JWT_SECRET desde variables de entorno

### 4. **src/auth/strategies/jwt.strategy.ts** 
- ConfigService inyectado
- JWT_SECRET desde configuración (no process.env)

### 5. **src/config/env.validation.ts** (NUEVO)
- Schema de validación con Joi
- Valida todas las variables requeridas
- DB_PASS permite cadena vacía para desarrollo local

## Dependencias Instaladas

```bash
npm install joi
```

## Cómo Usar

### Opción 1: Desarrollo Local (sin Docker)
```bash
npm install
npm run start:dev
```

### Opción 2: Con Docker (RECOMENDADO)
```bash
# 1. Copiar variables de entorno
cp .env.example .env

# 2. Levantar servicios
docker-compose up -d

# 3. Ver logs
docker-compose logs -f app

# 4. Poblar base de datos
curl http://localhost:3000/seed
```

## Verificación

✅ No hay `process.env` directo en el código
✅ ConfigModule configurado globalmente
✅ Validación de variables de entorno
✅ ValidationPipe global activo
✅ Dockerfile multi-stage optimizado
✅ docker-compose.yml funcional
✅ Compilación sin errores

## Próximos Pasos

La infraestructura está lista. Ahora pueden continuar con:
1. Sistema de Seguridad (Decoradores & Guards)
2. Protección de Endpoints
3. Actualización del README principal

## Notas Importantes

- El puerto de MySQL en Docker es **3307** (no 3306) para evitar conflictos
- El archivo `.env` está en `.gitignore` (no se subirá a GitHub)
- El `.env.example` SÍ debe subirse a GitHub como referencia
- La aplicación espera MySQL corriendo para iniciar completamente
