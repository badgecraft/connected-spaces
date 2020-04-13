FROM registry.badgecraft.eu/node:v12.7.0

COPY ./build .

RUN yarn install --production --no-progress --frozen-lockfile

USER node
