# Use an existing docker image as a base
FROM node:alpine
# Set default working directory in container to /app
WORKDIR /app
# Copy the package.json file to /app directory
COPY package.json .
# Install the dependency specific in package.json
RUN npm install
# Copy all file to /app directory
COPY . .
# Command when the container lanuch 
CMD node server.js
# Expose the port 5000 to the outside when container is lanuch
EXPOSE 5000