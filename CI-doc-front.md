# Documentación del Workflow: Build, Lint, and Deploy React App to AWS

En esta documentación se detallan los pasos necesarios para replicar el workflow de integración continua (CI) utilizado en esta aplicación React. Este workflow utiliza GitHub Actions y tiene las siguientes etapas.

## 1. Workflow Information

- **Nombre del Workflow**: Build, Lint, and Deploy React App to AWS
- **Eventos Desencadenantes**: Automáticamente ejecutado en respuesta a los eventos `push` y `pull_request` en la rama `main`.
- **Sistema Operativo**: Se ejecuta en una máquina virtual con el sistema operativo Ubuntu.

## 2. Pasos del Workflow

### 2.1. Checkout del Repositorio

El primer paso es clonar el repositorio de código fuente utilizando la acción `actions/checkout@v2` de GitHub Actions. Esto garantiza que el código más reciente esté disponible para las etapas posteriores del workflow.

### 2.2. Configuración de Node.js

A continuación, se configura la versión de Node.js utilizando la acción `actions/setup-node@v2`. La versión 16.3.0 de Node.js se establece para las etapas posteriores del workflow.

### 2.3. Instalación de Dependencias

Se instalan las dependencias de la aplicación utilizando el comando `npm install`. Esto asegura que todas las bibliotecas y paquetes necesarios estén disponibles para la construcción y las pruebas.

### 2.4. Linting del Código con ESLint

A continuación, se realiza el linting del código utilizando el comando `npm run lint`. Esto garantiza que el código cumpla con los estándares de calidad y estilo definidos para el proyecto utilizando ESLint.

### 2.5. Construcción de la Aplicación React

Se procede a compilar la aplicación React utilizando el comando `npm run build`. Este paso es crucial para generar la versión de producción de la aplicación.

### 2.6. Revisión de Rendimiento con Lighthouse

Se ejecuta Lighthouse para realizar una revisión de rendimiento de la aplicación utilizando el comando `lighthouse`. Se genera un informe de rendimiento en formato HTML y JSON para la URL proporcionada.

### 2.7. Despliegue a AWS S3

Finalmente, se despliega la aplicación construida en AWS S3 utilizando la acción `jakejarvis/s3-sync-action@master`. Esto permite que la aplicación esté disponible en un entorno de producción.

## 3. Herramientas Utilizadas

- **Node.js**: Plataforma de ejecución de código para JavaScript utilizada para ejecutar las acciones.
  - [Sitio web de Node.js](https://nodejs.org/)

- **npm**: Gestor de paquetes para JavaScript utilizado para instalar dependencias y ejecutar scripts.
  - [Sitio web de npm](https://www.npmjs.com/)

- **ESLint**: Herramienta de linting utilizada para verificar y mantener la calidad del código.
  - [Sitio web de ESLint](https://eslint.org/)

- **Lighthouse**: Herramienta utilizada para realizar revisiones de rendimiento de la aplicación.
  - [Sitio web de Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 4. Archivo de Acciones de GitHub

El archivo de acciones de GitHub utilizado para definir este workflow se muestra a continuación:

```yaml
name: Build, Lint, and Deploy React App to AWS

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 16.3.0.

      - name: Install dependencies
        run: npm install

      - name: Lint with ESLint
        run: npm run lint 

      - name: Build React app
        run: npm run build

      - name: Run Lighthouse performance review
        run: |
          npm install -g lighthouse
          lighthouse https://stockpedia.me/ --quiet --output html --output json --output-path ./lighthouse-report.html

      - name: Deploy to AWS S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --follow-symlinks
        env:
          AWS_S3_BUCKET: grupo27-bucket
          SOURCE_DIR: ./build
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}

