import { Context, APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

type LambdaFunction<T> = (
  event: APIGatewayEvent,
  context: Context
) => Promise<T>;

type PermissionHandler<T> = (
  lambda: LambdaFunction<T>,
  permission?: string[]
) => (
  event: APIGatewayEvent,
  context: Context
) => Promise<APIGatewayProxyResult>;

export const handler: PermissionHandler<any> =
  (lambda, permission) => async (event, context) => {
    try {
      if (
        permission &&
        event.requestContext.accountId !== `offlineContext_accountId`
      ) {
        const group = Array.isArray(
          event?.requestContext?.authorizer?.claims?.[`cognito:groups`]
        )
          ? event.requestContext.authorizer.claims[`cognito:groups`][0]
          : event.requestContext.authorizer.claims[`cognito:groups`];
        if (!permission.includes(group)) {
          throw new Error(`User is not authorized to perform this action`);
        }
      }

      const data = await lambda(event, context);

      const successResponse: APIGatewayProxyResult = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          success: true,
          data,
        }),
      };

      return successResponse;
    } catch (error) {
      const parsedError = JSON.parse(error.message);
      const status = parsedError.status || error.status;

      const errorResponse: APIGatewayProxyResult = {
        statusCode: status || 500,
        headers: {
          'Access-Control-Allow-Origin': `*`,
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          success: false,
          error: parsedError,
        }),
      };

      return errorResponse;
    }
  };
