# Guía de Despliegue en Railway - Libroteca

## 🚀 Despliegue Paso a Paso

### **1. Crear cuenta en Railway**
- Ve a [railway.app](https://railway.app)
- Regístrate con GitHub (recomendado)

### **2. Instalar Railway CLI (Opcional pero útil)**
```powershell
npm install -g @railway/cli
railway login
```

### **3. Desplegar Base de Datos MySQL**

#### Desde Railway Dashboard:
1. **New Project** → **Provision MySQL**
2. Railway creará automáticamente una instancia MySQL
3. Ve a la pestaña **Variables** y copia:
   - `MYSQL_URL` o las variables individuales:
     - `MYSQL_HOST`
     - `MYSQL_PORT`
     - `MYSQL_USER`
     - `MYSQL_PASSWORD`
     - `MYSQL_DATABASE`

### **4. Importar Schema SQL**

Conectarte a la BD de Railway y ejecutar el archivo `libroteca.sql`:

```bash
# Opción 1: Usando Railway CLI
railway connect mysql < libroteca.sql

# Opción 2: Usando MySQL Workbench o DBeaver
# Conéctate usando las credenciales de Railway y ejecuta el script
```

### **5. Desplegar Backend NestJS**

#### Opción A: Desde GitHub (Recomendado)
1. Sube tu código a GitHub
2. En Railway: **New Project** → **Deploy from GitHub repo**
3. Selecciona tu repositorio `proyecto-nest`
4. Railway detectará automáticamente el `Dockerfile`

#### Opción B: Desde Railway CLI
```powershell
cd c:\Users\chris\OneDrive\Escritorio\proyecto-nest
railway init
railway up
```

### **6. Configurar Variables de Entorno**

En el dashboard de Railway, ve a tu servicio backend → **Variables** y agrega:

```bash
NODE_ENV=production
PORT=3000

# Usar las credenciales de la BD MySQL de Railway
DB_HOST=containers-us-west-xxx.railway.app
DB_PORT=6379
DB_USER=root
DB_PASS=tu_password_generado
DB_NAME=railway

JWT_SECRET=tu_super_secreto_jwt_cambiar_en_produccion_2024_railway
```

**IMPORTANTE:** Usa las credenciales reales que Railway te proporcionó para MySQL.

### **7. Exponer el Backend**

1. Ve a **Settings** de tu servicio backend
2. En **Networking** → **Generate Domain**
3. Railway te dará una URL pública: `https://tu-app.up.railway.app`

### **8. Probar el Deployment**

```bash
# Probar que la API responde
curl https://tu-app.up.railway.app/books

# Ejecutar seed (solo la primera vez)
curl https://tu-app.up.railway.app/seed
```

---

## 📋 Checklist de Deployment

- [ ] Cuenta de Railway creada
- [ ] Servicio MySQL provisionado en Railway
- [ ] Schema SQL importado (`libroteca.sql`)
- [ ] Código subido a GitHub (si usas esa opción)
- [ ] Servicio backend desplegado
- [ ] Variables de entorno configuradas
- [ ] Dominio público generado
- [ ] Seed ejecutado
- [ ] Endpoints funcionando

---

## 🔧 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que las variables `DB_HOST`, `DB_PORT`, etc. sean correctas
- Asegúrate de que el servicio MySQL esté en la misma red privada de Railway

### Error: "Port already in use"
- Railway asigna automáticamente el puerto. Usa `process.env.PORT`

### Error: "Module not found"
- Verifica que todas las dependencias estén en `package.json`
- Railway ejecuta `npm install` automáticamente

---

## 💰 Costos

Railway ofrece:
- **$5 USD gratis/mes** para hobby projects
- Después de eso, pago por uso

Para este proyecto (backend + MySQL):
- Estimado: **$5-10 USD/mes** en uso moderado

---

## 🌐 URLs Importantes

- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app
- CLI: https://docs.railway.app/develop/cli

---

## 🔄 Deploy de Cambios Futuros

Si usas GitHub:
```bash
git add .
git commit -m "Update feature"
git push origin main
```
Railway desplegará automáticamente los cambios (CI/CD).

Si usas Railway CLI:
```bash
railway up
```

---

## 🎯 Frontend Configuration

Cuando conectes el frontend Angular, usa la URL de Railway:

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://tu-app.up.railway.app'
};
```
