# Beauty Salon Website Template

Sitio web profesional y moderno para salones de belleza, desarrollado con Astro, Svelte y Tailwind CSS.

## 🚀 Características

- Diseño moderno y responsive
- Catálogo personalizable de servicios
- Sistema de reserva de citas
- Galería de trabajos
- Integración con redes sociales
- Información de contacto y ubicación
- Horarios de atención personalizables

## 💻 Tecnologías

- [Astro](https://astro.build/) - Framework web
- [Svelte](https://svelte.dev/) - Framework UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [FullCalendar](https://fullcalendar.io/) - Calendario para reservas
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para base de datos
- [PostgreSQL](https://www.postgresql.org/) - Base de datos

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/jaennova/beauty-salon.git
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
Crea un archivo `.env` basado en `.env.example`

4. Personaliza la información del negocio:
Modifica el archivo `src/data/website.json` con los datos de tu negocio

5. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 📋 Comandos Disponibles

| Comando                   | Descripción                                      |
| :----------------------- | :----------------------------------------------- |
| `npm run dev`            | Inicia servidor de desarrollo en `localhost:4321`|
| `npm run build`          | Construye el sitio para producción              |
| `npm run preview`        | Vista previa de la build                        |
| `npm run db:generate`    | Genera migraciones de la base de datos          |
| `npm run db:push`        | Aplica migraciones a la base de datos           |
| `npm run db:studio`      | Abre Drizzle Studio para gestionar la BD        |

## 📁 Estructura del Proyecto

```text
/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   ├── layouts/         # Layouts de páginas
│   ├── pages/           # Páginas del sitio
│   └── data/           # Datos y configuración
├── astro.config.mjs     # Configuración de Astro
└── package.json         # Dependencias y scripts
```

## 🌟 Características Principales

- **Página de Inicio**: Showcase de servicios destacados
- **Catálogo de Servicios**: Lista detallada de servicios y precios
- **Sistema de Reservas**: Calendario interactivo para agendar citas
- **Galería**: Muestra de trabajos realizados
- **Información de Contacto**: Datos de contacto y ubicación
- **Integración con Redes Sociales**: Enlaces a perfiles sociales
- **Horarios**: Sistema de horarios personalizable
- **Diseño Responsivo**: Adaptable a todos los dispositivos

## ⚙️ Personalización

1. **Información del Negocio**
   - Modifica `src/data/website.json` con los datos de tu negocio
   - Actualiza logos e imágenes en la carpeta `public/`

2. **Estilos**
   - Personaliza colores y estilos en `tailwind.config.cjs`
   - Modifica los componentes en `src/components/`

3. **Contenido**
   - Actualiza textos y servicios en los archivos correspondientes
   - Personaliza las páginas en `src/pages/`

## 📱 Integración con Redes Sociales

El sitio permite integración con:
- Instagram
- Facebook
- WhatsApp Business
- Otras redes sociales (personalizables)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, lee `CONTRIBUTING.md` para detalles sobre nuestro código de conducta y el proceso para enviar pull requests.

## 🐛 Reportar Problemas

Si encuentras algún problema o tienes sugerencias, por favor crea un issue en el repositorio.
