import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import createHttpError from 'http-errors';
import { MiddlewareObj } from '@middy/core';

export const idTokenMiddleware = (): MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => ({
  before: async (request) => {
    const id = request.event.headers['authorization'];
    //console.log(request);
    if (id === 'Bearer pk_test_AuEbMkLpwuizSfafqCxxTrYndcPMyd') {
      return;
    }
    throw createHttpError(401, 'Unauthorized Request');
  },
});
