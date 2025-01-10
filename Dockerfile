# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the build output from the first stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port on which Nginx will serve the app
EXPOSE 80

# Nginx runs by default on port 80, but since you need to access it via port 3000, we can map the container's port 80 to the host's port 3000.
CMD ["nginx", "-g", "daemon off;"]