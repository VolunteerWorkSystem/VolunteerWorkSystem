export default () => {
  return {
    awsIam: {
      region: 'ap-northeast-3',
    },
    s3: {
      privateBucket: 'star-agent-staging',
      publicBucket: 'xxx',
    },
    db: {
      type: 'postgres' as const,
      synchronize: false,
    },
  };
};
