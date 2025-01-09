# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire source code into the container
COPY . .

# Build the React app - compiles the React app into static files, and Nginx will serve these files to the user.
RUN npm run build

# Step 2: Serve the React app using Nginx
FROM nginx:alpine

# Copy the build output from the previous step to Nginx's default directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port Nginx is running on
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]


