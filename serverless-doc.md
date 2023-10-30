# Documentación de Implementación: Funciones Serverless en AWS con Serverless Framework

## Proceso de Implementación

### Pre-requisitos

Antes de comenzar, prepare su entorno con lo siguiente:

1. *Instalación del Serverless Framework:* Asegúrese de tener instalado el [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/).
2. *Credenciales de AWS:* Configure sus credenciales de AWS para permitir el despliegue y la gestión de servicios en su cuenta AWS.

#### Paso 1: Inicializar un Nuevo Servicio Serverless

1. *Estructura del comando:* Use el comando `sls create` con opciones específicas para definir y crear su servicio:

    ```bash
    sls create -n servicio-serverless -t aws-python3
    ```

2. *Validación:* Después de ejecutar el comando, verifique que se haya creado una nueva carpeta con el nombre proporcionado, conteniendo archivos base del proyecto como `handler.py` y `serverless.yml`.

#### Paso 2: Desplegar el Servicio en AWS

1. *Preparación:* Antes de desplegar, asegúrese de que su `serverless.yml` esté configurado correctamente según los recursos que desea crear en AWS.

2. *Despliegue:*

    ```bash
    sls deploy --stage demo
    ```
    
3. *Confirmación:* Tras un despliegue exitoso, el CLI mostrará información sobre el servicio desplegado, incluyendo la URL de la función AWS Lambda recién creada.

### Implementación de Funciones Lambda

#### Paso 1: Creación de un archivo python

1. *Creación:*

    ```bash
    touch function.py
    ```

2. *Implementación:* Escriba el código de su función en el archivo creado.


3. *Instalación de Dependencias:* Si su función requiere dependencias, asegúrese de instalarlas en un entorno virtual de Python. Esto es fundamental para que AWS Lambda pueda reconocer los paquetes instalados.

    ```bash
    python3 -m venv test_venv
    source test_venv/bin/activate
    pip install requests -t python
    ```

4. *Creación de Archivo Zip:* Cree un archivo zip con el contenido del directorio `python` y el archivo `function.py`.

    ```bash
    zip -r function.zip python function.py
    ```

#### Paso 2: Despliegue de la Función en AWS

1. *Preparación:* Asegúrese de que su `serverless.yml` esté configurado correctamente según los recursos que desea crear en AWS.

2. *Despliegue:*

    ```bash
    sls deploy function --stage demo
    ```

3. *Confirmación:* Tras un despliegue exitoso, el CLI mostrará información sobre la función desplegada, incluyendo la URL de la función AWS Lambda recién creada.



### Implementación de Capas Personalizadas

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








