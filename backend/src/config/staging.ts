export default () => ({
  db: {
    synchronize: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
