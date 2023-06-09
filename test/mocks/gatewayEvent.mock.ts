import { APIGatewayEvent } from 'aws-lambda';

export const getMockApiGatewayEvent = jest.fn(
  (): APIGatewayEvent => ({
    body: ``,
    headers: undefined,
    multiValueHeaders: undefined,
    httpMethod: ``,
    isBase64Encoded: false,
    path: ``,
    pathParameters: undefined,
    queryStringParameters: undefined,
    multiValueQueryStringParameters: undefined,
    stageVariables: undefined,
    requestContext: {
      accountId: `offlineContext_accountId`,
      apiId: `offlineContext_apiId`,
      authorizer: {
        claims: undefined,
        scopes: undefined,
        principalId: `offlineContext_authorizer_principalId`,
      },
      domainName: `offlineContext_domainName`,
      domainPrefix: `offlineContext_domainPrefix`,
      extendedRequestId: `cktm0o7mc0003ajic6vc23zur`,
      httpMethod: `POST`,
      identity: {
        accessKey: null,
        accountId: `offlineContext_accountId`,
        apiKey: `offlineContext_apiKey`,
        apiKeyId: `offlineContext_apiKeyId`,
        caller: `offlineContext_caller`,
        cognitoAuthenticationProvider: `offlineContext_cognitoAuthenticationProvider`,
        cognitoAuthenticationType: `offlineContext_cognitoAuthenticationType`,
        cognitoIdentityId: `offlineContext_cognitoIdentityId`,
        cognitoIdentityPoolId: `offlineContext_cognitoIdentityPoolId`,
        principalOrgId: null,
        sourceIp: `127.0.0.1`,
        user: `offlineContext_user`,
        userAgent: `insomnia/2021.3.0`,
        userArn: `offlineContext_userArn`,
        clientCert: {
          clientCertPem: ``,
          issuerDN: ``,
          serialNumber: ``,
          subjectDN: ``,
          validity: {
            notAfter: ``,
            notBefore: ``,
          },
        },
      },
      path: `/user`,
      protocol: `HTTP/1.1`,
      requestId: `cktm0o7mc0004ajic4wv24tyf`,
      requestTime: `15/Sep/2021:18:29:15 -0300`,
      requestTimeEpoch: 1631741355155,
      resourceId: `offlineContext_resourceId`,
      resourcePath: `/dev/user`,
      stage: `dev`,
    },
    resource: ``,
  })
);
