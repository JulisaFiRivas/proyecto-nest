#!/bin/bash

# Script de deployment para Railway
# Este script te ayuda a configurar el deployment

echo "🚀 Railway Deployment Helper - Libroteca"
echo "========================================"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}PASO 1: Verificando Railway CLI...${NC}"
if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Railway CLI no está instalado.${NC}"
    echo "Instalando Railway CLI..."
    npm install -g @railway/cli
else
    echo -e "${GREEN}✓ Railway CLI encontrado${NC}"
fi

echo ""
echo -e "${BLUE}PASO 2: Login en Railway${NC}"
railway login

echo ""
echo -e "${BLUE}PASO 3: Inicializar proyecto${NC}"
railway init

echo ""
echo -e "${BLUE}PASO 4: Crear servicio MySQL${NC}"
echo "Por favor, ve a https://railway.app/dashboard"
echo "1. Haz clic en tu proyecto"
echo "2. Haz clic en 'New Service'"
echo "3. Selecciona 'Database' → 'MySQL'"
echo ""
read -p "Presiona ENTER cuando hayas creado la base de datos MySQL..."

echo ""
echo -e "${BLUE}PASO 5: Configurar variables de entorno${NC}"
echo "Copiando variables desde Railway MySQL..."
railway variables

echo ""
echo -e "${YELLOW}IMPORTANTE:${NC} Copia las siguientes variables de MySQL a tu servicio backend:"
echo "  - MYSQL_HOST → DB_HOST"
echo "  - MYSQL_PORT → DB_PORT"  
echo "  - MYSQL_USER → DB_USER"
echo "  - MYSQL_PASSWORD → DB_PASS"
echo "  - MYSQL_DATABASE → DB_NAME"
echo ""
echo "También agrega:"
echo "  - NODE_ENV=production"
echo "  - JWT_SECRET=tu_secreto_seguro_aqui"
echo ""
read -p "Presiona ENTER cuando hayas configurado las variables..."

echo ""
echo -e "${BLUE}PASO 6: Importar schema SQL${NC}"
echo "railway connect mysql < libroteca.sql"
railway connect mysql < libroteca.sql

echo ""
echo -e "${BLUE}PASO 7: Desplegar aplicación${NC}"
railway up

echo ""
echo -e "${GREEN}✓ Deployment completado!${NC}"
echo ""
echo -e "${BLUE}PASO 8: Generar dominio público${NC}"
echo "Ve a tu proyecto en Railway → Settings → Generate Domain"
echo ""
echo -e "${YELLOW}Próximos pasos:${NC}"
echo "1. Genera un dominio público en Railway"
echo "2. Prueba: curl https://tu-dominio.railway.app/books"
echo "3. Ejecuta seed: curl https://tu-dominio.railway.app/seed"
