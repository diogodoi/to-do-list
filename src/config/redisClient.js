import Redis from 'ioredis';

const redisClient = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || null, // Caso tenha senha
});

redisClient.on('connect', () => {
  console.log('Conectado ao Redis');
});

redisClient.on('error', (err) => {
  console.error('Erro no Redis:', err);
});

export default redisClient;
