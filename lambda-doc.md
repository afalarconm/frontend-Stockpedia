# Documentación de Implementación: Funciones Serverless en AWS con Serverless Framework

Esta guía ofrece una explicación detallada de los procedimientos para la creación y despliegue de funciones serverless en AWS mediante el uso del Serverless Framework. La implementación correcta permite un manejo eficiente y escalable de las aplicaciones sin preocuparse por la gestión del servidor subyacente.

## 1. Información General de la Implementación

- **Nombre de la Implementación:** Funciones Serverless en AWS
- **Eventos Desencadenantes:** Triggers HTTP, eventos programados, integraciones S3, entre otros.
- **Compatibilidad de Sistema Operativo:** Es independiente del sistema operativo porque es gestionado completamente en la nube.

## 2. Proceso de Implementación

### 2.1. Pre-requisitos

Antes de comenzar, prepare su entorno con lo siguiente:

1. *Instalación del Serverless Framework:* Asegúrese de tener instalado el [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/). Este marco de trabajo es fundamental para simplificar la creación, configuración y despliegue de aplicaciones serverless.

2. *Credenciales de AWS:* Configure sus credenciales de AWS para permitir el despliegue y la gestión de servicios en su cuenta AWS. Puede hacerlo mediante el [CLI de AWS](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html) o configurando directamente en el dashboard de Serverless.
   
#### 2.2. Paso 1: Inicializar un Nuevo Servicio Serverless

1. *Estructura del comando:* Use el comando `sls create` con opciones específicas para definir y crear su servicio:

    ```bash
    sls create -n ayudantia-serverless -t aws-python3
    ```
    

    - `-n` establece el nombre de su servicio.
    - `-t` selecciona la plantilla predefinida para utilizar, que en este contexto es Python 3 para AWS.

2. *Validación:* Después de ejecutar el comando, verifique que se haya creado una nueva carpeta con el nombre proporcionado, conteniendo archivos base del proyecto como `handler.py` y `serverless.yml`.

#### Paso 2: Desplegar el Servicio en AWS

1. *Preparación:* Antes de desplegar, asegúrese de que su `serverless.yml` esté configurado correctamente según los recursos que desea crear en AWS.

2. *Despliegue:*

    ```bash
    sls deploy --stage demo
    ```
    

    - `--stage` define el entorno de despliegue, permitiendo diferenciar entre ambientes como desarrollo, producción, etc.

3. *Confirmación:* Tras un despliegue exitoso, el CLI mostrará información sobre el servicio desplegado, incluyendo la URL de la función AWS Lambda recién creada.


### Implementación de Capas Personalizadas

Las capas personalizadas permiten compartir código y componentes entre varias funciones, facilitando la gestión y reduciendo redundancias.

#### Paso 1: Configuración del Entorno Virtual de Python

1. *Creación:*

    ``` bash
    python3 -m venv test_venv
    ```
    

2. *Activación:* Asegúrese de activar el entorno virtual para instalar dependencias de manera aislada.

    ```bash
    # Para sistemas basados en Unix
    source test_venv/bin/activate

    # Para Windows
    .\test_venv\Scripts\activate
    ```
    

3. *Verificación:* Confirme que su entorno virtual está activo comprobando la versión de Python.

    ```bash
    python --version
    ```
    

#### Paso 2: Manejo de Dependencias

1. *Organización de Archivos:* Es esencial que las dependencias se instalen en una estructura de directorio reconocible por AWS Lambda.

    ``` bash
    mkdir python
    ```
    

2. *Instalación de Paquetes:* Utilice `pip` para instalar las dependencias necesarias dentro del directorio creado.

    ``` bash
    pip install requests -t python
    ```
    

#### Paso 3: Preparación y Carga de la Capa Personalizada

1. *Creación de Archivo Zip:*

    ``` bash
    # En sistemas basados en Unix
    zip -r requests.zip python

    # En Windows
    powershell Compress-Archive python requests.zip
    ```

2. *Subida a AWS:*

    - Navegue al panel de Lambda en su consola de AWS y seleccione "Capas" en el menú lateral.
    - Elija "Crear capa" o "Agregar capa" y luego seleccione "Capa personalizada".
    - Suba el archivo zip y complete los detalles necesarios para crear la capa.

#### Paso 4: Asociación de la Capa a la Función Serverless

1. *Configuración de la Función:*

    - Desde el panel de funciones Lambda en AWS, seleccione su función.
    - Vaya a la sección de capas y seleccione "Agregar capa".
    - Elija la capa personalizada recién cargada y guarde los cambios.

2. *Validación:* Realice pruebas invocando la función para asegurarse de que la capa se integra correctamente y que la función opera como se espera.



## 3. Herramientas Implicadas

- **Serverless Framework:** Esta herramienta facilita la creación, configuración, y despliegue de aplicaciones serverless. [Serverless Framework](https://www.serverless.com/)
- **AWS CLI:** La interfaz de línea de comandos de Amazon Web Services permite administrar los servicios de AWS. [AWS CLI](https://aws.amazon.com/cli/)
- **Entornos Virtuales Python:** Los entornos virtuales en Python son fundamentales para gestionar dependencias y versiones de paquetes. [Documentación de Python venv](https://docs.python.org/3/library/venv.html)
- **AWS Lambda:** Servicio de AWS que ejecuta código en respuesta a eventos, gestionando automáticamente los recursos. [AWS Lambda](https://aws.amazon.com/lambda/)








