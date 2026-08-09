# Diego Godoy — Portafolio

Sitio personal construido con **React + Vite + Tailwind CSS v4**.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
```

Esto genera la carpeta `dist/` lista para publicar.

## Agregar proyectos

Edita `src/data/projects.js`. Cada objeto del arreglo se convierte en una
tarjeta dentro de la sección "Proyectos" — solo agrega uno nuevo siguiendo
el mismo formato (`title`, `period`, `summary`, `tags`, `link`, `status`).

## Deploy en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com) → **Add New Project** → importa el repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`.
4. Deploy — listo, Vercel detecta todo automáticamente.

## Deploy en GitHub Pages

1. Instala el paquete de deploy:
   ```bash
   npm install -D gh-pages
   ```
2. En `package.json`, agrega:
   ```json
   "homepage": "https://<tu-usuario>.github.io/<nombre-repo>",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Corre:
   ```bash
   npm run deploy
   ```
4. En GitHub → Settings → Pages, selecciona la rama `gh-pages` como fuente.

> Nota: `vite.config.js` ya usa `base: './'` (rutas relativas), por lo que
> funciona tanto en Vercel como en GitHub Pages sin configuración extra.
