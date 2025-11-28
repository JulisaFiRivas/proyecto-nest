++ # Plan de Pruebas de Seguridad (Manual) - Libroteca API

Este documento contiene instrucciones paso a paso para verificar la seguridad de los endpoints: autenticación (401) y autorización (403). Incluye comandos `curl` y una checklist para que registres los resultados.

Precondiciones:
- La API está corriendo en `http://localhost:3000`.
- La base de datos está poblada con la semilla (`GET /seed`) o tienes usuarios de prueba.

Usuarios de prueba (seed):
- Admin: `email: carla@email.com`, `password: admin123`, role: `ADMIN`
- User: `email: ana@email.com`, `password: password123`, role: `USER`

Formato de reporte de prueba (recomendado):
- `TEST CASE - RESULT - HTTP_CODE - RESPONSE_SUMMARY`

Checklist de pruebas y comandos

1) Login ADMIN
```
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"carla@email.com","password":"admin123"}'
```
Esperado: 200 + JSON con `access_token`.

2) Login USER
```
curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"ana@email.com","password":"password123"}'
```
Esperado: 200 + JSON con `access_token`.

3) Acceso a endpoint protegido SIN token (esperar 401)
Ejemplo: acceder a `GET /auth/profile` sin header
```
curl -i http://localhost:3000/auth/profile
```
Esperado: HTTP 401, cuerpo con `{ "statusCode": 401, "message": "Unauthorized" }`.

4) Acceso a endpoint protegido CON token válido (USER)
Obtener token del paso 2 y hacer:
```
curl -H "Authorization: Bearer <USER_JWT>" http://localhost:3000/auth/profile
```
Esperado: HTTP 200 con datos del usuario.

5) Intento de acceder a ruta ADMIN con token USER → esperar 403
Ejemplo: `POST /books` con token de `USER`
```
curl -i -X POST http://localhost:3000/books \
  -H "Authorization: Bearer <USER_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Prueba","author":"A","genre":"G"}'
```
Esperado: HTTP 403, ejemplo de respuesta:
```json
{ "statusCode": 403, "message": "User ana_lectora needs a valid role: [ADMIN]", "error": "Forbidden" }
```

6) Acceso a ruta ADMIN con token ADMIN → esperar 201/200
```
curl -i -X POST http://localhost:3000/books \
  -H "Authorization: Bearer <ADMIN_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Libro Admin","author":"Admin","genre":"Test"}'
```
Esperado: HTTP 201 o 200 con el recurso creado.

7) Verificación de borrado/edición protegido (ADMIN)
Prueba `DELETE /books/:id` y `PATCH /books/:id` con token ADMIN.

8) Prueba de permisos sobre recursos propios (comments, lists, users)
- Crear un comentario con USER y luego intentar borrarlo con otro USER → debería fallar (403 o BadRequest según implementación).

9) Intento con token manipulado/expirado
- Reemplaza un JWT por uno inválido y espera 401.

Documentación de errores esperados
- 401 Unauthorized: sin token o token inválido.
- 403 Forbidden: usuario autenticado pero sin rol necesario.
