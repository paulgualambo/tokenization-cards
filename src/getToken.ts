import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import { idTokenMiddleware } from './middleware/idTokenMiddleware';
import { TokenRepositoryDynamo } from './persistence/TokenRepositoryDynamo';

class Id {
  id: string;
}

export const getToken = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  const { id } = <Id>(<unknown>event.pathParameters);

  const repo = new TokenRepositoryDynamo();
  //console.log(id);
  const result = await repo.GetToken(id);

  if (!result) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        exist: false,
        message: 'Token no existe o esta vencido',
      }),
    };
  }

  const card = {
    card_number: result.card_number,
    email: result.email,
    expiration_year: result.expiration_year,
    expiration_month: result.expiration_month,
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      exist: true,
      card: card,
    }),
  };
};

module.exports = {
  getToken: middy(getToken).use(idTokenMiddleware()).use(httpErrorHandler()),
};
