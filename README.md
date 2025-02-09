# Sistema de Gestión de Inventario 

---

## Descripción del Proyecto 

El Sistema de Gestión de Inventario es una aplicación web diseñada para facilitar la administración de productos, movimientos de inventario y notificaciones de stock bajo. Está desarrollado con una arquitectura moderna que incluye:

Backend: Construido con NestJS, utilizando Prisma como ORM para la gestión de la base de datos y PostgreSQL como sistema de base de datos.

Frontend: Desarrollado en React con Redux Toolkit para la gestión del estado y React Router DOM para la navegación.

Este proyecto es ideal para empresas que necesitan un sistema robusto y escalable para gestionar su inventario de manera eficiente.

---

**Instalación**  

1. Clonar el Repositorio

git clone https://github.com/tu-usuario/mi-repositorio.git
cd mi-repositorio

2. Instalar Dependencias
**Backend**
cd backend
npm install

**Frontend**
cd ../frontend
npm install

**Configuración**
1. Configurar la Base de Datos
Crea una base de datos en PostgreSQL:

CREATE DATABASE inventory;
Configura las variables de entorno en el archivo .env del backend:


DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/inventory?schema=public"

Ejecuta las migraciones de Prisma:
cd backend
npx prisma migrate dev --name init


**Uso**

1. Iniciar el Backend
cd backend
npm run start:dev

El backend estará disponible en:
URL: http://localhost:3000

2. Iniciar el Frontend

cd frontend
npm run dev

El frontend estará disponible en:
URL: http://localhost:5173

Contacto
Si tienes preguntas o sugerencias, no dudes en contactarme:

Nombre: Edgar Antonio De Avila Serpa

Email: deavila.e09@gmail.com

GitHub: aEdgar22

