# TechXtreme – Tienda de Tecnología

Aplicación web **full-stack** que ofrece un catálogo de productos tecnológicos con autenticación de usuarios, carrito de compras y proceso de checkout.
Consta de un **frontend React** y una **API Node/Express** que se comunica con una base de datos MySQL.

---

## 🧩 Características principales

### Frontend (React 19 + React Router 7)

* Navegación SPA: Inicio, listado de productos, detalle, carrito y checkout.
* Modales de **login** y **registro** integrados en cualquier página.
* Filtros de búsqueda y por precio, off-canvas en móvil.
* Carrito persistido en sesión.
* Componentes extra: carrusel de marcas, sección de videos y footer informativo.

### Backend (Node.js + Express)

* Endpoints REST para productos, autenticación, carrito y checkout.
* Sesiones con `express-session` y almacenamiento en MySQL (`express-mysql-session`).
* Hash de contraseñas con `bcrypt`.
* CORS configurado para permitir credenciales entre frontend y backend.
* Script para generar `sitemap.xml` de la parte pública:

  ```bash
  node server/scripts/generate-sitemap.js
  ```

---

## 🗂️ Estructura del proyecto

```
proyecto_web/
├── client/        # Frontend React (Create React App)
│   ├── public/
│   └── src/
├── server/        # API Express
│   ├── routes/
│   └── scripts/
└── .env           # Variables de entorno del backend
```

---

## ⚙️ Requisitos

* Node.js **18+**
* MySQL 8 (o compatible)
* npm 9+ (o equivalente)

---

## 🛠️ Instalación y configuración

1. **Clonar el repositorio**

   ```bash
   git clone <url-del-repo>
   cd proyecto_web
   ```

2. **Backend**

   ```bash
   cd server
   npm install
   # Crear archivo .env (ver sección siguiente)
   npm start
   ```

   Por defecto, levanta en `http://localhost:5000`.

3. **Frontend**

   ```bash
   cd ../client
   npm install
   # Crear archivo .env (ver sección siguiente)
   npm start
   ```

   Servido en `http://localhost:3000`.

### 🔐 Variables de entorno

#### Backend (`server/.env`)

```makefile
DB_HOST=               # Host MySQL
DB_PORT=               # Puerto MySQL
DB_NAME=               # Nombre de la base
DB_USER=               # Usuario de la base
DB_PASS=               # Contraseña
SESSION_SECRET=        # Clave para firmar las sesiones
FRONTEND_URL=          # URL pública del frontend (para CORS y cookies)
```

#### Frontend (`client/.env`)

```makefile
REACT_APP_API_URL=     # URL base del backend (ej. http://localhost:5000)
```

---

## 🚀 Scripts comunes

### Frontend

* `npm start` – modo desarrollo
* `npm run build` – build de producción
* `npm test` – tests de CRA

### Backend

* `npm start` – inicia la API
* `node scripts/generate-sitemap.js` – genera `client/public/sitemap.xml`

---

## 📡 Endpoints principales

| Método | Ruta                 | Descripción                              |
| ------ | -------------------- | ---------------------------------------- |
| GET    | `/api/products`      | Listado de productos                     |
| GET    | `/api/products/:id`  | Detalle de un producto                   |
| GET    | `/api/cart`          | Recupera el carrito de la sesión         |
| POST   | `/api/cart/add`      | Agrega un producto al carrito            |
| POST   | `/api/cart/update`   | Actualiza cantidad o elimina del carrito |
| POST   | `/api/auth/register` | Registro de usuario                      |
| POST   | `/api/auth/login`    | Autenticación de usuario                 |
| POST   | `/api/auth/logout`   | Cierra la sesión                         |
| GET    | `/api/auth/me`       | Usuario autenticado actual               |
| POST   | `/api/checkout`      | Procesa la compra y limpia el carrito    |

---

## 📦 Despliegue

1. Generar build del frontend:

   ```bash
   cd client
   npm run build
   ```
2. Configurar variables en el servidor.
3. Desplegar server (puede servir directamente el contenido de `client/build` o usarse un hosting por separado).

---

## 📜 Licencia

Proyecto académico/demostrativo sin licencia explícita.
Puedes adaptarlo y extenderlo según tus necesidades.
