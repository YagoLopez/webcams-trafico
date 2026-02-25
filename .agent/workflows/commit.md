---
description: Realizar un commit de los cambios actuales siguiendo la convención de Semantic Commits.
---

# Workflow: Semantic Commit

**Objetivo:** Automatizar el proceso de staging y commit de los cambios actuales en la rama activa, asegurando que el mensaje de commit cumpla con la convención de [Semantic Commits](https://www.conventionalcommits.org/).

**Instrucciones paso a paso para el Agente:**

1. **Estado del Repositorio:** Ejecuta `git status` para identificar los archivos modificados, nuevos o eliminados.

2. **Preparar Cambios (Staging):** 
   - Ejecuta `git add .` para incluir todos los cambios actuales. 
   - Si el usuario especificó archivos específicos en su solicitud inicial, añade solo esos archivos.

3. **Analizar Diferencias:** Ejecuta `git diff --cached` para analizar el contenido de los cambios preparados.

4. **Generar Mensaje Semantic Commit:** Basándote en el análisis del paso anterior, genera un mensaje siguiendo la estructura: `<tipo>(<alcance>): <descripción>`
   - **Tipos comunes:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`.
   - **Alcance (opcional):** Identifica el componente o área afectada (ej: `ui`, `api`, `auth`).
   - **Descripción:** Una explicación concisa en imperativo y en minúsculas.
   - *Ejemplo: `feat(ui): add filter button to drawer header`*

5. **Ejecutar Commit:** Ejecuta `git commit -m "<mensaje_generado>"`.

6. **Confirmación:** Muestra al usuario el mensaje de commit utilizado y un resumen de los archivos committeados.

7. **Opcional (Punto de Decisión):** Pregunta al usuario si desea realizar un `git push` de la rama actual.
