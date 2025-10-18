
<div align="center">

# SSO Project  
### Sistema de Autenticación Única con Laravel + React

<img src="https://skillicons.dev/icons?i=laravel,react,php,js,mysql,git" height="70" />

**Inicio de sesión único (SSO)** desarrollado con **Laravel (Backend API)** y **React (Frontend)** para centralizar la autenticación de múltiples aplicaciones cliente.

</div>

---

##  Características principales

-  **Autenticación centralizada (SSO)** para múltiples aplicaciones.  
-  **Emisión y validación de tokens JWT** para acceso seguro.  
-  **Backend API REST** construido con Laravel.  
- **Frontend dinámico en React** para flujo de login y logout.  
-  **Protección de rutas** mediante middleware y roles.  
-  Arquitectura modular y desacoplada.

---

##  Estructura del proyecto

```
/
├── sso-backend/          ← Backend Laravel (API / autenticación)
├── sso-client-main/      ← Frontend React (cliente que consume API)
└── README.md             ← Este archivo
```

---

##  Instalación y ejecución

###  Backend (Laravel)

1. Ir a la carpeta del backend:
   ```bash
   cd sso-backend
   ```
2. Instalar dependencias:
   ```bash
   composer install
   ```
3. Copiar el archivo de entorno y configurar variables:
   ```bash
   cp .env.example .env
   ```
4. Generar la clave de aplicación:
   ```bash
   php artisan key:generate
   ```
5. Ejecutar migraciones:
   ```bash
   php artisan migrate --seed
   ```
6. Iniciar el servidor:
   ```bash
   php artisan serve
   ```
   Por defecto: http://127.0.0.1:8000

---

###  Frontend (React)

1. Ir a la carpeta del frontend:
   ```bash
   cd sso-client-main
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar servidor de desarrollo:
   ```bash
   npm start
   ```
   Por defecto: http://localhost:3000

---

##  Flujo de uso

1. El usuario accede al cliente React y hace clic en **Iniciar sesión**.  
2. El cliente envía las credenciales al backend (endpoint `/api/login`).  
3. El backend valida y devuelve un **token JWT** junto con los datos del usuario.  
4. El cliente guarda el token y lo envía en cada petición mediante el header `Authorization`.  
5. El usuario puede cerrar sesión, y el token se invalida desde el backend.  

---

##  Seguridad recomendada

- Usar **HTTPS** en producción.  
- Configurar **CORS** correctamente.  
- No exponer claves API ni tokens en el frontend.  
- Usar tokens con expiración corta y refresh tokens si aplica.  

---

##  Tecnologías utilizadas

| Tipo | Tecnología |
|------|-------------|
| Backend | [![Laravel](https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=flat&logo=laravel&logoColor=white)](https://laravel.com) |
| Frontend | [![React](https://img.shields.io/badge/React-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)](https://react.dev) |
| Lenguaje | [![PHP](https://img.shields.io/badge/PHP-%23777BB4.svg?style=flat&logo=php&logoColor=white)](https://www.php.net) |
| Base de datos | [![MySQL](https://img.shields.io/badge/MySQL-%2300f.svg?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com) |
| Control de versiones | [![Git](https://img.shields.io/badge/Git-%23F05033.svg?style=flat&logo=git&logoColor=white)](https://git-scm.com) |

---

##  Dependencias importantes

### Backend (Laravel)
- `laravel/framework`
- `laravel/sanctum` o `jwt-auth`
- `guzzlehttp/guzzle`

### Frontend (React)
- `axios`
- `react-router-dom`
- `jwt-decode`

---

##  Mejoras futuras

-  Implementar **refresh tokens**  
-  Gestión de roles y permisos  
-  Auditoría de accesos  
-  Integración con proveedores externos (OAuth2, Google, etc.)  
-  Panel para administración de usuarios y aplicaciones cliente  

---

##  Licencia

Este proyecto se distribuye bajo la licencia **MIT**.  
Eres libre de usarlo, modificarlo y adaptarlo.

---

<div align="center">
Hecho con ❤️ por <strong>Wilo</strong>  
<br/>
<a href="https://github.com/Wilo92/sso_project">Ver en GitHub</a>
</div>
