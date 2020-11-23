module.exports = {
    "development": {
      "username": 'xvex5lt7dygr71y5',
      "password": 'srn5cjh930ao8irk',
      "database": 'oveynqztnucgnq5x',
      "host": 'z37udk8g6jiaqcbx.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      "dialect": "mysql",
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql",
    },
    "production": {
        "use_env_variable": "JAWSDB_URL",
        "dialect": "mysql",
    }
  }