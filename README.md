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
src/
├── application/
│   └── use_cases/
│       ├── CreateUsuario.js
│       └── CreateEmpresa.js
├── domain/
│   └── models/
│       ├── Usuario.js
│       └── Empresa.js
├── infrastructure/
│   └── repositories/
│       ├── UsuarioRepository.js
│       └── EmpresaRepository.js
├── interfaces/
│   └── http/
│       ├── controllers/
│       │   ├── UsuarioController.js
│       │   └── EmpresaController.js
│       ├── middlewares/
│       │   └── tenant.middleware.js
│       └── routes/
│           ├── usuario.routes.js
│           └── empresa.routes.js
├── config/
│   ├── cors.config.js
│   └── database/
│       └── config.js
├── public/
│   └── index.html
├── app.js
└── server.js

