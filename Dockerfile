FROM keymetrics/pm2:latest-slim

# Bundle APP files
COPY . .

# Show current folder structure in logs
RUN ls -al -R
RUN pwd

EXPOSE 9209
CMD [ "npm", "run", "start"]