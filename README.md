# Prueba tecnica tokenizacion-cards

El proceso de tokenización funciona enviando los datos de la tarjeta al tokenizador, este valida y guarda la información en la BD encriptada y devuelve un ID (token) como llave del registro el cual puede ser usado luego en los distintos procesos de culqi.

## Tecnologías

node

typescript

serverlees

dynamodb

diversos plugins

aws-sdk, aws-lambda, middy y demas


---

linter

prettier

editorconfig


---

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

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/5c92560e-53d8-4c89-87e1-6f421bc0f4f6)


Nuevo token
![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/98d7ec2d-f7d5-4a38-99e4-1c5f84b59715)

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/bf27f73a-87d8-40a2-a499-43d488b9b6a4)

Obtener token

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/6c39f51e-a877-4ba8-8039-0991b5b8dcb4)


### Recursos en aws

Stack

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/d8850ac0-e107-480d-b88f-c7ad01db3d8f)

Apigateway
![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/a40486e6-86de-4bac-8c81-5ed7926e9984)

Functions (Lambdas)

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/06d524d7-443c-40f8-9460-1f1edf41e66b)


Tabla dynamo

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/d45d46d2-9dff-4834-857b-1d15f89ff4ac)


TTL

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/6d95669c-afd8-4ee4-9ebe-8d0a46e8bb11)

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/876b4078-b6b8-4a7a-bedc-885a55715475)

![image](https://github.com/paulgualambo/tokenization-cards/assets/2517404/0856b684-1129-4de3-8afd-39e86879d465)


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
        "id": "{nuevo_id_generado}"
    },    
```    
