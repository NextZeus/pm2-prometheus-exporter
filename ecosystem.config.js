module.exports = {
  apps : [{
    name: 'PM2 Exporter',
    script: 'exporter.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 9209
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 9209
    }
  }]
};
