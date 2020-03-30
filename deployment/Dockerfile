FROM node:8.11.3

WORKDIR /app

RUN npm install -g json-server@0.14.0

COPY ./json-files .

EXPOSE 3000
CMD ["json-server", "--watch", "acme-explorer.json", "--routes", "routes.json", "--host", "0.0.0.0", "-p", "3000"]