FROM nginx:1.15.8-alpine
RUN mkdir /www
COPY /build /www
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]