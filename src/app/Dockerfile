FROM node:20.14-alpine3.20 as dev

WORKDIR /app
COPY package.json /app/

FROM dev as build
RUN yarn install --production=true
COPY . .
RUN yarn build

# Production stage
FROM nginx:1.21-alpine as production

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]