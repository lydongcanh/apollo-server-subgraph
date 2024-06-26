# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code to the working directory
COPY . .

# Build the TypeScript code
RUN npm run compile

# Expose the port that the app runs on
EXPOSE 4000

# Command to run the app
CMD ["npm", "start"]
