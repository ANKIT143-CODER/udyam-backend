# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Copy the Prisma schema and other necessary files
COPY prisma ./prisma
COPY .env ./
COPY server.js ./
COPY index.js ./

# Install project dependencies, which will trigger the 'prisma generate' postinstall script
RUN npm install

# Expose the port the app runs on
EXPOSE 3001

# Define the command to run the application
CMD ["npm", "start"]
