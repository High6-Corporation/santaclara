module.exports = {
  apps: [{
    name: 'santaclara',
    script: 'npm',
    args: 'start -- -p 3008',
    cwd: '/home/projects/santaclara',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
