# Script de deployment para Railway (PowerShell)
# Este script te ayuda a configurar el deployment en Windows

Write-Host "🚀 Railway Deployment Helper - Libroteca" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# PASO 1: Verificar Railway CLI
Write-Host "PASO 1: Verificando Railway CLI..." -ForegroundColor Blue
if (!(Get-Command railway -ErrorAction SilentlyContinue)) {
    Write-Host "Railway CLI no está instalado." -ForegroundColor Yellow
    Write-Host "Instalando Railway CLI..."
    npm install -g @railway/cli
} else {
    Write-Host "✓ Railway CLI encontrado" -ForegroundColor Green
}

Write-Host ""
Write-Host "PASO 2: Login en Railway" -ForegroundColor Blue
railway login

Write-Host ""
Write-Host "PASO 3: Inicializar proyecto" -ForegroundColor Blue
railway init

Write-Host ""
Write-Host "PASO 4: Crear servicio MySQL" -ForegroundColor Blue
Write-Host "Por favor, ve a https://railway.app/dashboard" -ForegroundColor Yellow
Write-Host "1. Haz clic en tu proyecto"
Write-Host "2. Haz clic en 'New Service'"
Write-Host "3. Selecciona 'Database' → 'MySQL'"
Write-Host ""
Read-Host "Presiona ENTER cuando hayas creado la base de datos MySQL"

Write-Host ""
Write-Host "PASO 5: Ver variables de entorno de MySQL" -ForegroundColor Blue
railway variables

Write-Host ""
Write-Host "IMPORTANTE: Configura las siguientes variables en tu servicio backend:" -ForegroundColor Yellow
Write-Host "  Desde MySQL Railway:"
Write-Host "    - MYSQLHOST → DB_HOST"
Write-Host "    - MYSQLPORT → DB_PORT"
Write-Host "    - MYSQLUSER → DB_USER"
Write-Host "    - MYSQLPASSWORD → DB_PASS"
Write-Host "    - MYSQLDATABASE → DB_NAME"
Write-Host ""
Write-Host "  Variables adicionales:"
Write-Host "    - NODE_ENV=production"
Write-Host "    - JWT_SECRET=tu_secreto_seguro_aqui_cambiar"
Write-Host ""
Read-Host "Presiona ENTER cuando hayas configurado las variables en Railway Dashboard"

Write-Host ""
Write-Host "PASO 6: Importar schema SQL" -ForegroundColor Blue
Write-Host "Conectando a MySQL y ejecutando libroteca.sql..."
Get-Content libroteca.sql | railway connect mysql

Write-Host ""
Write-Host "PASO 7: Desplegar aplicación" -ForegroundColor Blue
railway up

Write-Host ""
Write-Host "✓ Deployment completado!" -ForegroundColor Green
Write-Host ""
Write-Host "PASO 8: Generar dominio público" -ForegroundColor Blue
Write-Host "1. Ve a tu proyecto en Railway Dashboard"
Write-Host "2. Selecciona tu servicio backend"
Write-Host "3. Ve a Settings → Networking → Generate Domain"
Write-Host ""
Write-Host "Próximos pasos:" -ForegroundColor Yellow
Write-Host "1. Genera un dominio público en Railway"
Write-Host "2. Prueba: curl https://tu-dominio.up.railway.app/books"
Write-Host "3. Ejecuta seed: curl https://tu-dominio.up.railway.app/seed"
Write-Host ""
Write-Host "¡Listo! Tu API está desplegada en Railway 🚀" -ForegroundColor Cyan
