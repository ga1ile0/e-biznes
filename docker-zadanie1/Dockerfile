# Use Ubuntu 24.04 base image
FROM ubuntu:24.04

# Install required packages
RUN apt-get update && \
    apt-get install -y \
    wget \
    unzip \
    openjdk-8-jdk \
    && rm -rf /var/lib/apt/lists/*
    
# Install Python 3.10
RUN apt-get update && \
    apt-get install -y \
    python3.10 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install Kotlin
RUN wget https://github.com/JetBrains/kotlin/releases/download/v1.9.20/kotlin-compiler-1.9.20.zip && \
    unzip kotlin-compiler-*.zip && \
    rm kotlin-compiler-*.zip && \
    mv kotlinc /usr/local/ && \
    ln -s /usr/local/kotlinc/bin/kotlinc /usr/local/bin/kotlinc

# Install Gradle
RUN wget https://services.gradle.org/distributions/gradle-8.6-bin.zip && \
    unzip gradle-*.zip && \
    rm gradle-*.zip && \
    mv gradle-* /usr/local/gradle && \
    ln -s /usr/local/gradle/bin/gradle /usr/local/bin/gradle

# Set working directory
WORKDIR /app

# Copy Gradle files first to leverage Docker cache
COPY build.gradle .

# Copy source code
COPY src ./src

# Build the application
RUN gradle clean jar  # Changed from 'build' to 'jar'

# Set entrypoint
CMD ["java", "-jar", "/app/build/libs/project-1.0-SNAPSHOT.jar"]

# Verify installations
RUN java -version && \
    python3 --version
