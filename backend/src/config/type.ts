import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Environment } from './custom-environment-variables';

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type MyConfig = {
  env: Environment;
  // awsIam: {
  //   accessKeyId: string;
  //   secretAccessKey: string;
  //   region: string;
  // };
  // s3: {
  //   publicBucket: string;
  //   privateBucket: string;
  // };

  auth: {
    jwtSecret: string;
  };

  line: {
    channelID: string;
    channelSecret: string;
  };

  db: TypeOrmModuleOptions & {
    type: 'postgres';
  };

  // firebase: {
  //   serviceAccount: Record<string, any>;
  // };

  // documentAi: {
  //   credentials: Record<string, any>;
  // };
};

export type AgentConfigOverride = RecursivePartial<MyConfig>;
