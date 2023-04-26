# Landrusco App

Match blood results with reported results

## Getting Started

Instalar neutralino y configurarlo para el proyecto en base a `neutralino.config.json`.

```javascript

//Instalar neutralino CLI
> npm install -g @neutralinojs/neu

//Descargar binarios y actualizar elementos
> neu update
```

Instalar dependencias y lanzar build del frontend

```javascript
//Instalar dependencias react
> npm run install-view


//Crear build de la vista
> npm run buildview
```

Instalar dependencias extension

```javascript
> npm run install-extsample
```

Ejecutar el proyecto

```javascript
//Arrancar el frontend en una terminal
> npm run view

//Arrancar la app en otra terminal
> npm run window
// o para modo server
> npm run cloud
```

Aquí se pueden ver todos los comandos disponibles en el neutralino **CLI**: **[Referencia comandos Neutralino](https://neutralino.js.org/docs/cli/neu-cli)**

## Estructura directorios

```
|-- extensions: Extensiones con código nativo que comunican con el frontend mediante Websockets.
|-- frontend
    |-- components: Componentes personalizados para incluir en el proyecto
    |-- integration: Integración con diferentes elementos externos.
    |-- providers: Custom providers para funcionalidades como useDatabase, etc.
    |-- views: Componentes con, únicamente, aspectos visuales

```

## Backend Extensions

Como backend se crearán una serie de extensiones, por ejemplo: `extensions/extsample` las cuales se comunican con la aplicación a través de websockets. Estos backend se encargan de la ejecución de código nativo personalizado.

Desde el frontend usa de la siguiente forma:

```javascript
const { data, error, doCall } = useBackend("extensionname", "method.custom.name");
```

El método `doCall` puede recibir un objeto con parámetros que serán enviados al backend:

```javascript
doCall({ param: "foo", param2: "bar" });
```

Esta llamada actualizará los valores existentes en la propiedad exportada por el provider `data`. En caso de existir algún error se actualizará la propiedad `error`.

> El método `doCall` también retorna una promise con la respuesta y lanzará una excepción en caso de error por si se quiere controlar de esa forma.

### Creación de nuevos métodos

El backend dispone de una variable en el archivo `index.js` llamada `wsmethods` la cual se encarga de definir el mapa de métodos que pueden ser llamados desde el frontend.

```javascript
const wsmethods = {
    "db.connection.status": SampleController.sample,
    "api.test.findAll": test.findAll,
    //TODO add controller methods
};
```

Este mapa tiene como `clave` el nombre que será utilizado para referenciarlo y como `valor` el método a ejecutar.

Los métodos han de retornar un objeto (`{}`) en forma de `Promise`(async/await) con las propiedades que se desee enviar al frontend de vuelta una vez terminado.

Ejemplo implementación:

```javascript
module.exports.dosomething = async (params) => {
    const result = await heavywork(params);
    return {
        result: result,
    };
};
```

### Debug del backend

Dentro del `launch.json` de vscode existe ya un perfil de debug para el backend. Este se conecta a la aplicación principal y permite, desde vscode, poner puntos de interrupción.

El modo debug del backend sobreescribe al proceso normal (sin debug) con lo que si se cierra, la aplicación perderá la capacidad de conectarse al mismo. (Será necesario reiniciarla para volver a la normalidad)
