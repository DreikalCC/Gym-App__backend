# Around the U.S. Back End

En este proyecto continuamos la programación Back-End y creamos una base de datos con la ayuda de mongoDB.
En la base de datos se crean y almacenan usuarios y tarjetas
Al no tener el Front-End integrado, se utilizó Thunder Client para hacer solicitudes al servidor y corroborar que el codigo entrega los datos solicitados.

## Directories

`/models` — contiene los modelos de las tarjetas y de los usuarios por medio de un Schema de mongoose.

`/controllers` — contiene los controladores de las rutas de la pagina

`/routes` — almacena las rutas de la pagina.

## Running the Project

`$ "C:/Program Files/MongoDB/Server/6.0/bin/mongod.exe" --dbpath="d:/data/db"` — se utiliza para inicilizar la base de datos.

`npm run dev` — inicializa el servidor con capacidad de auto cargado.
