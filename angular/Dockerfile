

FROM node:12.14.0-alpine as builder

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY awclinic-app/package.json awclinic-app/package-lock.json /app/awclinic-app/

# Install app dependencies.
RUN npm install --prefix awclinic-app

# Copy app files.
COPY . /app

# Default build configuration.
ARG configuration=production

# Build app
RUN npm run build --prefix awclinic-app -- --output-path=./dist/out --configuration $configuration


### Stage 2: delivery ###

FROM nginx:1.15.7-alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=builder /app/awclinic-app/dist/out /usr/share/nginx/html

# Copy nginx configuration file.
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf