
# Pull base image
FROM node:8-alpine

WORKDIR /project
COPY package.json package-lock.json ./
RUN npm ci --prod && npm cache clean --force

FROM node:8-slim
WORKDIR /app
COPY --from=0 /project .
COPY . .
USER node
CMD [ "node", "./bin/www" ]