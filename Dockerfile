FROM node:14

RUN apt-get update || : && apt-get install python -y

WORKDIR /code_execute
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["node", "index.js"]