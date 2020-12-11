FROM node:12
# Utiliza la imagen de node 12 como base.
# A partir de esta imagen se ejecutarán los comandos de abajo creando una nueva imagen.

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/unquify_newsletter

# Copia el package.json package-lock.json en /home/node/unquify_newsletter
COPY package.json .
COPY package-lock.json .

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 8083 donde corre la aplicación
EXPOSE 8083

# Copia los fuentes dentro del container
COPY newsletterApi.js /home/node/unquify_newsletter/
COPY . .

# Le da permisos al usuario node para escribir en /home/node/my_node_app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
RUN chown -R 777  /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "node", "newsletterApi" ]

# LISTO!


# Para construir la imagen
# docker build -t imagen_newsletter_siete .

# Para correr el container
# docker run -p 8083:8083 --name container_newsletter_siete --user node imagen_newsletter_siete