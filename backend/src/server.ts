import { connectRabbitMQ } from './rabbitmq';
import app from './app';
import { connectMongoDB } from './database';
import { connectDB } from './helpers/logger';
import redisClient from './redisDatabase';
import { getJobs } from './helpers/scraper/jobscraper';

const PORT = process.env.PORT || 5000;

  app.listen(PORT, async () => {

    // mongoose connection
    await connectDB();

    // ping Redis database to connect
    await redisClient.ping();

    // RabbitMQ Connection
    await connectRabbitMQ().then(() => {
      // consumeWalletMessages();
    });

//  const jobsObj = await getJobs()
//  console.log("jobsObj", jobsObj)
  console.log(`Server is running on port ${PORT}`);
});