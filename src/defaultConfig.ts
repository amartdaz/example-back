export default () => ({
    isDev: process.env.IS_DEV || false,
    port: process.env.PORT,
    version: '1.0.0',
    database: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      name: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
    jwtSecret: process.env.JWT_SECRET,
  });