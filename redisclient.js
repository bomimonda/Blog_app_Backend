import { createClient } from "redis";

// Sirf URL use karo, CLI command mat include karo
const REDIS_URL = "redis://default:RhnuQogeKb4ym6nDbC7JrZpo5s1wDsJR@redis-16090.c92.us-east-1-3.ec2.cloud.redislabs.com:16090";

const redisClient = createClient({ url: REDIS_URL });

redisClient.on("error", (err) => console.log("Redis Error:", err));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Redis Cloud connected!"); // If connected
  } catch (err) {
    console.log("Redis Cloud connection failed:", err);
  }
}

connectRedis();

export default redisClient;
