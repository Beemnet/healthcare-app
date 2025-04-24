# Healthcare App Project

## Overview

This project is a healthcare application designed to provide users with convenient access to healthcare services and information. The application is built using a serverless architecture on the AWS cloud, utilizing AWS API Gateway for managing API requests and responses.

## Features

- **User Authentication**: Users can sign up, sign in, and securely access their healthcare information.
- **Appointment Booking**: Users can schedule appointments with healthcare providers.
- **Medical Records Access**: Users can view their prescriptions and history.
- **Role-based Access**: Doctors and patients have different permissions on the platform.

## Technologies Used

- **AWS API Gateway**: For managing API requests and responses.
- **AWS Lambda**: For serverless computing to handle backend logic.
- **AWS DynamoDB**: For storing user data and medical records.
- **HTML/CSS/JavaScript**: For building the user interface.
- **Firebase**: For user authentication and access control.


## UI Source

The user interface for this application is based on the [Healthcare Service App](https://github.com/Foy5al/healthcare-service-app) project. It is a React application focused on healthcare and services, designed for a practice project with some minimal requirements.

## AWS Architecture Diagram

![image](https://github.com/user-attachments/assets/9696d437-cf80-45de-949e-fd3924d40ad7)

- **AWS Amplify**:
The webapp was hosted using AWS Amplify. It allows direct integration with Github, and was set to track the main branch of the repository, so that an changes are integrated in real time.

![image](https://github.com/user-attachments/assets/ed4588fb-b050-46a8-b77a-8935aa4610ca)

- **API Gateway**:
The lambda functions will be triggered by an API Gateway.
The invoke URL of the APIs is set in the front-end to call the APIs.

![image](https://github.com/user-attachments/assets/d578fccf-4ac8-4289-a9ba-d3c7cbf33fc5)

- **Firewall**:
An AWS WAF was added to filter out malicious requests before it reaches the API gateway.

- **Load Balancing**:
Load balancing was implemented to balance the loads on the lambda:

![image](https://github.com/user-attachments/assets/cdbe865b-cfed-4355-b7fb-affbe9c1ecda)

![image](https://github.com/user-attachments/assets/e6886e39-1b00-487f-8e70-3ce7668dcbbb)

- **AWS Lambda**:
AWS Lambda functions were implemented for serverless computing:
  •	SaveAppointment
  •	ViewAppointment
  •	ViewPrescriptions
  •	SavePrescriptions

![image](https://github.com/user-attachments/assets/065e8083-6122-4342-95d7-a47c35cecab9)

![image](https://github.com/user-attachments/assets/6e177ec8-6c1f-495c-8fe4-a95fa5cc2983)

- **Storage**:
DynamoDB was used to store the data. It is a NoSQL database. DynamoDB is optimized for low-latency access and high throughput, providing consistent performance regardless of data size. It's ideal for applications requiring fast reads/writes.
We can see the appointments table as an example below:

![image](https://github.com/user-attachments/assets/c924615b-f272-409f-9dc0-eb4a4fcdd5a1)

- **IAM Roles**:

![image](https://github.com/user-attachments/assets/e54705ce-b304-457f-935e-2678710a0c30)

![image](https://github.com/user-attachments/assets/0d5a5f3f-337d-4435-a980-31448578bd01)

The patient was only given read rights on the prescriptions table:
![image](https://github.com/user-attachments/assets/2ce7786f-84f7-4fbe-94ab-2add39d0a995)

The doctor was given read-write permission on the prescriptions table:
![image](https://github.com/user-attachments/assets/3c36c5d5-e0c5-4386-83a9-de12f7306ebe)

For the appointments table both patient and doctor have full rights to add, delete, or update appointments.
![image](https://github.com/user-attachments/assets/bda21443-3542-419b-9e04-c234bce045f8)



## Future Improvements

- Implement **secure data transfer** (HTTPS, encryption)
- Use **Amazon VPC** for isolated networking
- Use **Lambda Container Images** for scaling
- Add analytics with **AWS CloudWatch**

