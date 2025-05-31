# Proyecto Ionic + Supabase - Gestión de Usuarios y Subida de Archivos

## Descripción

Esta aplicación utiliza Ionic con componentes standalone y Supabase para autenticar usuarios (registro e inicio de sesión) y permitir la subida, listado y visualización de archivos en un bucket privado de Supabase Storage.

---

## Funcionalidades

- **Autenticación:** Registro y login de usuarios con validación.
- **Carga de archivos:** Subida de archivos (imágenes) al bucket privado de Supabase.
- **Listado de archivos:** Visualización de las imágenes subidas.
- **Políticas RLS en Supabase:** Control de acceso mediante políticas de seguridad a nivel fila, asegurando que cada usuario solo acceda a sus propios archivos.

---

## Estructura de carpetas

- `/home`  
  Contiene el componente para login y registro de usuarios.

- `/file-uploader`  
  Contiene el componente para subir y listar archivos.

---

## Configuración de Supabase

### Storage

- Bucket: `archivos` (privado)
- Archivos almacenados en carpetas separadas por el `auth.uid()` del usuario.

### Políticas de seguridad (RLS)

Se crearon las siguientes políticas para el bucket `archivos`:

- **SELECT**  
  ```sql
  bucket_id = 'archivos' AND starts_with(path, auth.uid() || '/')
  ```

- **INSERT**  
  ```sql
  bucket_id = 'archivos' AND starts_with(path, auth.uid() || '/')
  ```

- **UPDATE**  
  ```sql
  bucket_id = 'archivos' AND starts_with(path, auth.uid() || '/')
  ```

- **DELETE**  
  ```sql
  bucket_id = 'archivos' AND starts_with(path, auth.uid() || '/')
  ```
![image](https://github.com/user-attachments/assets/87f0c08c-e9d8-4deb-b531-1ba10631f16c)


---

## Uso

1. Clona el repositorio.
2. Instala dependencias con `npm install`.
3. Configura tu `supabaseClient.ts` con tus credenciales Supabase.
4. Ejecuta la app con `ionic serve`.
5. Regístrate o inicia sesión.
6. Sube imágenes desde la sección de carga de archivos.
7. Visualiza tus archivos subidos.

---

## Capturas de pantalla sugeridas para incluir

- Pantalla de login/registro.
<img width="959" alt="Registro" src="https://github.com/user-attachments/assets/cc0d12e9-2ae9-459b-b7c7-9c00d816c5dc" />

<img width="959" alt="Login" src="https://github.com/user-attachments/assets/ca84781e-fd13-425e-824f-1dbfc99c23df" />
<img width="964" alt="Authenticahor email" src="https://github.com/user-attachments/assets/bfd27081-d568-494a-8d63-943dc16f015e" />

  
- Pantalla principal con opción para subir archivos.
![image](https://github.com/user-attachments/assets/afae74a2-2919-4fa8-b26a-64def9f211fe)


- Ejemplo de selección y subida de archivo.
<img width="959" alt="UpdateArchivos" src="https://github.com/user-attachments/assets/752a2775-761f-4222-a21f-b4c85854b13b" />

<img width="964" alt="SupabaseSubidaArchivos" src="https://github.com/user-attachments/assets/4439961b-f047-4c17-91f3-271951251e3b" />


- Listado de archivos cargados mostrando las imágenes.
<img width="964" alt="Subida de Archivos" src="https://github.com/user-attachments/assets/de1cd0dd-8ef6-4bb9-8354-c7ea4c85716c" />


---

## DE:

Isaac Quinapallo - Desarrollador de Software  

---
