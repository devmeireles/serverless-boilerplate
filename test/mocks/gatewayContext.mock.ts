// Mock Context object
// const mockContext = {

import { Context } from 'aws-lambda';

export const getMockApiContext = jest.fn(
  (): Context => ({
    awsRequestId: `EXAMPLE_REQUEST_ID`,
    callbackWaitsForEmptyEventLoop: true,
    functionName: `my-function`,
    functionVersion: `1.0`,
    memoryLimitInMB: `128`,
    logGroupName: `log-group`,
    logStreamName: `log-stream`,
    invokedFunctionArn: `arn:aws:lambda:us-west-2:1234567890:function:my-function`,
    getRemainingTimeInMillis() {
      return 5000;
    },
    done(_err) {
      /* ... */
    },
    fail(_err) {
      /* ... */
    },
    succeed(_result: any) {
      /* ... */
    },
  })
);
