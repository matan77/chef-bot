FROM node:latest AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginxinc/nginx-unprivileged

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 

CMD ["nginx", "-g", "daemon off;"]