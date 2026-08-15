# Manual de Usuario — Panel de Administración Mobaz

Este manual explica cómo usar el panel de administración del sitio web de Mobaz para gestionar los proyectos que se muestran en el Portafolio.

- **URL del panel:** https://mobazcr.com/admin
- **Quién lo usa:** cualquier persona del equipo con una cuenta de administrador.

---

## Índice

1. [Ingresar al panel](#1-ingresar-al-panel)
2. [¿Olvidaste tu contraseña?](#2-olvidaste-tu-contraseña)
3. [Vista general del panel](#3-vista-general-del-panel)
4. [Crear un proyecto nuevo](#4-crear-un-proyecto-nuevo)
5. [Editar un proyecto existente](#5-editar-un-proyecto-existente)
6. [Ver las fotos de un proyecto](#6-ver-las-fotos-de-un-proyecto)
7. [Eliminar un proyecto](#7-eliminar-un-proyecto)
8. [Cerrar sesión](#8-cerrar-sesión)
9. [Preguntas frecuentes](#9-preguntas-frecuentes)
10. [Buenas prácticas de seguridad](#10-buenas-prácticas-de-seguridad)

---

## 1. Ingresar al panel

1. Andá a **https://mobazcr.com/admin**.
2. Ingresá tu **correo electrónico** y **contraseña**.
3. Hacé clic en **Ingresar**.

Si el correo o la contraseña son incorrectos, el panel muestra el mensaje *"Correo o contraseña incorrectos"*. Después de varios intentos fallidos seguidos, el sistema bloquea intentos adicionales por un tiempo corto (protección contra ataques de fuerza bruta) y muestra un aviso indicando cuánto hay que esperar.

> **Primera vez que se usa el panel:** si nunca se configuró una cuenta de administrador, en vez del login aparece una pantalla de **"Crear cuenta de administrador"** donde se define el correo y la contraseña inicial (mínimo 8 caracteres). Esta pantalla solo aparece una vez.

---

## 2. ¿Olvidaste tu contraseña?

1. En la pantalla de login, hacé clic en **¿Olvidaste tu contraseña?**.
2. Escribí tu correo electrónico y hacé clic en **Enviar link de recuperación**.
3. Vas a recibir un correo con un link para crear una nueva contraseña (revisá la carpeta de spam si no llega enseguida).
4. Al abrir el link, se te va a pedir una contraseña nueva. Una vez guardada, ya podés volver a entrar con esa contraseña.

### Si el usuario administrador ya no existe

Si alguien eliminó la cuenta de administrador desde Supabase y por eso el login no funciona más:

1. Intentá ingresar con cualquier dato (esto va a fallar).
2. Después del **segundo intento fallido**, va a aparecer un botón que dice **"¿Eliminaste el usuario desde Supabase?"** con la opción **Crear cuenta nueva**.
3. Al hacer clic ahí (con confirmación), el panel vuelve a la pantalla de primera configuración para crear una cuenta de administrador desde cero.

---

## 3. Vista general del panel

Al ingresar, el panel muestra:

- **Barra superior:** logo de Mobaz, enlace **Ver sitio** (abre la página pública en una pestaña nueva) y **Cerrar sesión**.
- **Resumen de proyectos:** un bloque grande con el total de proyectos, y cuatro tarjetas más pequeñas con la cantidad de proyectos por categoría (Residencial, Comercial, Apartamentos, Remodelación).
- **Listado de proyectos:** todas las tarjetas de proyectos existentes, ordenadas por más reciente primero. Cada tarjeta muestra: foto principal, categoría, cantidad de fotos, nombre, ubicación, descripción y los botones **Editar** / **Eliminar**.

Estos son los mismos proyectos que se ven públicamente en la sección **Portafolio** del sitio web.

---

## 4. Crear un proyecto nuevo

1. Hacé clic en el botón rojo **+ Nuevo proyecto** (arriba a la derecha del listado).
2. Completá el formulario:
   - **Nombre del proyecto*** — ej. "Residencial Los Robles".
   - **Ubicación*** — ej. "San José, Costa Rica".
   - **Categoría*** — elegí una: Residencial, Comercial, Apartamentos o Remodelación.
   - **Descripción*** — un texto breve sobre el proyecto (se muestra en el portafolio público y en el modal de detalle).
   - **Fotos del proyecto** — hacé clic en el recuadro punteado **"Clic para subir fotos"** y elegí una o varias imágenes (JPG, PNG, WEBP o SVG). La primera foto que se suba queda como la foto principal de la tarjeta.
3. Hacé clic en **Guardar proyecto**.

Mientras las fotos se suben, el botón muestra **"Subiendo fotos..."** — esperá a que termine sin cerrar la pestaña. Al finalizar, el proyecto nuevo aparece de inmediato en el listado y en el sitio público.

Los campos marcados con **\*** son obligatorios.

---

## 5. Editar un proyecto existente

1. Buscá el proyecto en el listado y hacé clic en **Editar**.
2. El formulario se abre con los datos actuales ya cargados (nombre, ubicación, categoría, descripción y fotos existentes).
3. Modificá lo que necesites:
   - Para **quitar una foto actual**, pasá el mouse sobre ella y hacé clic en la **✕** que aparece en la esquina.
   - Para **agregar fotos nuevas**, usá el mismo recuadro de subida ("Agregar más fotos"). Las fotos nuevas se marcan con la etiqueta **NUEVA** hasta que se guarden.
4. Hacé clic en **Guardar cambios**.
5. Para salir sin guardar, hacé clic en **Cancelar** o en la **✕** de la esquina superior del formulario.

---

## 6. Ver las fotos de un proyecto

Desde el listado, hacé clic sobre la **foto principal** de cualquier tarjeta. Se abre un visor de imágenes en pantalla completa donde podés:

- Pasar a la foto siguiente/anterior con las flechas laterales.
- Ver los puntos de posición abajo (indican cuántas fotos tiene el proyecto y en cuál estás).
- Cerrar el visor con la **✕** o haciendo clic fuera de la imagen.

Este visor es solo para revisar las fotos — para editarlas o quitarlas hay que usar **Editar** (ver sección 5).

---

## 7. Eliminar un proyecto

1. En la tarjeta del proyecto, hacé clic en **Eliminar**.
2. Confirmá la acción en el mensaje de aviso que aparece.

> ⚠️ **Esta acción no se puede deshacer.** El proyecto desaparece inmediatamente del panel y del sitio público. Si tenés dudas, es mejor editar el proyecto en vez de eliminarlo y volver a crearlo.

---

## 8. Cerrar sesión

Hacé clic en **Cerrar sesión** (arriba a la derecha) cuando termines de usar el panel, especialmente si usás una computadora compartida.

---

## 9. Preguntas frecuentes

**¿Puedo usar el panel desde el celular?**
Sí, el panel es responsive y funciona en el navegador del celular, aunque para subir muchas fotos es más cómodo desde una computadora.

**Subí una foto y no aparece en el sitio público.**
Verificá que hayas hecho clic en **Guardar proyecto** / **Guardar cambios** después de subir la foto — subir la imagen sola no guarda el proyecto todavía.

**¿Qué formatos de imagen puedo subir?**
JPG, PNG, WEBP y SVG. Se pueden seleccionar varios archivos a la vez.

**Me equivoqué de categoría al crear un proyecto.**
Entrá a **Editar** el proyecto y cambiá el campo Categoría, después guardá los cambios.

**El botón "Guardar proyecto" no hace nada / da error.**
Puede deberse a que la sesión expiró. Cerrá sesión, volvé a ingresar y probá de nuevo. Si el problema sigue, avisá al equipo técnico.

**¿Los cambios se ven al instante en la página pública?**
Sí, el portafolio público lee la misma base de datos que usa el panel, así que los cambios (crear, editar, eliminar) se reflejan de inmediato al recargar la página del sitio.

---

## 10. Buenas prácticas de seguridad

- No compartas tu correo y contraseña del panel por mensajes de texto, WhatsApp o correo sin cifrar.
- Si sospechás que alguien más tiene tu contraseña, cambiala desde **¿Olvidaste tu contraseña?**.
- Cerrá sesión al terminar, sobre todo en computadoras compartidas o públicas.
- Solo las personas que realmente necesitan subir o editar proyectos deberían tener acceso a esta cuenta.
