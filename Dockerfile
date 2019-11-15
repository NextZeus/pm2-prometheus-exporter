FROM keymetrics/pm2:latest-alpine

# Bundle APP files
COPY . .

EXPOSE 9209

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production

# Show current folder structure in logs
RUN ls -al -R
RUN pwd

CMD [ "npm", "run", "start"]