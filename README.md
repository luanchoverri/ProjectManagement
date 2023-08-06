# Front-end's Bootcamp

Este proyecto sirve como base para poder implementar las funcionalidades requeridas en el Bootcamp de Front-end. Se provee una estructura inicial de un proyecto de front-end [Angular](https://angular.io) con bibliotecas auxiliares para temas como traducciones, layout, etc.

El proyecto fue creado con [Angular CLI](https://www.npmjs.com/package/@angular/cli#usage). Se recomienda utilizar los comandos de esta herramienta para la creación de los distintos building blocks de Angular.

## Angular

[Angular](https://angular.io/guide/what-is-angular) es un framework de diseño de aplicaciones y una plataforma de desarrollo para construir single-page applications (SPA) construido con [TypeScript](https://www.typescriptlang.org/).

Angular hace uso de distintas bibliotecas como [rxJS](https://rxjs.dev/guide/overview) y provee una guía de cómo codear dentro de la plataforma en [coding style guide](https://angular.io/guide/styleguide).

### UX/UI

Se utiliza [Angular Material](https://material.angular.io) como biblioteca de componentes que implementa la especificación de [Material Design](https://material.io/design) para el desarrollo de interfaces de usuario. Dichos componentes pueden explorarse y observar el modo de uso desde [acá](https://material.angular.io/components/categories)

### Layout

El layout puede ser definido con `css` tradicional, pero se recomienda utilizar la biblioteca [angular-flex-layout](https://github.com/angular/flex-layout) incluida en el proyecto. Esta ofrece un conjunto de directivas de Angular para alinear el contenido visual.

### Theming

En la carpeta `assets/styles` se ubican los archivos de estilos de la aplicación. En el archivo `theme.scss` se encuentra la configuración de [temas de Angular Material](https://material.angular.io/guide/theming)
### Traducciones

Las traducciones se encuentran implementadas por medio de [ngx-translate](https://github.com/ngx-translate/core).

Los archivos de traducciones están organizados dentro de la carpeta `i18n` como archivos `json`, uno por cada lenguaje que se quiere traducir, con el siguiente formato:

```json
{
    "nombre-modulo": {
       "nombre-submodulo/componente/pantalla": 
	   {
         "NOMBRE_IDENTIFICADOR_TEXTO": "Texto"
       }
    }
}
```

### Módulos

La aplicación está compuesta por distintos módulos que se pueden agrupar en módulos de infraestructura y del dominio.

Los módulos de infraestructura son utilizados por los del dominio para poder implementar la funcionalidad requerida por el usuario. Proveen acceso al API REST, componentes y funcionalidad de uso común.

1. `api-rest`: permite acceder a los Endpoints que expone el API REST. Los servicios expuestos y sus métodos mantienen el mismo nombre que los Controllers en el backend para permitir una búsqueda rápida.
3. `material`: declara y permite acceder a los componentes de [Material](https://material.angular.io/). Para cada nuevo desarrollo de componentes visuales se deberá evaluar resolver en primera instancia con lo ofrecido por *Material* antes de aplicar un desarrollo custom o inclusión de nuevas librerías. Este módulo será importado y exportado por el módulo `core`
4. `presentation`: contiene los componentes visuales, sin funcionalidad especifica relacionada al dominio.
5. `core`: contiene funcionalidad central y reutilizable, como por ejemplo Guards, Directivas, Servicios, etc.

El resto de los módulos corresponden al dominio, como por ejemplo camas, historia-clinica, pacientes, etc.
La estructura de estos módulos está formada por una división en carpetas que debe seguir la siguiente definición:

1. `routes`: siempre requerido, corresponde a los componentes directamente relacionados con cada pagina de la aplicación a la que le
   corresponde una ruta (url) particular.
2. `components`: depende del reuso y/o modularización dentro del propio módulo, son utilizados por los componentes de *routes*.
3. `services`: Estarán presentes dependiendo si es necesario encapsular logica de una funcionalidad en otro archivo o bien para realizar 
   una comunicacion entre componentes.

##### Idioma
El código debe estar por defecto escrito en idioma inglés, tener en cuenta principalmente nombres de clases, metodos y variables. Pueden existir excepciones en caso que algun nombre o denominación esté intrinsecamente relacionado con el dominio del sistema.
Todo texto que será de visibilidad al cliente (principalmente los que se ubiquen en los archivos de extensión html) deberá utilizar archivos de traduccion para ser mostrados en el idioma requerido por el cliente, en este caso español.
Los nombres de módulos, por lo general correspondientes al dominio del sistema, se definen en español. 

