import boto3
import redis
import json

# Constants
DYNAMODB_TABLE_NAME = 'appointments'
REDIS_EXPIRATION_TIME = 30  # Expiration time in seconds (1 hour)

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb')

# Initialize Redis client
redis_client = redis.Redis()

def lambda_handler(event, context):
    try:
        # Get the user_email from the event
        user_email = event.get('email')

        # Check if user_email is provided
        if not user_email:
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'message': 'Invalid request: email not provided.'
                })
            }

        # Check Redis first
        appointments_key = f"appointments:{user_email}"
        appointments_json = redis_client.get(appointments_key)

        if appointments_json:
            appointments = json.loads(appointments_json)
            return {
                'statusCode': 200,
                'body': json.dumps({'appointments': appointments})
            }
        else:
            # Search DynamoDB for appointments
            dynamodb_response = dynamodb.query(
                TableName=DYNAMODB_TABLE_NAME,
                KeyConditionExpression='PatientEmail = :email',
                ExpressionAttributeValues={
                    ':email': {'S': user_email}  # Assuming PatientEmail is a string type in DynamoDB
                }
            )

            # Extract appointments from DynamoDB response
            appointments = dynamodb_response.get('Items', [])

            # If appointments are found in DynamoDB, store them in Redis and return
            if appointments:
                # Store appointments in Redis
                redis_client.setex(appointments_key, REDIS_EXPIRATION_TIME, json.dumps(appointments))

                return {
                    'statusCode': 200,
                    'body': json.dumps({
                        'appointments': appointments
                    })
                }
            else:
                return {
                    'statusCode': 404,
                    'body': json.dumps({'message': 'No appointments found for the user'})
                }

    except Exception as e:
        # Handle any exceptions
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': f'An error occurred: {str(e)}'
            })
        }
