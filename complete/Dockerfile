FROM openjdk:17

COPY target/*.jar /opt/app.jar
WORKDIR /opt

ENTRYPOINT ["java","-jar", "app.jar"]