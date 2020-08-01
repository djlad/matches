FROM eclipse-mosquitto:latest
RUN mkdir /web
COPY mqtt/mosquitto.conf /mosquitto/config/mosquitto.conf
COPY build /web