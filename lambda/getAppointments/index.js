const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const redis = require('redis');

const DYNAMO_TABLE_NAME = 'appointments';
const REDIS_ENDPOINT = 'healthcare-appointments-mof3f0.serverless.eun1.cache.amazonaws.com';
const REDIS_PORT = 6379;

// Create a Redis client
const redisClient = redis.createClient({
    host: REDIS_ENDPOINT,
    port: REDIS_PORT
});

// Wait for the Redis client to be ready before proceeding
redisClient.on('ready', () => {
    console.log('Redis client is ready');
});

// Handle Redis client errors
redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

exports.handler = async (event, context) => {
    try {
        const user_email = event.email || null;

        if (!user_email) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Invalid request: email not provided.'
                })
            };
        }

        // Check if the response is cached
        const cachedResponse = await getFromCache(user_email);
        if (cachedResponse) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    appointments: JSON.parse(cachedResponse)
                })
            };
        }

        // If not cached, query DynamoDB
        const params = {
            TableName: DYNAMO_TABLE_NAME,
            FilterExpression: 'PatientEmail = :email',
            ExpressionAttributeValues: {
                ':email': user_email
            }
        };

        const response = await dynamodb.scan(params).promise();
        const appointments = response.Items || [];

        // Cache the response
        await cacheResponse(user_email, JSON.stringify(appointments));

        return {
            statusCode: 200,
            body: JSON.stringify({
                appointments: appointments
            })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `An error occurred: ${error.message}`
            })
        };
    }
};

// Function to get data from Redis cache
const getFromCache = (key) => {
    return new Promise((resolve, reject) => {
        // Check if the Redis client is ready
        if (!redisClient.ready) {
            return reject(new Error('Redis client is not ready'));
        }

        // Attempt to get data from the Redis cache
        redisClient.get(key, (err, reply) => {
            if (err) {
                // Handle Redis client errors
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

// Function to cache data in Redis
const cacheResponse = (key, value) => {
    return new Promise((resolve, reject) => {
        // Check if the Redis client is ready
        if (!redisClient.ready) {
            return reject(new Error('Redis client is not ready'));
        }

        // Cache the response in Redis
        redisClient.setex(key, 60, value, (err, reply) => {
            if (err) {
                // Handle Redis client errors
                reject(err);
            } else {
                resolve(reply);
            }
        });
    });
};

