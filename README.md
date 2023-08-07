# Prueba tecnica tokenizacion-cards

El proceso de tokenización funciona enviando los datos de la tarjeta al tokenizador, este valida y guarda la información en la BD encriptada y devuelve un ID (token) como llave del registro el cual puede ser usado luego en los distintos procesos de culqi.

## Tecnologías

node
typescript
serverlees
dynamodb
diversos plugins
aws-sdk, aws-lambda, middy y demas

linter
prettier
editorconfig

Thunder Client (apis)

## Requerimientos

Tener una un access key y secret key a aws, para el despliegue de los lambda
configurarlo en la maquina host con aws-cli
```sh
aws configure
```


```
npm install -g serverless # Herramienta de despliegue a aws
npm install #instalar los paquetes
```

## Estructura

src : se ubica los metodos lambda    
    addToken
    getToken

middleware : se ubica el validador pk del Header su valor actual es de: 

```
pk_test_AuEbMkLpwuizSfafqCxxTrYndcPMyd
```

persistence
    dynamodb

## Ejecución

Despues de configurar el aws-cli, hay dos modo de ejecución uno desde aws y otro de manera local
Desde aws se despliega con 
```
 npm run build

 serverless deploy 
```
Esto creara el stack, que posee las funciones y la tabla dynamo donde se almacena

## Evidencia

### Thunder Client
Health

Nuevo token

pk se envia tambien

Obtener token

Recursos en aws
Stack

Functions

Tabla dynamo

TTL


Ejecución local

Agregar un nuevo token
```
serverless invoke local --function addToken --path data-test/data2.json
```

Consultar 
```
serverless invoke local --function getToken --path data-test/dataGet.json
```
pero antes editar la linea 39 al 41 con un nuevo id 

```
    "pathParameters": {
        "id": "ef4f22f4-b29e-47c3-a263-a123864e4f87"
    },    
```    
