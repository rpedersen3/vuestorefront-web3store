
import { createOddoLink } from './apolloClient';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Config, ClientInstance } from './config';
import { Logger } from 'winston';
import Redis from 'redis-tag-cache';

const onCreate = (settings: Config): { config: Config; client: ClientInstance } => {
  const logger : Logger = (process as any).winstonLog;

  if (!logger) {
    console.error('YOU MUST INSTALL AND CONFIGURE NUXT WINSTON MODULE FROM https://github.com/aaronransley/nuxt-winston-log');
    throw new Error('YOU MUST INSTALL AND CONFIGURE NUXT WINSTON MODULE FROM https://github.com/aaronransley/nuxt-winston-log');
  }

  const config = (settings as any) as Config;

  const { apolloLink } = createOddoLink(config);

  const apolloClient = new ApolloClient({
    link: apolloLink,
    cache: new InMemoryCache(),
    ...settings
  });
  let redisTagClient = null;

  if (settings.redisClient) {
    const options = {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD || null,
      db: process.env.REDIS_DATABASE || 0
    };

    if ((process as any).superRedis) {
      redisTagClient = (process as any).superRedis;
    } else {
      (process as any).superRedis = new Redis({ redis: options });
      redisTagClient = (process as any).superRedis;
    }

  }

  return {
    config,
    client: {
      redisTagClient,
      apollo: apolloClient
    }
  };
};

export default onCreate;
