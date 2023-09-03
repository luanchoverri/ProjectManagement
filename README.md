

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



