# 🏥 Backend Multitenant - Centro Médico

Este es un sistema backend escalable y desacoplado basado en **Clean Architecture**, que soporta múltiples bases de datos por cliente (**multitenancy** por subdominio), con autenticación **JWT** y lógica desacoplada mediante patrones de diseño profesionales.

---

## 🧱 Arquitectura

El proyecto sigue los principios de **Clean Architecture**, organizando el código en capas independientes:

- **`application/`**: Casos de uso (lógica de negocio) puros, sin dependencias externas.
- **`domain/`**: Entidades o modelos del negocio.
- **`infrastructure/`**: Adaptadores para conectar con tecnologías externas como bases de datos.
- **`interfaces/`**: Interfaz del sistema (HTTP - controladores, rutas, middlewares).
- **`config/`**: Configuraciones generales de base de datos, JWT y CORS.

Esta separación promueve el desacoplamiento, testeo fácil y escalabilidad.

---

## 📦 Características

✅ Multitenancy por subdominio  
✅ Middleware para autenticación con JWT (`x-token`)  
✅ Renovación de token  
✅ MongoDB con Mongoose  
✅ Proyecto dockerizado  
✅ Patrones de diseño aplicados  
✅ Modular, mantenible y escalable

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/backend-centro-medico.git
cd backend-centro-medico
docker-compose up --build

```bash
src/
├── application/
│   └── use_cases/
│       ├── usuario/
│       │   ├── CreateUsuario.js
│       │   ├── GetAllUsuario.js
│       │   └── LoginUsuario.js
│       └── empresa/
│           ├── CreateEmpresa.js
│           └── GetAllEmpresa.js
│
├── domain/
│   └── models/
│       ├── Usuario.js
│       └── Empresa.js
│
├── infrastructure/
│   └── repositories/
│       ├── UsuarioRepository.js
│       └── EmpresaRepository.js
│
├── interfaces/
│   └── http/
│       ├── controllers/
│       │   ├── UsuarioController.js
│       │   └── EmpresaController.js
│       ├── routes/
│       │   ├── index.js
│       │   ├── usuarios.routes.js
│       │   └── empresa.routes.js
│       └── middlewares/
│           ├── auth.middleware.js
│           └── tenant.middleware.js
│
├── config/
│   ├── cors.config.js
│   ├── jwt.config.js
│   └── database/
│       └── config.js
│
├── app.js
└── server.js

🧠 Patrones de diseño aplicados
| Patrón                   | Uso en el proyecto                              |
| ------------------------ | ----------------------------------------------- |
| **Repository**           | Encapsula la lógica de acceso a datos           |
| **Factory Function**     | Cada caso de uso inyecta sus dependencias       |
| **Dependency Injection** | Los repositorios se inyectan a los casos de uso |
| **Middleware**           | Reutilización de lógica como auth y tenant      |
| **Singleton parcial**    | Manejo de conexiones compartidas por subdominio |

🛠 Funcionalidades implementadas

🌐 Multitenancy basado en subdominios (empresa1.localhost)

🔐 Login con generación de JWT

🔁 Revalidación de tokens con header personalizado x-token

👥 CRUD básico para usuarios y empresas (Create & GetAll)

🐳 Docker Compose para levantar la API + base de datos

🧱 Organización modular por dominio y responsabilidad

🧾 Autor
Desarrollado por Josué Pérez
Licencia: MIT
2025