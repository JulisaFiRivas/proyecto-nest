# Guía de Docker - Libroteca API

## Instrucciones Rápidas

### 1. Configurar variables de entorno

Copia el archivo de ejemplo y ajusta si es necesario:

```bash
cp .env.example .env
```

### 2. Levantar los servicios con Docker

```bash
docker-compose up -d
```

Esto levantará:
- Base de datos MySQL en puerto 3307
- Aplicación NestJS en puerto 3000

### 3. Ver logs de la aplicación

```bash
docker-compose logs -f app
```

### 4. Poblar la base de datos

Espera ~10 segundos a que MySQL inicie completamente, luego:

```bash
curl http://localhost:3000/seed
```

O abre en el navegador: http://localhost:3000/seed

### 5. Probar que funciona

```bash
curl http://localhost:3000/books
```

---

## Comandos Útiles

### Detener los servicios
```bash
docker-compose down
```

### Detener y eliminar volúmenes (limpia la BD)
```bash
docker-compose down -v
```

### Ver estado de los contenedores
```bash
docker-compose ps
```

### Reconstruir las imágenes
```bash
docker-compose up -d --build
```

### Entrar al contenedor de la app
```bash
docker exec -it libroteca-app sh
```

### Entrar a MySQL
```bash
docker exec -it libroteca-mysql mysql -u libroteca_user -p libroteca
# Password: libroteca_password
```

---

## Solución de Problemas

### Error "Cannot connect to MySQL"
- Espera ~10 segundos más, MySQL tarda en iniciar
- Verifica con: `docker-compose logs mysql`

### Error "Port already in use"
- Cambia el puerto en `docker-compose.yml` si 3000 o 3307 están ocupados

### Reconstruir desde cero
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```
