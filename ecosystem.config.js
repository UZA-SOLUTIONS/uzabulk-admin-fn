module.exports = {
  apps: [
    {
      name: "UZA Admin-Frontend",
      script: "./runbuild.js",
      watch: true,
      env_staging: {
        "PORT": 3000,
        "NODE_ENV": "staging"
      },
      env_production: {
        "PORT": 3000,
        "NODE_ENV": "production"
      },
    }
  ]
}