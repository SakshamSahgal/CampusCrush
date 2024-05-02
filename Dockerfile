# Use an official Node.js runtime as a base image
FROM node:20

# fetch the latest version of the package lists
RUN apt-get update

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory (ie inside the /app directory in the container)
COPY package*.json ./

# Copy the contents of the src directory to the working directory in the container
COPY src/ /app/src

# Install Node.js dependencies in the container app directory
RUN npm install

# Define build arguments
ARG PORT
ARG CORS_ORIGIN
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_NAME
ARG NodeMailerEmail
ARG NodeMailerPassword
ARG OTP_LENGTH
ARG OTP_VALIDATION_DURATION_IN_MINUTES
ARG JWT_SECRET_KEY
ARG HOST
ARG PING_BOT_DURATION_IN_MINUTES

# Append build arguments to .env file
RUN echo "PORT=${PORT}" >> .env \
    && echo "CORS_ORIGIN=${CORS_ORIGIN}" >> .env \
    && echo "DB_USERNAME=${DB_USERNAME}" >> .env \
    && echo "DB_PASSWORD=${DB_PASSWORD}" >> .env \
    && echo "DB_NAME=${DB_NAME}" >> .env \
    && echo "NodeMailerEmail=${NodeMailerEmail}" >> .env \
    && echo "NodeMailerPassword=${NodeMailerPassword}" >> .env \
    && echo "OTP_LENGTH=${OTP_LENGTH}" >> .env \
    && echo "OTP_VALIDATION_DURATION_IN_MINUTES=${OTP_VALIDATION_DURATION_IN_MINUTES}" >> .env \
    && echo "JWT_SECRET_KEY=${JWT_SECRET_KEY}" >> .env \
    && echo "HOST=${HOST}" >> .env \
    && echo "PING_BOT_DURATION_IN_MINUTES=${PING_BOT_DURATION_IN_MINUTES}" >> .env


# Expose the port your app runs on
EXPOSE 8080

# Command to run your application
CMD ["node", "src/index.js"]