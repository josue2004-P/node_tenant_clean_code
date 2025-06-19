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
✅ Middleware para autenticación con JWT (x-token)
✅ Renovación de token
✅ MongoDB con Mongoose
✅ Validaciones robustas con express-validator
✅ Documentación API con Swagger UI integrada
✅ Proyecto dockerizado para desarrollo y producción
✅ Patrones de diseño aplicados
✅ Modular, mantenible y escalable

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/backend-centro-medico.git
cd backend-centro-medico

```
### 2. Tener instalado docker e iniciarl el contenedor

```bash
docker-compose up --build
```

## Estructura del Proyecto

```bash
src/
├── application/
│   └── use_cases/
│       ├── auth/
│       │   ├── LoginUsuario.js
│       │   └── RenewToken.js
│       ├── empresa/
│       │   ├── CreateEmpresa.js
│       │   └── GetAllEmpresa.js
│       └── usuario/
│           ├── CreateUsuario.js
│           └── GetAllUsuario.js
│
├── config/
│   ├── cors.config.js
│   ├── jwt.config.js
│   └── database/
│       └── config.js
│
├── domain/
│   └── models/
│       ├── Empresa.js
│       ├── Usuario.js
│       ├── Perfil.js
│       ├── PerfilPermiso.js
│       ├── PerfilUsuario.js
│       └── Permiso.js
│
├── infrastructure/
│   └── repositories/
│       ├── EmpresaRepository.js
│       └── UsuarioRepository.js
│
├── interfaces/
│   └── http/
│       ├── controllers/
│       │   ├── AuthController.js
│       │   ├── EmpresaController.js
│       │   └── UsuarioController.js
│       ├── middlewares/
│       │   ├── auth.middleware.js
│       │   ├── tenant.middleware.js
│       │   └── validateFields.js
│       ├── routes/
│       │   ├── index.js
│       │   ├── auth.routes.js
│       │   ├── empresa.routes.js
│       │   └── usuario.routes.js
│       ├── validations/
│       │   ├── empresa.validation.js
│       │   └── usuario.validation.js
│       └── swagger.js
│
├── public/
│   ├── index.html
│   └── styles.css
│
├── app.js
└── server.js
```

## 🧠 Patrones de diseño aplicados

| Patrón                   | Uso en el proyecto                              |
| ------------------------ | ----------------------------------------------- |
| **Repository**           | Encapsula la lógica de acceso a datos           |
| **Factory Function**     | Cada caso de uso inyecta sus dependencias       |
| **Dependency Injection** | Los repositorios se inyectan a los casos de uso |
| **Middleware**           | Reutilización de lógica como auth y tenant      |
| **Singleton parcial**    | Manejo de conexiones compartidas por subdominio |



## 🛠 Funcionalidades implementadas

- 🌐 Multitenancy basado en subdominios (empresa1.localhost).
- 🔐 Login con generación de JWT
- 🔁 Revalidación de tokens con header personalizado x-token
- ✔️ Validaciones con express-validator para inputs y datos.
- 📄 Documentación automática de la API con Swagger UI accesible en /api-docs.
- 👥 CRUD básico para usuarios y empresas (Create & GetAll)
- 🐳 Docker Compose para levantar la API + base de datos
- 🧱 Organización modular por dominio y responsabilidad


## 🧾 Autor

Desarrollado por Josué Pérez
Licencia: MIT
2025