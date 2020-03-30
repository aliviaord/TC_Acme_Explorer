FROM node:8.11.3

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g @angular/cli@6.2.4
RUN npm install

COPY . .

EXPOSE 4200
CMD ["ng", "serve", "--host=0.0.0.0"]