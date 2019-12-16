module.exports = {
  apps: [
    {
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
    },
    {
      name: 'pm2-metrics-local',
      script: 'src/exporter.js',
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
    },
  ],
  deploy: {
    production: {
      'user': 'root',
      'host': '47.104.216.30',
      'ref': 'origin/master',
      'repo': 'git@github.com:NextZeus/pm2-prometheus-exporter.git',
      'path': '/data/work/pm2-prometheus-exporter',
      'pre-setup': "yum install git -y;",
      'post-setup': "ls -la",
      'pre-deploy-local': "pwd; echo 'this is a local command' ",
      'pre-deploy': 'pwd;ls -la;',
      'post-deploy': 'git pull origin master;git log -n 2;',
      'test': 'pwd;'
    }
  }
};
