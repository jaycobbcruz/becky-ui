FROM node:carbon
COPY package.json ./
CMD [ "npm", "i", "npm@latest", "-g" ]
RUN npm install
COPY . ./
EXPOSE 80
CMD [ "npm", "run", "build" ]
CMD PORT=80 node server.js
