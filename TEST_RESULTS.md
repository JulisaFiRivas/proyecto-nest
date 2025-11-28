## Admin login - status: 401\n\n\n
Admin token: \n\n
## User login - status: 401\n\n\n
User token: \n\n
## GET /auth/profile WITHOUT token - status: 401\n\n\n
## GET /auth/profile WITH USER token - status: 401\n\n\n
## POST /books WITH USER - status: 401\n\n\n
## POST /books WITH ADMIN - status: 401\n\n\n
## POST /comments WITH USER - status: 401\n\n\n
## POST /ratings/1/rating WITH USER - status: 401\n\n\n
---\nAutomated run finished at 11/27/2025 20:08:57.\n
## /seed - status: 
{"success":true,"message":"Base de datos poblada exitosamente","data":{"users":3,"books":5,"ratings":5,"comments":5,"lists":6}}


## Admin login after seed - status: 
{"user":{"id":3,"username":"carla_admin","email":"carla@email.com","profile_picture":null,"role":"ADMIN"},"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjYXJsYUBlbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxhX2FkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY0Mjk1NzU4LCJleHAiOjE3NjQzODIxNTh9.ez8RschDvAr6t99zyofouXLdv6VRLmqkdjzbCZdUlJE"}


Admin token after seed: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjYXJsYUBlbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxhX2FkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY0Mjk1NzU4LCJleHAiOjE3NjQzODIxNTh9.ez8RschDvAr6t99zyofouXLdv6VRLmqkdjzbCZdUlJE


\n---\nNew run at 11/27/2025 20:13:56\n
SEED OK: {"success":true,"message":"Base de datos poblada exitosamente","data":{"users":3,"books":5,"ratings":5,"comments":5,"lists":6}}\n
ADMIN LOGIN: 
{"user":{"id":3,"username":"carla_admin","email":"carla@email.com","profile_picture":null,"role":"ADMIN"},"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJjYXJsYUBlbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNhcmxhX2FkbWluIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY0Mjk2MDM3LCJleHAiOjE3NjQzODI0Mzd9.XuSm0-mtKK7XHRH6pvp43rl8xqD7IcIBRk3VaYxdX2I"}

USER LOGIN: 
{"user":{"id":1,"username":"ana_lectora","email":"ana@email.com","profile_picture":null,"role":"USER"},"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhbmFAZW1haWwuY29tIiwidXNlcm5hbWUiOiJhbmFfbGVjdG9yYSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzY0Mjk2MDM3LCJleHAiOjE3NjQzODI0Mzd9.stGSFHloSoHy2-MZoOq2vJDzRJF7_kVlKfB19YWrT0Q"}

PROFILE USER: 
{"id":1,"email":"ana@email.com","username":"ana_lectora","role":"USER"}

CREATE BOOK USER ERROR: Error en el servidor remoto: (403) Prohibido.

CREATE BOOK ADMIN: 
{"id":6,"title":"Libro Admin Autom Final","synopsis":null,"cover_image_url":null,"author":"Admin","genre":"Test","description":null}

CREATE COMMENT ERROR: Error en el servidor remoto: (400) Solicitud incorrecta.

CREATE RATING: 
{"book_id":1,"average":4.5,"totalRatings":2}

