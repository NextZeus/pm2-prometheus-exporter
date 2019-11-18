FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY ./src/exporter.js /data/work/exporter.js
COPY ./ecosystem.config.js /data/work/ecosystem.config.js
COPY ./package.json /data/work/package.json

# Show current folder structure in logs
WORKDIR /data/work

EXPOSE 9209
CMD [ "npm", "run", "start"]