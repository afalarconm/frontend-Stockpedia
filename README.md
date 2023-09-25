# 2023-2 / IIC2173 - E1 | PPE Fintech Async

## Nombres: Federico Alarcón, Sofía Giagnoni, Lucas Irarrázaval, Benito Palacios y Vicente Thomas.

## Links de repositorios:

- Link del repositorio de frontend: https://github.com/afalarconm/frontend-Stockpedia 
- Link del repositorio de backend: https://github.com/vicentethomas/Arquisis-G27-Backend

## Instrucciones de uso:

Para correr frontend local se deben ejecutar los comandos:

- npm install
- npm run start (se abrirá automáticamente el link de frontend)

Para correr backend local se deben ejecutar los comandos:

- npm install
- npm run start
- docker compose build
- docker compose up

Para validar las instancias de AWS:

- En EC2 se encuentra montado el servidor. 
- En S3 se encuentra montado el cliente con Cloudfront.

Las credenciales para entrar a AWS serán enviadas por el canal de slack, el archivo .pem y el .env también en una carpeta .zip llamada e1-grupo27-credentials-2023-2-arquisis

El dominio es https://stockpedia.me y se pueden observar los puertos en donde se encuentran montados con docker los containers del backend:

- El cliente mqtt se encuentra montado en el puerto 9000.
- La base de datos se encuentra montada en el puerto 5432.
- La API se encuentra montada en el puerto 3000.

La dirección IP es PONER IP. 

Observación: al activar la consola de desarrollador en el navegador funciona toda la lógica perfecto. Sin embargo, aparece un error 500 de internal server error porque el home, sobre nosotros y contáctenos de la navbar requiere que el usuario esté loggeado para navegar por esas secciones. De igual forma se retorna el frontend y la lógica por lo que si uno la testea funciona bien. 

Los pasos necesarios para replicar el pipe CI que usamos son:
1. 
2. 
3. 

**Nota: a continuación se muestra con :white_check_mark: los requisitos que fueron implementados, y con una :x: los que no lo fueron.**

### Requisitos funcionales (15p)

* **RF01: (2p)** ***Esencial*** :white_check_mark: Sus usuarios deben poder registrarse en la plataforma con datos de contacto y un correo electrónico, además de poder ingresar dinero a una billetera virtual personal.

* **RF02: (2p)** :white_check_mark: Los usuarios deben poder ver una lista de las empresas disponibles en el servidor por orden de llegada.

* **RF03: (2p)** ***Esencial*** :white_check_mark: Debe poder verse el detalle histórico de cada empresa de forma paginada y dar la opción de compra.

* **RF04: (2p)** :white_check_mark: Deben obtener la ubicación desde donde el usuario hizo la compra desde su dirección IP. Para esto pueden usar ChatGPT para apoyarse.

* **RF05: (2p)** :white_check_mark: Deben poder mostrarle a su usuario las acciones compradas y si su solicitud se completó correctamente.

* **Bonus: de 2 décimas** :white_check_mark: si muestran un gráfico con los datos históricos de la última semana indicando la variación de precios por hora. 

* **RF06: (2p)** ***Esencial*** :white_check_mark: Al comprar una entrada se deberá enviar la solicitud por el canal stocks/requests y esperar la respuesta de si es válida por el canal stocks/validation.

* **RF07: (3p)** ***Esencial*** :white_check_mark: Deberán estar escuchando los canales de stocks/requests y stocks/validation continuamente para ir actualizando su cantidad de entradas disponibles.

### Requisitos no funcionales (39p)

* **RNF01: (6p) :white_check_mark:** ***Esencial*** Deben usar un formato de Backend-Frontend separado: una API con respuestas JSON y un frontend. Esto es muy importante puesto que es crítico para las siguientes entregas. El Frontend debe ser ojalá una SPA con un Framework que permita exportar el build de su frontend, como React o Vue.

* **RNF02: (2p) :white_check_mark:** ***Esencial*** Sus aplicaciones en backend deben estar cada una en un contenedor Docker distinto. Debe coordinarse el levantamiento mediante docker compose.

* **RNF03: (2p) :white_check_mark:** ***Esencial*** Deben tener configuradas Budget alerts en la cuenta que ocupen como grupo, para no alejarse del Free tier de AWS y que se den cuenta si les cobran para que cierren esos servicios.

* **RNF04: (6p) :white_check_mark:** ***Esencial*** Su API debe estar detrás de una AWS API gateway tipo REST o HTTP, con los endpoints declarados en esta. Debe asociarse un subdominio a esta (e.g. api.miapp.com) y debe tener CORS correctamente configurado.

* **RNF05: (3p) :white_check_mark:** ***Esencial*** Su app debe ofrecer su backend y frontend utilizando HTTPS.

* **RNF06: (6p) :white_check_mark:** ***Esencial***  Deben implementar un servicio de autenticacion/autorización (auth). Este servicio puede ser en base a un servicio de terceros como Auth0 (recomendado), cognito o pueden hacerlo ustedes. Este RNF requiere que ustedes extraigan toda la lógica de los usuarios de la app principal y la trasladen a el servicio hecho por ustedes o el externo. Se usó Auth0.

* **RNF07: (3p) :white_check_mark:** Su frontend debe estar desplegado en S3 con una distribución Cloudfront.

* **RNF08: (3p) :white_check_mark:** Su API Gateway debe poder usar al servicio del RNF05 para autenticar a los usuarios directamente, es decir que antes de enviar la request a su API, API Gateway verifica que el token sea correcto. Dentro de API Gateway deben crearle un Custom Authorizer su usan tipo REST para poder autenticar sus requests previos a mandarlos a su API.

* **RNF09: (8p) :white_check_mark:** Deben implementar un pipeline de CI. Como proveedores aceptados están CircleCI, Github Actions y AWS codebuild. Recomendamos los dos primeros porque los ayudantes tienen experiencia en estos dos. Esta implementación debe correr un linter que revise su código.

- * **Bonus: de 3 puntos** :white_check_mark: Implementar un build simple que resuelva un test trivial que pueda fallar solo para el backend (tipo assert false o similar).
- * **Bonus: de 3 puntos** :x: Implementar un pipeline CI para su frontend que revise con un linter su aplicación y haga uso de revisiones de performance de lighthouse.

### Documentación (6p)

* **RDOC01: (3p) :white_check_mark:** Deben crear un diagrama UML de componentes de la entrega, con explicaciones y detalle sobre el sistema. Esto deben tenerlo para la fecha final de entrega.

* **RDOC02: (2p)  :white_check_mark:** Deben documentar los pasos necesarios para replicar el pipe CI que usaron en su aplicación (Qué pasos sigue si CI).

* **RDOC03: (1p) :white_check_mark:** Deben dejar una documentación de alguna forma de correr su aplicación en un ambiente local para propósitos de testeo (que instalar, que poner en el .env, como correr la app, etc).
