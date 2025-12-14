# 🚀 Deployment Railway - Guía Rápida

## Opción 1: Deployment Manual (Recomendado para principiantes)

### 1️⃣ Crear Proyecto en Railway
1. Ve a [railway.app](https://railway.app)
2. **New Project** → **Empty Project**
3. Nombra tu proyecto: "libroteca-api"

### 2️⃣ Agregar MySQL
1. En tu proyecto → **New Service**
2. Selecciona **Database** → **MySQL**
3. Railway creará automáticamente la BD

### 3️⃣ Agregar Backend NestJS

**Opción A - Desde GitHub:**
1. Sube tu código a GitHub
2. En Railway → **New Service** → **GitHub Repo**
3. Conecta tu cuenta de GitHub
4. Selecciona el repositorio `proyecto-nest`

**Opción B - Railway CLI:**
```powershell
npm install -g @railway/cli
cd c:\Users\chris\OneDrive\Escritorio\proyecto-nest
railway login
railway init
railway up
```

### 4️⃣ Configurar Variables de Entorno

En Railway Dashboard → Tu servicio backend → **Variables**:

```env
NODE_ENV=production
PORT=3000

# Copia estos valores desde el servicio MySQL de Railway:
DB_HOST=${MYSQLHOST}
DB_PORT=${MYSQLPORT}
DB_USER=${MYSQLUSER}
DB_PASS=${MYSQLPASSWORD}
DB_NAME=${MYSQLDATABASE}

JWT_SECRET=cambiar_por_un_secreto_seguro_en_produccion
```

**💡 Tip:** Railway permite usar referencias a variables del servicio MySQL usando `${VARIABLE_NAME}`

### 5️⃣ Importar Schema SQL

**Opción A - Railway CLI:**
```powershell
railway link
railway connect mysql < libroteca.sql
```

**Opción B - MySQL Client:**
1. Obtén las credenciales de MySQL desde Railway Dashboard
2. Conéctate con MySQL Workbench, DBeaver o TablePlus
3. Ejecuta el archivo `libroteca.sql`

**Opción C - Desde el código (Automático):**
- Cambia `synchronize: false` a `synchronize: true` en `app.module.ts` (solo para primera vez)
- Railway creará las tablas automáticamente
- ⚠️ **Importante:** Vuelve a cambiar a `false` después del primer deploy

### 6️⃣ Generar Dominio Público

1. Railway Dashboard → Tu servicio backend
2. **Settings** → **Networking**
3. Click **Generate Domain**
4. Obtendrás: `https://proyecto-nest-production-xxxx.up.railway.app`

### 7️⃣ Probar el Deployment

```powershell
# Reemplaza con tu dominio de Railway
$RAILWAY_URL = "https://proyecto-nest-production-xxxx.up.railway.app"

# Probar health check
curl "$RAILWAY_URL"

# Ver libros
curl "$RAILWAY_URL/books"

# Ejecutar seed (primera vez)
curl "$RAILWAY_URL/seed"

# Probar login
curl -X POST "$RAILWAY_URL/auth/login" `
  -H "Content-Type: application/json" `
  -d '{"email":"carla@email.com","password":"admin123"}'
```

---

## Opción 2: Deployment Automatizado (Script)

```powershell
# Ejecutar script de deployment
.\deploy-railway.ps1
```

El script te guiará paso a paso por todo el proceso.

---

## 📊 Estructura del Proyecto en Railway

```
Proyecto: libroteca-api
├── 🗄️ MySQL Database
│   └── Variables: MYSQLHOST, MYSQLPORT, etc.
│
└── 🚀 Backend NestJS
    ├── Source: GitHub o Local
    ├── Builder: Dockerfile
    └── Variables: DB_HOST, DB_PORT, JWT_SECRET, etc.
```

---

## 🔧 Variables de Entorno Importantes

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DB_HOST` | Host de MySQL Railway | `containers-us-west-123.railway.app` |
| `DB_PORT` | Puerto MySQL | `6543` |
| `DB_USER` | Usuario MySQL | `root` |
| `DB_PASS` | Password MySQL | `generado_por_railway` |
| `DB_NAME` | Nombre de BD | `railway` |
| `JWT_SECRET` | Secreto para JWT | `mi_secreto_seguro_2024` |
| `NODE_ENV` | Entorno | `production` |

---

## ✅ Checklist Post-Deployment

- [ ] MySQL provisionado en Railway
- [ ] Schema SQL importado exitosamente
- [ ] Backend desplegado correctamente
- [ ] Variables de entorno configuradas
- [ ] Dominio público generado
- [ ] Endpoint `/books` responde correctamente
- [ ] Seed ejecutado (datos de prueba cargados)
- [ ] Login funcional con usuarios de prueba
- [ ] CORS configurado (si es necesario para frontend)

---

## 🐛 Troubleshooting Común

### Error: "Cannot connect to database"
```
Solución: Verifica que las variables DB_* estén correctas.
Usa referencias de Railway: ${MYSQLHOST}, ${MYSQLPORT}, etc.
```

### Error: "Port already in use"
```
Solución: Railway asigna el puerto automáticamente.
No necesitas especificar PORT en variables (ya usa 3000 por defecto).
```

### Error: "Module not found" durante build
```
Solución: Verifica que package.json tenga todas las dependencias.
Railway ejecuta npm install automáticamente.
```

### Error: "Table doesn't exist"
```
Solución: Importa el schema SQL usando railway connect mysql.
O activa temporalmente synchronize: true en TypeORM.
```

---

## 💰 Costos Estimados

Railway Plan Free:
- **$5 USD** de crédito gratis/mes
- Uso estimado para este proyecto: **$3-7 USD/mes**
- Incluye: Backend + MySQL + Dominio HTTPS

Después del crédito gratis:
- Pago por uso (pay-as-you-go)
- ~$0.000463 por GB-hora (RAM)
- ~$0.000231 por vCPU-hora

---

## 🔄 Deploy de Cambios Futuros

### Si usas GitHub (Auto-Deploy):
```bash
git add .
git commit -m "Nueva feature"
git push origin main
```
Railway desplegará automáticamente.

### Si usas Railway CLI:
```powershell
railway up
```

### Forzar rebuild:
```powershell
railway up --detach
```

---

## 🌐 Próximos Pasos

1. ✅ **Backend desplegado** → Anota tu URL de Railway
2. 🎨 **Desplegar Frontend Angular** → Actualizar API URL
3. 🔐 **Configurar CORS** (si el frontend está en otro dominio)
4. 📧 **Configurar dominio custom** (opcional)
5. 📊 **Monitorear logs**: `railway logs`

---

## 📚 Recursos Útiles

- **Railway Docs:** https://docs.railway.app
- **Railway CLI:** https://docs.railway.app/develop/cli
- **Railway Dashboard:** https://railway.app/dashboard
- **Support:** https://help.railway.app

---

**¿Necesitas ayuda?** Ejecuta: `railway help`
