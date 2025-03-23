FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    wget \
    unzip \
    openjdk-8-jdk \
    && rm -rf /var/lib/apt/lists/*
    
RUN apt-get update && \
    apt-get install -y \
    python3.10 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.9.20/kotlin-compiler-1.9.20.zip && \
    unzip kotlin-compiler-*.zip && \
    rm kotlin-compiler-*.zip && \
    mv kotlinc /usr/local/ && \
    ln -s /usr/local/kotlinc/bin/kotlinc /usr/local/bin/kotlinc

RUN wget https://services.gradle.org/distributions/gradle-8.6-bin.zip && \
    unzip gradle-*.zip && \
    rm gradle-*.zip && \
    mv gradle-* /usr/local/gradle && \
    ln -s /usr/local/gradle/bin/gradle /usr/local/bin/gradle

WORKDIR /app

COPY build.gradle .

COPY src ./src

RUN gradle clean jar  

CMD ["java", "-jar", "/app/build/libs/project-1.0-SNAPSHOT.jar"]

RUN java -version && \
    python3 --version
