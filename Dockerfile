FROM nginx:alpine
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY dist/auto-front/* /usr/share/nginx/html/
EXPOSE 80