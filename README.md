# 2023-2 / IIC2173 | PPE Fintech Async

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
