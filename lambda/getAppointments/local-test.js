// // local-test.js

// const lambdaHandler = require('./index');

// async function testLambda() {
//     // Sample test event
//     const testEvent = {
//         email: 'john@example.com'
//         // Add more properties as needed for your function
//     };

//     // Context object (not used in this example)
//     const context = {};

//     // Execute Lambda function
//     try {
//         const result = await lambdaHandler.handler(testEvent, context);
//         console.log('Lambda function execution result:', result);
//     } catch (error) {
//         console.error('Error executing Lambda function:', error);
//     }
// }

// // Call the test function
// testLambda();

const net = require('net');

const REDIS_HOST = 'healthcare-appointments-mof3f0.serverless.eun1.cache.amazonaws.com';
const REDIS_PORT = 6379;

const testRedisConnection = () => {
    const client = net.createConnection({ host: REDIS_HOST, port: REDIS_PORT }, () => {
        console.log('Connected to Redis server successfully');
        client.end();
    });

    client.on('error', (err) => {
        console.error('Error connecting to Redis server:', err);
    });
};

testRedisConnection();
