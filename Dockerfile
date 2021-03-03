FROM node:10-slim AS build

# Create a folder for our app
RUN mkdir /app

# Set up the working directory
WORKDIR /app

COPY package*.json ./

# Note that we're installing all dependencies, unlike the buildpack
RUN npm install

# Copy the rest of the application
COPY . .

EXPOSE 8080

RUN npm run build
