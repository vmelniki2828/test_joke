# Этап 1: Сборка приложения
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Этап 2: Раздача статики через Nginx
FROM nginx:stable-alpine
# Копируем билд из первого этапа в папку Nginx
COPY --from=build /app/build /usr/share/nginx/html
# Копируем твой кастомный конфиг Nginx
COPY custom_nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]