FROM maven:3.9.5-eclipse-temurin-21-alpine

WORKDIR /app

COPY . .

RUN mvn clean package -DskipTests

FROM openjdk:21-slim-bullseye

COPY --from=0 /app/target/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]