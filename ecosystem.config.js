module.exports = {
  apps : [{
    name: 'pm2-metrics',
    script: 'exporter.js',
    exec_mode: 'cluster',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error: `/data/logs/pm2-metrics-error.log`,
    log: `/data/logs/pm2-metrics-all.log`,
    output: '/dev/null',
    merge_logs: true,
    env: {
      PORT: 9209
    }
  }]
};
