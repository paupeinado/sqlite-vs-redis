# Use an official Node.js runtime as a parent image
FROM node:22-slim

# Copy the package.json and package-lock.json files
COPY package*.json /opt

# Set the working directory
WORKDIR /opt

# Install the dependencies
RUN yarn install

# Set the working directory
WORKDIR /opt/app
