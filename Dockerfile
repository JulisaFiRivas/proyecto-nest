# ETAPA 1: DEPS - Instalar dependencias
FROM node:20-alpine AS deps

WORKDIR /app

# Copiar archivos de configuración de dependencias
COPY package*.json ./

# Instalar TODAS las dependencias (incluyendo devDependencies)
RUN npm ci

# ETAPA 2: BUILDER - Compilar la aplicación
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar dependencias instaladas desde la etapa anterior
COPY --from=deps /app/node_modules ./node_modules

# Copiar código fuente y archivos de configuración
COPY . .

# Compilar la aplicación NestJS
RUN npm run build

# ETAPA 3: RUNNER - Imagen de producción
FROM node:20-alpine AS runner

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copiar solo las dependencias de producción
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copiar código compilado desde builder
COPY --from=builder /app/dist ./dist

# Cambiar al usuario no-root
USER nestjs

# Exponer puerto
EXPOSE 3000

# Variables de entorno por defecto (se sobrescriben con .env)
ENV NODE_ENV=production \
    PORT=3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]
