FROM node:8.9

WORKDIR /app

COPY . /app
# cannot just run because of postinstall hook
# COPY package.json yarn.lock /app/
RUN yarn --pure-lockfile

RUN ls -la
EXPOSE 8080

RUN npm run build:pwa
CMD [ "npm", "run", "server" ]
