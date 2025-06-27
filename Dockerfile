# Используем готовый образ легковесного веб-сервера nginx
FROM nginx:alpine

# Копируем все файлы твоего проекта (index.html, styles.css, game.js и т.д.)
# в папку, из которой nginx будет раздавать статику
COPY . /usr/share/nginx/html

# Сообщаем Docker, что контейнер будет слушать порт 80
EXPOSE 80