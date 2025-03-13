# Aplicación de Quiz y Tareas

## Descripción

La Aplicación de Quiz y Tareas es una aplicación web que combina una plataforma de cuestionarios con una lista de tareas. Los usuarios pueden gestionar sus tareas y realizar cuestionarios para expandir su conocimiento.

## Características

- Autenticación de usuario (inicio de sesión y registro)
- Gestión de tareas (agregar, editar, eliminar, completar tareas)
- Gestión de categorías para tareas
- Plataforma de cuestionarios
- Diseño responsivo

## Tecnologías Utilizadas

- React
- React Router
- Bootstrap
- SweetAlert2
- JSON Server (para backend simulado)
- Vite (para desarrollo y compilación)

## Instrucciones de Configuración

1. Clona el repositorio:
    ```sh
    git clone https://github.com/your-username/quiz-to-do.git
    cd quiz-to-do
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Inicia el JSON Server:
    ```sh
    json-server --watch db.json --port 3001
    ```

4. Inicia el servidor de desarrollo:
    ```sh
    npm run dev
    ```

5. Abre tu navegador y navega a `http://localhost:5173`.

## Uso

- Registra una nueva cuenta o inicia sesión con una cuenta existente.
- Agrega, edita, elimina y completa tareas.
- Asigna categorías a las tareas.
- Realiza cuestionarios para probar tu conocimiento.

## Estructura del Proyecto

- `src/components`: Contiene componentes de React.
- `src/pages`: Contiene componentes de página.
- `src/services`: Contiene archivos de servicio para llamadas API.
- `src/styles`: Contiene archivos CSS para el estilo.
- `src/routes`: Contiene la configuración de rutas.
- `db.json`: Datos simulados del backend.
