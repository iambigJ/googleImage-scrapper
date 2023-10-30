# Stage 1: Build and install dependencies
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install

# Stage 2: Copy source files and set the working directory
FROM build AS final
WORKDIR /app
COPY . .

# Command to run the application
CMD ["npm", "start"]