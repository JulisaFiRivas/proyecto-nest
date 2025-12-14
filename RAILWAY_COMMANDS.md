# 🛠️ Comandos Útiles de Railway

## Instalación y Setup

```powershell
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Inicializar proyecto
railway init

# Vincular a proyecto existente
railway link
```

## Deployment

```powershell
# Desplegar aplicación
railway up

# Desplegar en segundo plano
railway up --detach

# Desplegar servicio específico
railway up --service backend
```

## Variables de Entorno

```powershell
# Ver todas las variables
railway variables

# Agregar variable
railway variables set KEY=value

# Agregar múltiples variables
railway variables set KEY1=value1 KEY2=value2

# Eliminar variable
railway variables delete KEY

# Ejemplo: Configurar variables para producción
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=mi_secreto_super_seguro_2024
```

## Base de Datos

```powershell
# Conectar a MySQL
railway connect mysql

# Ejecutar SQL desde archivo
railway connect mysql < libroteca.sql

# Abrir shell de MySQL
railway connect mysql --shell

# Ver logs de MySQL
railway logs --service mysql
```

## Logs y Debugging

```powershell
# Ver logs en tiempo real
railway logs

# Ver logs de servicio específico
railway logs --service backend

# Ver logs anteriores
railway logs --tail 100

# Logs con filtro
railway logs | Select-String "error"
```

## Información del Proyecto

```powershell
# Ver estado del proyecto
railway status

# Ver información del entorno
railway environment

# Listar servicios
railway service

# Ver dominio público
railway domain
```

## Gestión de Entornos

```powershell
# Listar entornos
railway environment list

# Cambiar de entorno
railway environment switch production

# Crear nuevo entorno
railway environment create staging
```

## Comandos Locales

```powershell
# Ejecutar comando local con variables de Railway
railway run npm start

# Abrir shell con variables de Railway
railway shell

# Ejecutar tests con variables de Railway
railway run npm test
```

## Dominios

```powershell
# Generar dominio
railway domain

# Ver dominios configurados
railway domain list
```

## Troubleshooting

```powershell
# Ver información de build
railway logs --build

# Reiniciar servicio
railway restart

# Ver uso de recursos
railway status --service backend

# Abrir dashboard en navegador
railway open
```

## Atajos Útiles

```powershell
# Desplegar y ver logs
railway up; railway logs -f

# Variables + Deploy
railway variables set KEY=value; railway up

# Conectar a BD y ejecutar script
railway connect mysql < script.sql

# Ver logs de error
railway logs | Select-String "ERROR"

# Abrir dashboard del proyecto
railway open
```

## Workflow Completo de Deploy

```powershell
# 1. Login (solo primera vez)
railway login

# 2. Vincular proyecto
railway link

# 3. Configurar variables
railway variables set NODE_ENV=production
railway variables set JWT_SECRET=mi_secreto_seguro

# 4. Desplegar
railway up

# 5. Ver logs
railway logs -f

# 6. Probar endpoint
curl https://tu-dominio.up.railway.app/books
```

## Tips y Trucos

### Verificar conexión a BD antes de deploy
```powershell
# Test de conexión
railway connect mysql -c "SELECT 1;"
```

### Backup de BD
```powershell
# Exportar base de datos
railway connect mysql -e "mysqldump railway" > backup.sql
```

### Ver variables sin valores sensibles
```powershell
railway variables | Select-String "DB_"
```

### Deploy condicional
```powershell
# Solo si hay cambios en git
if (git status --porcelain) { railway up }
```

### Monitorear deployment
```powershell
railway up --detach; Start-Sleep 5; railway logs -f
```

## Variables de Entorno Comunes para Railway

```powershell
# Backend NestJS
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set DB_HOST='${MYSQLHOST}'
railway variables set DB_PORT='${MYSQLPORT}'
railway variables set DB_USER='${MYSQLUSER}'
railway variables set DB_PASS='${MYSQLPASSWORD}'
railway variables set DB_NAME='${MYSQLDATABASE}'
railway variables set JWT_SECRET=cambiar_secreto_seguro
railway variables set CORS_ORIGIN=https://tu-frontend.vercel.app
```

## Debugging Común

### Error: "Cannot find module"
```powershell
# Ver logs de build
railway logs --build

# Verificar package.json
railway run cat package.json
```

### Error: "Port already in use"
```powershell
# Railway asigna puerto automáticamente
# No configurar PORT en variables (usa el de código)
```

### Error: "Database connection failed"
```powershell
# Verificar variables de BD
railway variables | Select-String "DB"

# Test de conexión
railway connect mysql
```

### Ver versión de Node en Railway
```powershell
railway run node --version
```

## Recursos

- Docs: https://docs.railway.app
- Status: https://status.railway.app
- Discord: https://discord.gg/railway
- Help: railway help

## Quick Reference

| Comando | Descripción |
|---------|-------------|
| `railway login` | Autenticar |
| `railway init` | Nuevo proyecto |
| `railway link` | Vincular existente |
| `railway up` | Desplegar |
| `railway logs` | Ver logs |
| `railway variables` | Ver/editar vars |
| `railway connect mysql` | Conectar a BD |
| `railway open` | Abrir dashboard |
| `railway status` | Estado del proyecto |
| `railway restart` | Reiniciar servicio |
