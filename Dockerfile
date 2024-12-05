# Use a Node.js base image
FROM node:18.20.4 as builder

# Set the working directory in the container
WORKDIR /usr/src/app

# add `usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

ARG SECRET_NAME
ARG AWS_REGION
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY

ENV SECRET_NAME $SECRET_NAME
ENV AWS_REGION $AWS_REGION
ENV AWS_ACCESS_KEY_ID $AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY $AWS_SECRET_ACCESS_KEY

COPY ./package-lock.json .
COPY ./package.json .

# Install app dependencies
RUN npm install aws-sdk --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Set OpenSSL legacy provider
ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN node secrets.cjs
RUN npm run build

FROM nginx:1.19.4-alpine

# update nginx conf
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# copy static files
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# expose port
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
