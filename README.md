# Free TTS - VozCraft

**Texto a Voz GRATIS en tiempo real** 🌍🔊  
Genera audio de alta calidad a partir de texto **sin costo alguno**, directamente en tu navegador.

Demo en vivo:  
→ https://stackblitz.com/edit/vitejs-vite-u38a4ngv (puedes forkear y probar al instante)

https://github.com/MateoRiosdev/Free-TTS-VozCraft

## Características principales

- 🎙️ **100% Gratuito** – sin suscripciones, sin límites diarios, sin API keys
- ⚡ Generación en **tiempo real** (usa la tecnología nativa del navegador)
- 🌎 Soporte para **múltiples idiomas y acentos**
- Interfaz limpia y fácil de usar
- Copia el texto → selecciona voz → genera audio → descarga o reproduce
- Funciona en la mayoría de navegadores modernos (Chrome, Edge, Safari, Firefox*, etc.)

*Nota: La calidad y disponibilidad de voces depende del navegador y del sistema operativo.

## Voces disponibles

| Idioma / Región          | Código     | Bandera   | Ejemplo de uso recomendado              |
|--------------------------|------------|-----------|------------------------------------------|
| Español (México)         | es-MX      | 🇲🇽       | Contenido mexicano, doblajes neutros     |
| Español (España)         | es-ES      | 🇪🇸       | España, podcasts, audiolibros europeos   |
| Español (Argentina)      | es-AR      | 🇦🇷       | Acento rioplatense, voseo                |
| Español (Colombia)       | es-CO      | 🇨🇴       | Acento neutro andino                     |
| Español (Chile)          | es-CL      | 🇨🇱       | Chile, contenido juvenil                 |
| Español (Venezuela)      | es-VE      | 🇻🇪       | Acento caribeño venezolano               |
| English (United States)  | en-US      | 🇺🇸       | Inglés americano estándar                |
| English (United Kingdom) | en-GB      | 🇬🇧       | Inglés británico (Received Pronunciation)|
| Português (Brasil)       | pt-BR      | 🇧🇷       | Portugués brasileño                      |
| Français                 | fr-FR      | 🇫🇷       | Francés de Francia                       |
| Deutsch                  | de-DE      | 🇩🇪       | Alemán estándar                          |
| Italiano                 | it-IT      | 🇮🇹       | Italiano estándar                        |

(Se pueden añadir más voces si el navegador las soporta)

## Tecnologías utilizadas

- React 18 + Vite ⚡ (entorno de desarrollo ultrarrápido)
- Web Speech API (SpeechSynthesis) – motor TTS nativo del navegador
- Tailwind CSS o CSS vanilla (según tu implementación actual)
- Interfaz responsive y minimalista

## Cómo usarlo localmente

```bash
# 1. Clonar el repositorio
git clone https://github.com/MateoRiosdev/Free-TTS-VozCraft.git

# 2. Entrar a la carpeta
cd Free-TTS-VozCraft

# 3. Instalar dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev

Abre http://localhost:5173 (o el puerto que muestre Vite)
