import { APIGatewayEvent } from 'aws-lambda';
import { handler } from '@/helpers';
import interactionService from './interaction.service';
import { InteractionValidator } from './interaction.validation';
import CreateInteractionDTO from './dto/createInteraction.dto';
import UpdateInteractionDTO from './dto/updateInteraction.dto';

export const create = handler(
  async (event: APIGatewayEvent): Promise<Record<string, any>> => {
    const body: CreateInteractionDTO = JSON.parse(event.body);

    const validation = await new InteractionValidator({
      ...body,
    }).validate();

    if (validation) {
      throw new Error(
        JSON.stringify({
          status: 400,
          ...validation,
        })
      );
    }

    return await interactionService.create(body);
  }
);

export const findAll = handler(async (): Promise<Record<string, any>> => {
  return await interactionService.findAll();
});

export const findOne = handler(
  async (event: APIGatewayEvent): Promise<Record<string, any>> => {
    const id = event.pathParameters.id;
    const data = await interactionService.findOne(id);

    if (!data) {
      throw new Error(
        JSON.stringify({
          status: 404,
          message: `Item not found`,
        })
      );
    }

    return data;
  }
);

export const update = handler(
  async (event: APIGatewayEvent): Promise<Record<string, any>> => {
    const id = event.pathParameters.id;
    const body: UpdateInteractionDTO = JSON.parse(event.body);

    return interactionService.update(id, body);
  }
);

export const remove = handler(async (event: APIGatewayEvent): Promise<void> => {
  const id = event.pathParameters.id;
  await interactionService.remove(id);
});
