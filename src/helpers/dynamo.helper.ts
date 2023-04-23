import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { Config } from 'aws-sdk';

let config = {};

if (process.env.IS_OFFLINE || process.env.NODE_ENV === `test`) {
  config = new Config({
    credentials: {
      accessKeyId: process.env.AWS_DYNAMO_ACCESS_KEY,
      secretAccessKey: process.env.AWS_DYNAMO_SECRET_KEY,
    },
    region: process.env.REGION || `eu-west-1`,
  });
}

const client: DocumentClient = new DocumentClient(config);

export default {
  get: (
    params: DocumentClient.GetItemInput
  ): Promise<DocumentClient.GetItemOutput> => client.get(params).promise(),
  put: (
    params: DocumentClient.PutItemInput
  ): Promise<DocumentClient.PutItemOutput> => client.put(params).promise(),
  query: (
    params: DocumentClient.QueryInput
  ): Promise<DocumentClient.QueryOutput> => client.query(params).promise(),
  update: (
    params: DocumentClient.UpdateItemInput
  ): Promise<DocumentClient.UpdateItemOutput> =>
    client.update(params).promise(),
  delete: (
    params: DocumentClient.DeleteItemInput
  ): Promise<DocumentClient.DeleteItemOutput> =>
    client.delete(params).promise(),
  scan: (
    params: DocumentClient.ScanInput
  ): Promise<DocumentClient.ScanOutput> => client.scan(params).promise(),
  scanRec: async (
    params: DocumentClient.ScanInput
  ): Promise<DocumentClient.ScanOutput> => {
    let nextKey;
    let fullList = [];
    while (fullList.length >= 0) {
      const table = await client
        .scan({ ...params, ...(nextKey ? { ExclusiveStartKey: nextKey } : {}) })
        .promise();
      fullList = [...fullList, ...table.Items];
      if (table.LastEvaluatedKey) {
        nextKey = table.LastEvaluatedKey;
      } else {
        return { Items: fullList };
      }
    }
  },
};
