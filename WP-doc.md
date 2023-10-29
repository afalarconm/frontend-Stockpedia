# Documentación de Integración: WebPay

Esta guía proporciona una descripción detallada de los procedimientos para la integración con WebPay, asegurando una plataforma de pago en línea robusta y segura. Implementar esta integración permite el procesamiento eficiente de transacciones en su sitio web.

## 1. Información General de la Integración

- *Nombre de la Integración:* WebPay
- *Eventos Desencadenantes:* Inicio de transacciones de pago por los usuarios.
- *Compatibilidad de Sistema Operativo:* Adaptable a diversos sistemas operativos.

## 2. Proceso de Integración

### 2.1. Creación de Cuenta en WebPay

El proceso se inicia registrándose en WebPay para adquirir una cuenta de comerciante oficial.

### 2.2. Implementación del SDK de WebPay

Instalación del SDK de Transbank utilizando npm con el siguiente comando:

```bash
npm install transbank-sdk
`````
### 2.3. Procesamiento de Pagos: Flujo de Operación Exitosa

El flujo operativo para el procesamiento exitoso de una transacción a través de WebPay se compone de los siguientes pasos:

1. El cliente selecciona la stock que quiere comprar paga con WebPay.
2. WebPay procesa esta solicitud, proporcionando un token de transacción y una URL de redirección.
3. El servidor redirecciona al cliente hacia WebPay, utilizando el token de transacción.
4. El navegador del cliente solicita conexión segura a WebPay, siguiendo la redirección prevista.
5. WebPay presenta al cliente su formulario de pago.
6. El cliente completa los detalles de su tarjeta y confirma el pago.
7. WebPay maneja la solicitud de autorización, realizando primero la autenticación bancaria y luego la confirmación de la transacción.
8. Con la autorización confirmada, WebPay redirige al cliente de vuelta al sitio del comerciante, proporcionando el token de transacción.
9. El navegador del cliente sigue esta redirección hacia el sitio del comerciante.
10. El comerciante recibe el token y solicita la confirmación final y los resultados de la transacción.
11. El comerciante presenta al cliente un comprobante digital de la transacción.

### 2.4. Resumen de Escenarios de Flujo

Se detallan los escenarios posibles y las respuestas correspondientes en la integración con WebPay:

- *Flujo Estándar o de operacion exitosa:* Se recibe el token de la transacción, independientemente del éxito o fallo de esta.
- *Expiración de Tiempo:* Si transcurren más de 10 minutos, se reciben identificadores específicos, pero no el token de la transacción.
- *Aborto de Pago:* Si se cancela la operación, se recibe una serie de datos incluyendo el TBK_TOKEN.
- *Error en Formulario de Pago:* En caso de fallos y el cliente opta por regresar al sitio, se envían múltiples parámetros incluyendo token_ws.

### 2.5. Fase de Pruebas

Es crucial realizar pruebas utilizando las tarjetas de prueba proporcionadas por Transbank, cubriendo varios escenarios como transacciones aprobadas, rechazadas, y expiracion de tiempo.


## 3. Herramientas Implicadas

- *npm:* Este gestor de paquetes para JavaScript es esencial para instalar el SDK de Transbank y otras dependencias relevantes. [https://www.npmjs.com/](#)
- *SDK de Transbank:* Kit de herramientas proporcionado por Transbank para simplificar el proceso de integración con WebPay. [https://www.transbankdevelopers.cl/documentacion/webpay-plus#resumen-de-flujos](#)
- *Portal de Tarjetas de Prueba de WebPay:* Proporciona informacion necesaria para evaluar los flujos. [https://www.transbankdevelopers.cl/documentacion/como_empezar#tarjetas-de-prueba](#)