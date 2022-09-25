# Summary 
This is a simple SST application developed during the Cocoder event at Trifork in Aarhus on 21 Sept 2022. 

See https://github.com/trifork/digital-health-code-night for the description of the event and challenge. 

This code uses the SST framework to retrieve the number of COVID cases for a specified country using the public REST API https://github.com/M-Media-Group/Covid-19-API via AWS Lambda function.

The frontend is implemented as a simple React brower app. 

```
Frontend (React) -> Backend (SST) -> AWS Lambda -> Covid 19 API
```

# Prerequisite

## Node.js and npm
You need Node.js 16 (or above) and npm 8 (or above) to build and run this sample code. 
(I think it works with Node.js 14 or above, but I have never tried)

## AWS IAM and CLI
You must have an AWS account and AWS CLI tool. 
For more details, read the following guides on the SST website. 

- Creating an IAM user and access token - https://sst.dev/chapters/create-an-iam-user.html
- Configuring AWS CLI  - https://sst.dev/chapters/configure-the-aws-cli.html

# Build & Run

The following command will clone the code.  
```
git clone https://github.com/higuhi/cocoders-aarhus-trifork
```

The following command will run the SST backend. The first time it runs, it will deploy AWS instances automatically. 
```
cd cocoders-aarhus-trifork
npm install 
npx sst start
```

The following command will run the React frontend that runs at http://localhost:3000/
```
cd cocoders-aarhus-trifork/frontend 
npm install 
npm start
```

# References

- https://sst.dev/examples/how-to-create-a-rest-api-with-serverless.html
- https://sst.dev/examples/how-to-create-a-reactjs-app-with-serverless.html