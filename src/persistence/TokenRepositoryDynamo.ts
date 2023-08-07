import date from 'date-and-time';

import { v4 as uuidv4 } from 'uuid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';

import { ITokenRepository } from './ITokenRepository';
import { Token } from '../model/Token';

export class TokenRepositoryDynamo implements ITokenRepository {
  async AddToken(req: Token): Promise<string> {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    const id = uuidv4();
    const { email, card_number, cvv, expiration_year, expiration_month } = req;

    const now = new Date();
    const format = 'YYYY/MM/DD HH:mm:ss';
    const createdAt = date.format(now, format);
    const expirationAt = date.format(date.addMinutes(now, 15), format);

    const newToken = {
      id,
      email,
      card_number,
      cvv,
      expiration_year,
      expiration_month,
      createdAt,
      expirationAt,
    };

    //TTL
    const ttlInSeconds = 15 * 60;
    const ttl = Math.floor(Date.now() / 1000) + ttlInSeconds;
    newToken['TimeToLive'] = ttl;

    try {
      await ddbDocClient.send(
        new PutCommand({
          TableName: 'TokensTable',
          Item: newToken,
        }),
      );
      //console.log(newToken);
    } catch (error) {
      //console.log(error);
    }

    return id;
  }

  async GetToken(id: string): Promise<Token> {
    const client = new DynamoDBClient({});
    const ddbDocClient = DynamoDBDocumentClient.from(client);

    //console.log('GetToken');
    //console.log(id);
    const result = await ddbDocClient.send(
      new GetCommand({
        TableName: 'TokensTable',
        Key: { id },
      }),
    );

    //console.log(result);
    return <Token>(<unknown>result.Item);
  }
}
