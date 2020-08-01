FROM eclipse-mosquitto:latest
RUN mkdir /web
COPY mosquitto.conf /mosquitto/config/mosquitto.conf
COPY ../build /web
EXPOSE 80