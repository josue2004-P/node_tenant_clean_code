# 🏢 API Multitenant con Express + MongoDB

Este proyecto implementa una **API multitenant** utilizando **Express.js** y **MongoDB**, donde cada empresa (tenant) tiene su propia base de datos. La resolución del tenant se hace mediante **subdominios**, y se soporta un **modo administrador** para gestionar empresas y usuarios globales.

## 🚀 Características

- 🔒 Arquitectura multitenant (una base de datos por empresa).
- 🌐 Subdominios como estrategia de enrutamiento por tenant.
- 🧩 Conexiones dinámicas a MongoDB.
- 🔄 Middleware para resolver y conectar al tenant correcto.
- ⚙️ CORS configurado.
- 📦 Uso de Docker para facilitar el despliegue y desarrollo local.

---

## 📁 Estructura del proyecto

```bash
project-root/
├── .env
├── docker-compose.yml
├── app.js
├── /middlewares/
│   └── tenant.middleware.js
├── /config/
│   ├── cors.config.js
│   └── database/
│       └── config.js
├── /models/
│   ├── Usuario.js
│   └── Empresa.js
├── /v1/
│   └── routes/
│       ├── usuarios.routes.js
│       └── empresa.routes.js
├── /public/
│   └── index.html
