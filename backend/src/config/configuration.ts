import { MyConfig } from './type';
import getDefaultConfig from './default';
import developmentConfig from './development';
import stagingConfig from './staging';
import productionConfig from './production';
import customEnvironmentConfig from './custom-environment-variables';

const envConfigs = {
  development: developmentConfig,
  staging: stagingConfig,
  production: productionConfig,
};

export default (): MyConfig => {
  const { config: secrectConfig, envs } = customEnvironmentConfig();

  const defaultConfig = getDefaultConfig();

  // load corresponding config based on NODE_ENV
  // ex: NODE_ENV=development, load ./development.ts
  const getEnvConfig = envConfigs[envs.NODE_ENV];
  const envConfig = getEnvConfig();

  return {
    env: envs.NODE_ENV,
    auth: {
      ...secrectConfig.auth,
    },
    line: {
      ...secrectConfig.line,
    },
    db: {
      ...defaultConfig.db,
      ...envConfig.db,
      ...secrectConfig.db,
    },
    // awsIam: {
    //   ...defaultConfig.awsIam,
    //   ...secrectConfig.awsIam,
    // },
    // s3: {
    //   ...defaultConfig?.s3,
    // },

    // firebase: {
    //   ...secrectConfig.firebase,
    // },
    // documentAi: {
    //   ...secrectConfig.documentAi,
    // },
  };
};
