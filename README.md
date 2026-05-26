# LógicaES - MVP 🚀

**LógicaES** es una plataforma educativa interactiva (Single Page Application) diseñada específicamente para estudiantes hispanohablantes de ingeniería de software. Su objetivo principal es servir como un puente transicional, reduciendo la sobrecarga cognitiva al permitir a los estudiantes dominar la lógica algorítmica en español antes de enfrentarse a plataformas internacionales en inglés como LeetCode o HackerRank.

Este proyecto representa el Producto Mínimo Viable (PMV) para un proyecto de tesis o profesionalizante.

## 🌟 Características Principales

- **Editor de Código Profesional:** Integración con Monaco Editor (el núcleo de VS Code) con soporte para atajos de teclado (`Ctrl + Enter`), resaltado de sintaxis y ajuste automático de línea.
- **Ejecución Segura (Sandboxing):** Evaluador construido sobre **Web Workers** que aísla la ejecución del código del usuario. Incluye un sistema de detección de bucles infinitos (Time Limit Exceeded) de 2000ms para evitar el congelamiento del navegador.
- **Evaluación Automatizada:** Motor de pruebas que corre el código contra múltiples Casos de Prueba (*Test Cases*) midiendo el tiempo de ejecución de manera precisa.
- **Pedagogía Activa y Gamificación:**
  - Sistema de rangos y barra de progreso que avanzan según los retos completados.
  - "Dopamina digital" (Efecto Confeti) al pasar las pruebas exitosamente.
  - Desbloqueo de la **Solución Óptima (Senior)** junto con una explicación de la Complejidad Algorítmica (Notación Big O) para cada reto.
  - Sistema de Glosario Interactivo (Tooltips) para introducir sutilmente vocabulario técnico en inglés.

## 🛠️ Stack Tecnológico

- **Frontend Core:** React 18 + Vite
- **Estilos:** Tailwind CSS 
- **Editor:** `@monaco-editor/react`
- **Iconografía:** `lucide-react`
- **Arquitectura:** Single Page Application (SPA), Client-Side Storage (`localStorage`), Multihilo (Web Workers).

## 💻 Instalación y Ejecución Local

Si deseas correr este proyecto de manera local en tu máquina:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Zexka/logicaes-mvp.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd logicaes-mvp
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
5. Abre `http://localhost:5173` en tu navegador para ver la aplicación.

## 🌐 Despliegue en Vivo

El proyecto está configurado para un despliegue continuo (CI/CD) automatizado a través de **Vercel**. Cualquier cambio hecho en la rama principal (`main`) se refleja en producción inmediatamente.
