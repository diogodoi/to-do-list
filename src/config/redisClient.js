import Redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();
const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD, // Caso tenha senha
});

redisClient.on('connect', () => {
  console.log('Conectado ao Redis');
});

redisClient.on('error', (err) => {
  console.error('Erro no Redis:', err);
});

export default redisClient;
