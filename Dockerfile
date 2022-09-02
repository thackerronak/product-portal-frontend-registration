# Step 1
FROM node:16-alpine as build-step
ARG http_proxy=$http_proxy
ARG https_proxy=$https_proxy
ARG no_proxy=$no_proxy
RUN apk add jq
COPY . /app
WORKDIR /app
RUN yarn
RUN yarn build

FROM nginxinc/nginx-unprivileged:alpine
COPY .conf/nginx.conf /etc/nginx/conf.d/default.conf
# COPY ./build /usr/share/nginx/html
COPY --from=build-step /app/build/registration /usr/share/nginx/html
USER 101
