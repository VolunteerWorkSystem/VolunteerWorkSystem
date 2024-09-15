import {
  IsEnum,
  IsNumber,
  Min,
  Max,
  validateSync,
  IsOptional,
  IsString,
} from 'class-validator';
import { plainToInstance } from 'class-transformer';

export enum Environment {
  Development = 'development',
  Staging = 'staging',
  Production = 'production',
  // Test = 'test',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  @Min(0)
  @Max(65535)
  PORT: number = 3000;

  // @IsNotEmpty()
  // AWS_ACCESS_KEY_ID: string;
  // @IsNotEmpty()
  // AWS_SECRET_ACCESS_KEY: string;

  @IsString()
  JWT_SECRET: string;

  // LINE
  @IsString()
  LINE_CHANNEL_ID: string;

  @IsString()
  LINE_CHANNEL_SECRET: string;

  // DB
  @IsString()
  @IsOptional()
  DATABASE_URL?: string;

  @IsString()
  @IsOptional()
  DB_HOST?: string;

  @IsNumber()
  @Min(0)
  @Max(65535)
  @IsOptional()
  DB_PORT?: number;

  @IsString()
  @IsOptional()
  DB_USERNAME?: string;

  @IsString()
  @IsOptional()
  DB_PASSWORD?: string;

  @IsString()
  @IsOptional()
  DB_DATABASE?: string;

  // @IsJSON()
  // FIREBASE_SERVICE_ACCOUNT: string;

  // @IsJSON()
  // DOCUMENTAI_CREDENTIALS: string;
}
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    console.error(config);
    console.error(errors);
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default () => {
  const envs = validate(process.env);

  return {
    config: {
      // awsIam: {
      //   accessKeyId: envs.AWS_ACCESS_KEY_ID,
      //   secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
      // },
      auth: {
        jwtSecret: envs.JWT_SECRET,
        // expiresIn: envs.AUTH_EXPIRES_IN,
      },
      line: {
        channelID: envs.LINE_CHANNEL_ID,
        channelSecret: envs.LINE_CHANNEL_SECRET,
      },
      db: {
        url: envs.DATABASE_URL,
        host: envs.DB_HOST,
        port: envs.DB_PORT,
        username: envs.DB_USERNAME,
        password: envs.DB_PASSWORD,
        database: envs.DB_DATABASE,
      },
      // firebase: {
      //   serviceAccount: JSON.parse(envs.FIREBASE_SERVICE_ACCOUNT),
      // },
      // documentAi: {
      //   credentials: JSON.parse(envs.DOCUMENTAI_CREDENTIALS),
      // },
    },
    envs: envs,
  };
};
