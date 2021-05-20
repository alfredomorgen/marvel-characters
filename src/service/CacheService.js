import config from "config";
import redis from "redis";
import { promisify } from "util";

const redisClient = redis.createClient();

export function getKeys(pattern) {
  const redisKeys = promisify(redisClient.keys).bind(redisClient);
  return redisKeys(pattern);
}

export function setCache(key, value) {
  const redisSet = promisify(redisClient.set).bind(redisClient);
  return redisSet(key, value, "EX", config.get("defaultTtlInSeconds"));
}

export function getCache(key) {
  const redisGet = promisify(redisClient.get).bind(redisClient);
  return redisGet(key);
}
